import { db } from '$lib/database/db.js';
import { redirect, error, fail } from '@sveltejs/kit';
import { ORDER_STATUS, DELIVERY_TYPE, ROLES } from '$lib/enums.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    if (!locals.user) {
        redirect(301, "/login");
    } else if (locals.user.role != ROLES.USER) {
        redirect(301, "/login");
    }
    let body = await request.json();
    let {cart, delivery, address} = body;

    let errors = {};

    
    
    if (cart.length > 30) {
        errors.cart = "Кошик завеликий.";
        
    }

    if (!Object.values(DELIVERY_TYPE).includes(delivery)) {
        errors.delivery = `Способу доставки ${delivery} не існує`;
        return json({status: 400, errors});
    }

    /* ==============VALIDATING THE ADDRESS============== */

    if (address == undefined || address == null) {
        errors.address = "Введіть адресу";
        return json({status: 400, errors});
    }
    
    if (delivery == DELIVERY_TYPE.HOME) {
        if (   (address.has_elevator == null || address.has_elevator == undefined)
            || (address.to_apartment == null || address.to_apartment == undefined)
            || (address.apartment == null || address.apartment == undefined)
            || (address.building == null || address.building == undefined)
            || (address.street == null || address.street == undefined)
            || (address.post_code == null || address.post_code == undefined)
            || (address.city == null || address.city == undefined)
        ) {
            // error(400, "Address info is not valid");
            errors.address = "Введіть повну адресу";
            return json({status: 400, errors});
        } else if (typeof address.has_elevator !== "boolean"
            || typeof address.to_apartment !== "boolean"
            || typeof address.apartment !== "string"
            || typeof address.building !== "string"
            || typeof address.street !== "string"
            || typeof address.post_code !== "string"
            || typeof address.city !== "string"
        ) {
            // error (400, "Address types don't match.");
            errors.address = "Тип адрес є невідповідним.";
            return json({status: 400, errors});
        }

    } else if (delivery == DELIVERY_TYPE.PICKUP) {
        if (!address.department_code) {
            errors.department_code = "Введіть код відділу.";
            return new Response(JSON.stringify({status: 400, errors}));
        } else if (typeof address.department_code !== "string") {
            errors.department_code = "Тип даних не є відповідним.";
            return new Response(JSON.stringify({status: 400, errors}));
        }
    }

    

    /* ==============VALIDATING THE CART==============
        Do all of the products exist?
    */

    let ordered_products = (await db.query(`select id, price, amount_available as amount, is_deleted from product where id in(${cart.map(item => item.product.id).join(", ")});`))[0];

    if (ordered_products.length < cart.length) {
        errors.products = "Деякі продукти не існують.";
        return json({status: 400, errors});
    }

    for (let i = 0; i < ordered_products.length; i++) {
        if (ordered_products.is_delted == true) {
            errors.products = "Деякі продукти є видаленими";
            return json({status: 400, errors});
        }
    }

    cart.map(item => { // checking if the amounts are valid
        if (item.count < 1) {
            errors.cart = "Кількість товару у кошику не може бути менше 1.";
            return json({status: 400, errors});
        }
        let index = ordered_products.findIndex((a) => a.id == item.product.id);
        item.product.price = ordered_products[index].price;
        if (item.product.count > ordered_products[index]) {
            errors.cart = "Кількість одиниць товару перевищена.";
            return json({status: 400, errors});
        }
    });

    /* =============== INSERTING ENTRIES ================= */

    let address_id;
    if (delivery == DELIVERY_TYPE.HOME) {
        let found = (await db.query("select * from address_home where user_id = ? and post_code = ? and city = ? and street = ? and building = ? and apartment = ? and to_apartment = ? and has_elevator = ? limit 1;",
            [locals.user.id, address.post_code, address.city, address.street, address.building, address.apartment, address.to_apartment, address.has_elevator]
        ))[0];
        if (found.length < 1) {
            address_id = (await db.execute("insert into address_home (post_code, city, street, building, apartment, to_apartment, has_elevator, user_id) values (?, ?, ?, ?, ?, ?, ?, ?);", 
                [address.post_code, address.city, address.street, address.building, address.apartment, address.to_apartment, address.has_elevator, locals.user.id]
            ))[0].insertId;
        } else {
            address_id = found[0].id;
        }
    } else if (delivery == DELIVERY_TYPE.PICKUP) {
        let found = (await db.query("select * from address_pickup where department_code = ?;", [address.department_code]))[0];
        if (found.length < 1) {
            address_id = (await db.execute("insert into address_pickup (department_code) values (?);", [address.department_code]))[0].insertId;
        } else {
            address_id = found[0].id;
        }
    }


    if (address_id == null || typeof address_id !== "number") {
        errors.address = "Щось пішло не по плану.";
        return json({status: 500, errors});
    }


    let order_id = (await db.execute("insert into `order` (user_id, employee_id, order_date, delivery_date, delivery_type, is_paid, status, address_id) values (?, ?, ?, ?, ?, ?, ?, ?);", 
        [locals.user.id, null, new Date(), null, delivery, false, ORDER_STATUS.PROCESSING, address_id]
    ))[0].insertId;
    

    // Inserting the order_item

    let placeholders = cart.map((item) => "(?, ?, ?, ?)").join(", ");
    let values = [];
    for (let i = 0; i < cart.length; i++) {
        values.push(order_id, cart[i].product.id, cart[i].product.price, cart[i].count);
    }

    await db.execute(`insert into order_item (order_id, product_id, item_price, amount) values ${placeholders};`, values);
    for (let i = 0; i < cart.length; i++) {
        await db.execute(`update product set amount_available = amount_available - ? where id = ?;`, [cart[i].count, cart[i].product.id]);
    }
    return json({status: 200});;
}

