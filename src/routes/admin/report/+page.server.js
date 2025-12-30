import { db } from '$lib/database/db.js';
import { error } from '@sveltejs/kit';
import { ORDER_STATUS } from '$lib/enums.js';

async function getStatistics({ request }) {
    const body = await request.formData();

    const start = body.get("start");
    const end = body.get("end");


    let orders_total;
    let orders_processing_total;
    let orders_sent_total;
    let orders_cancelled_total;
    let total_supply_price;
    let orders_cancelled;
    let orders_processing;
    let orders_sent;
    let orders;

    if (start && end) {
        orders_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_total` from `order` inner join order_item on `order`.id = order_item.order_id where `order`.order_date > ? and `order`.order_date < ?;", [start, end]))[0][0].orders_total;
        orders_processing_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_processing_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? and `order`.order_date > ? and `order`.order_date < ?;", [ORDER_STATUS.PROCESSING, start, end]))[0][0].orders_processing_total;
        orders_sent_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_sent_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? and `order`.order_date > ? and `order`.order_date < ?;", [ORDER_STATUS.SENT, start, end]))[0][0].orders_sent_total;
        orders_cancelled_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_cancelled_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? and `order`.order_date > ? and `order`.order_date < ?;", [ORDER_STATUS.CANCELLED, start, end]))[0][0].orders_cancelled_total;
        total_supply_price = (await db.query("select SUM(item_price * amount) as `total_supply_price` from supply_list inner join invoice on supply_list.invoice_id = invoice.id where invoice.order_date > ? and invoice.order_date < ?;", [start, end]))[0][0].total_supply_price;
        orders_cancelled = (await db.query("select count(*) as `orders_cancelled` from `order` where status = ? and order_date > ? and order_date < ?;", [ORDER_STATUS.CANCELLED, start, end]))[0][0].orders_cancelled;
        orders_processing = (await db.query("select count(*) as `orders_processing` from `order` where status = ? and order_date > ? and order_date < ?;", [ORDER_STATUS.PROCESSING, start, end]))[0][0].orders_processing;
        orders_sent = (await db.query("select count(*) as `orders_sent` from `order` where status = ? and order_date > ? and order_date < ?;", [ORDER_STATUS.SENT, start, end]))[0][0].orders_sent;
        orders = (await db.query("select count(*) as `orders` from `order` where order_date > ? and order_date < ?;", [start, end]))[0][0].orders;
    } else if (start && !end) {
        orders_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_total` from `order` inner join order_item on `order`.id = order_item.order_id where `order`.order_date > ?;", [start]))[0][0].orders_total;
        orders_processing_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_processing_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? and `order`.order_date > ?;", [ORDER_STATUS.PROCESSING, start]))[0][0].orders_processing_total;
        orders_sent_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_sent_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? and `order`.order_date > ?;", [ORDER_STATUS.SENT, start]))[0][0].orders_sent_total;
        orders_cancelled_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_cancelled_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? and `order`.order_date > ?;", [ORDER_STATUS.CANCELLED, start]))[0][0].orders_cancelled_total;
        total_supply_price = (await db.query("select SUM(item_price * amount) as `total_supply_price` from supply_list inner join invoice on supply_list.invoice_id = invoice.id where invoice.order_date > ?;", [start]))[0][0].total_supply_price;
        orders_cancelled = (await db.query("select count(*) as `orders_cancelled` from `order` where status = ? and order_date > ?;", [ORDER_STATUS.CANCELLED, start]))[0][0].orders_cancelled;
        orders_processing = (await db.query("select count(*) as `orders_processing` from `order` where status = ? and order_date > ?;", [ORDER_STATUS.PROCESSING, start]))[0][0].orders_processing;
        orders_sent = (await db.query("select count(*) as `orders_sent` from `order` where status = ? and order_date > ?;", [ORDER_STATUS.SENT, start, end]))[0][0].orders_sent;
        orders = (await db.query("select count(*) as `orders` from `order` where order_date > ?;", [start, end]))[0][0].orders;
    } else if (!start && end) {
        orders_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_total` from `order` inner join order_item on `order`.id = order_item.order_id where `order`.order_date < ?;", [end]))[0][0].orders_total;
        orders_processing_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_processing_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? `order`.order_date < ?;", [ORDER_STATUS.PROCESSING, end]))[0][0].orders_processing_total;
        orders_sent_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_sent_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? and `order`.order_date < ?;", [ORDER_STATUS.SENT, end]))[0][0].orders_sent_total;
        orders_cancelled_total = (await db.query("select SUM(order_item.item_price * order_item.amount) as `orders_cancelled_total` from `order` inner join order_item on `order`.id = order_item.order_id where status = ? and `order`.order_date < ?;", [ORDER_STATUS.CANCELLED, end]))[0][0].orders_cancelled_total;
        total_supply_price = (await db.query("select SUM(item_price * amount) as `total_supply_price` from supply_list inner join invoice on supply_list.invoice_id = invoice.id where invoice.order_date < ?;", [end]))[0][0].total_supply_price;
        orders_cancelled = (await db.query("select count(*) as `orders_cancelled` from `order` where status = ? and order_date < ?;", [ORDER_STATUS.CANCELLED, end]))[0][0].orders_cancelled;
        orders_processing = (await db.query("select count(*) as `orders_processing` from `order` where status = ? and order_date < ?;", [ORDER_STATUS.PROCESSING, end]))[0][0].orders_processing;
        orders_sent = (await db.query("select count(*) as `orders_sent` from `order` where status = ? and order_date < ?;", [ORDER_STATUS.SENT, end]))[0][0].orders_sent;
        orders = (await db.query("select count(*) as `orders` from `order` where order_date < ?;", [end]))[0][0].orders;
    }

    

    return {
        orders_total,
        orders_processing_total,
        orders_sent_total,
        orders_cancelled_total,
        total_supply_price,
        orders_cancelled,
        orders_processing,
        orders_sent,
        orders,
    };
}

export const actions = {
    get_statistics: getStatistics
}