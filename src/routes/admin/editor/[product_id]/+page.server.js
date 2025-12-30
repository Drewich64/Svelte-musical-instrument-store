import { db } from '$lib/database/db.js';
export const load = async ({ fetch, params }) => {
    let { product_id } = params;
    let product = (await db.query("select product.id as id, product.title as title, product.price as price, product.amount_available as available, product.description as description, category.name as category, manufacturer.name as manufacturer from product inner join category on product.category_id = category.id inner join manufacturer on product.manufacturer_id = manufacturer.id where product.id = ?;", [product_id]))[0][0];
    if (product == undefined) {
        throw new Error("No such product.");
    }
    let rows = (await db.query("select * from product_photo where product_id = ?", [product_id]))[0];
    let photos = [];
    for (let i = 0; i < rows.length; i++) {
        photos.push(rows[i].url);
    }
    product.photos = photos;
    return {
        product: product
    };
};