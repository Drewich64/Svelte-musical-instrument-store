import { db } from '$lib/database/db.js';
import { redirect } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';

async function addProduct ({ request, locals }) {
    if (locals.user.role !== "ADMIN") {
        redirect(301, "/login");
    }

    let errors = {};

    const data = await request.formData();

    let title = data.get("title");
    let price = Number(data.get("price"));
    let description = data.get("description");
    let manufacturer = data.get("manufacturer");
    let category = data.get("category");
    let amount = Number(data.get("amount"));
    let images = data.get("product_images");

    // check null

    if (title == '' || title == null
        || price <= 0 || price == null
        || description == ''  || description == null
        || manufacturer == ''  || manufacturer == null
        || category == ''  || category == null
        || amount <= 0 || amount == null
    ) {
        errors.input_data = "Заповніть всі поля."
        return fail(400, {errors})
    }

    // check data type

    if (
        typeof title !== 'string'
        || typeof price !== 'number'
        || typeof description !== 'string'
        || typeof manufacturer !== 'string'
        || typeof category !== 'string'
        || typeof amount !== 'number'
    ) {
        errors.data_types = "Невідповідні типи даних.";
        return fail(400,  {errors});
    }

    let characteristics = [];
    for (let  [key, value] of data.entries()) {
        if (value == '' || key == '' || value == null || key == null || value == undefined || key == undefined) continue;
        if (key.startsWith("characteristic_key_")) {
            let id = key.split("_")[2];
            let ind = characteristics.findIndex((item) => item.id == id);
            if (ind > -1) {
                // update the entry
                characteristics[ind].key = value;
                continue;
            }
            // add the entry
            characteristics.push({id: id, key: value, value: null});
        } else if (key.startsWith("characteristic_value_")) {
            let id = key.split("_")[2];
            let ind = characteristics.findIndex((item) => item.id == id);
            if (ind > -1) {
                // update the entry
                characteristics[ind].value = value;
                continue;
            }
            // add the entry
            characteristics.push({id: id, key: null, value: value});
        }
    }

    // add product to the db
        // check if category is in db ? get the id : insert + get the id;
    let category_id = (await db.query("select * from category where name = ? limit 1;", [category]))[0][0];
    if (category_id) {
        category_id = category_id.id;
    } else {
        category_id = (await db.query("insert into category (name) values (?);", [category]))[0].insertId;
    }
        // check if manufacturer is in db ? get the id : insert + get the id;
    let manufacturer_id = (await db.query("select * from manufacturer where name = ? limit 1;", [manufacturer]))[0][0];
    if (manufacturer_id) {
        manufacturer_id = manufacturer_id.id;
    } else {
        manufacturer_id = (await db.execute("insert into manufacturer (name) values (?);", [manufacturer]))[0].insertId;
    }

    let product_id = (await db.execute("insert into product (category_id, title, price, amount_available, manufacturer_id, description, is_deleted) values (?, ?, ?, ?, ?, ?, ?);", 
        [
            category_id, title, price, amount, manufacturer_id, description, false
        ]))[0].insertId;

    console.log("-----------------------------------------------");

    console.log(characteristics);


    // Заносимо неіснуючі характеристики


    // Заносимо неіснуючі значення характеристик

    // Заносимо значення характеристик продукта

    // for (let i = 0; i < characteristics.length; i++) {
    //     let characteristic = (await db.query("select * from characteristic where name = ? limit 1;", [characteristics[i].key]))[0][0];
    //     let characteristic_id;
    //     if (characteristic == undefined) {
    //         characteristic_id = (await db.execute("insert into characteristic (name) values (?);", [characteristics[i].key]))[0].insertId;
    //     }
    // }

    // for (let i = 0; i < characteristics.length; i++) {
    //     let characteristic_value = (await db.query("select * from characteristic_value where value = ? and characteristic_id = (select id from characteristic where name = ? limit 1) limit 1;", [characteristics[i].value, characteristics[i].key]))[0][0];
    //     let characteristic_value_id;
    //     if (characteristic_value == undefined) {
    //         characteristic_value_id = (await db.execute("insert into characteristic_value (characteristic_id, value) values ((select id from characteristic where name = ? limit 1), ?);", [characteristics[i].key, characteristics[i].value]))[0].insertId;
    //     }
    //     await db.execute("insert into product_characteristic_value (product_id, characteristic_id, characteristic_value_id) values (?, (select id from characteristic where name = ? limit 1), ?);", [product_id, characteristics[i].key, characteristic_value_id]);
    // }

    return {
        status: "great success!"
    };
}


export const actions = {
    "addProduct": addProduct
};