import { db } from '$lib/database/db';
import {DELIVERY_TYPE, ROLES} from "$lib/enums.js";
import { redirect } from '@sveltejs/kit';

export async function load ({fetch, params, locals}) {
    if (locals.user.role !== ROLES.EMPLOYEE) {
        redirect(300, "/login");
    }

    let order = (await db.query("select `order`.id as id, user.id as user_id, `order`.order_date, `order`.delivery_date, `order`.is_paid, `order`.status, `order`.delivery_type, `order`.address_id, user.username, user.email as user_email from `order` inner join user on `order`.user_id = user.id where `order`.id = ?;", [params.order_id]))[0][0];
    if (order.length == 0) {
        redirect(301, "/products/0");
    }
    let order_items = (await db.query("select order_item.item_price as price, order_item.amount, product.amount_available as available, product.title, product_id as product_id from order_item inner join product on order_item.product_id = product.id where order_item.order_id = ?;", [params.order_id]))[0];

    // getting the images
    for (let i = 0; i < order_items.length; i++) {
        let photos = (await db.query("select url from product_photo where product_id = ? limit 1;", [order_items[i].product_id]))[0].map((item) => item.url);
        order_items[i].photos = photos;
    }
    // getting the address

    if (order.delivery_type == DELIVERY_TYPE.HOME) {
        let addrs = (await db.query("select * from address_home where id = ? limit 1;", [order.address_id]))[0];
        if (addrs.length > 0) {
            order.address = addrs[0];
        }
    } else if (order.delivery_type == DELIVERY_TYPE.PICKUP) {
        let addrs = (await db.query("select * from address_pickup where id = ? limit 1;", [order.address_id]))[0];
        if (addrs.length > 0) {
            order.address = addrs[0];
        }
    } else {
        error(500, `This delivery type doesn't exist: "${order.delivery_type}"`);
    }

    // getting the user

    order.products = order_items;
    return {"order": order};
}