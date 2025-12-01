import { db } from '$lib/database/db.js';
import { ORDER_STATUS } from '$lib/enums.js';

export async function POST({ request, locals }) {

    const body = await request.json();
    let { order_id } = body;

    let order = (await db.query("select * from `order` where `order`.id = ? limit 1;", [order_id]))[0][0];

    if (order.status == ORDER_STATUS.PROCESSING) {
        await db.execute("update `order` set status = ? where id = ?;", [ORDER_STATUS.SENT, order_id]);
    }

    return new Response("good");
}