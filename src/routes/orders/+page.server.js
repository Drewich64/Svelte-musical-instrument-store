import { db } from "$lib/database/db";


export async function load({ locals }) {
    let orders = (await db.query("select * from `order` where user_id = ? order by order_date desc;", [locals.user.id]))[0];
    for (let i = 0; i < orders.length; i++) {
        orders[i].products = [];
        let order_items = (await db.query("select product_id from order_item where order_id = ?;", [orders[i].id]))[0];
        for (let j = 0; j < order_items.length; j++) {
            let photos = (await db.query("select url from product_photo where product_id = ? limit 1;", [order_items[j].product_id]))[0].map((item) => item.url);
            orders[i].products.push({
                photos: photos
            });
        }
    }
    return {
        orders: orders
    };
}