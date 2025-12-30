import { db } from '$lib/database/db.js';
import { ORDER_STATUS, ROLES } from '$lib/enums.js';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    if (locals.user.role !== ROLES.USER) {
        redirect(300, "/login");
    }


    let body = await request.json();
    let {order_id} = body;


    const orders = (await db.query("select * from `order` where id = ?;", [order_id]))[0];

    let order;
    if (orders.length > 0) {
        order = orders[0];
    } else {
        error(400, "Cancelling order that doesn't exist.");
    }

    if (order.status == ORDER_STATUS.CANCELLED) {
        error(400, "Cancelling order that is already cancelled.");
    }

    if (order.status == ORDER_STATUS.SENT) {
        error(400, "Can't cancell the order. The order is already sent.");
    }

    await db.execute("update `order` set status = ? where id = ?;", [ORDER_STATUS.CANCELLED, order_id]);

    // add the products back

    let items = (await db.query("select product_id, amount from order_item where order_id = ?;", [order_id]))[0];

    for (let i = 0; i < items.length; i++) {
        await db.execute("update product set amount_available = amount_available + ? where id = ?;", [items[i].amount, items[i].product_id]);
    }

    return new Response("good");
}