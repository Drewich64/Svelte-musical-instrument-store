import { db } from "$lib/database/db";
import { ORDER_STATUS } from "$lib/enums";

export async function load ({params, url}) {
    const page_size = 15;

    let search = url.searchParams.get("search") ?? "";

    let total_orders;
    let orders;

    if (search == "") {
        orders = (await db.query("select * from `order` where status != ? order by status desc, order_date desc limit ? offset ?;", [ORDER_STATUS.SENT, page_size, page_size*params.page]))[0];
        total_orders = (await db.query("select count(*) as count from `order` where status != ?;", [ORDER_STATUS.SENT]))[0][0].count;
    } else {
        orders = (await db.query("select * from `order` where id = ? order by status desc, order_date desc limit ? offset ?;", [search, page_size, page_size*params.page]))[0];
        total_orders = (await db.query("select count(*) as count from `order` where id = ?;", [search]))[0][0].count;
    }

    return {orders: orders, total_pages: Math.ceil(total_orders/page_size)};
    
};