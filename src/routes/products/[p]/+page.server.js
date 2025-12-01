import { db } from "$lib/database/db";

export const load = async ({params, url}) => {
    const page_size = 6; // how many instruments to fetch

    let search = url.searchParams.get('search');

    let products;
    if (search != null) {
        search = `%${search}%`
        products = (await db.query("select product.id as id, product.title as title, product.price as price, product.amount_available as available, product.description as description, category.name as category, manufacturer.name as manufacturer from product inner join category on product.category_id = category.id inner join manufacturer on product.manufacturer_id = manufacturer.id where product.is_deleted = false and product.title like ? limit ?, ?;", [search, Number(params.p)*page_size, page_size]))[0];
    } else {
        products = (await db.query("select product.id as id, product.title as title, product.price as price, product.amount_available as available, product.description as description, category.name as category, manufacturer.name as manufacturer from product inner join category on product.category_id = category.id inner join manufacturer on product.manufacturer_id = manufacturer.id where product.is_deleted = false limit ?, ?;", [Number(params.p)*page_size, page_size]))[0];
    }
    for (let i = 0; i < products.length; i++) {
        let rows = JSON.parse(JSON.stringify((await db.query("select * from product_photo where product_id = ?;", [products[i].id]))[0]));
        let photos = [];
        rows.forEach((item) => photos.push(item.url));
        products[i].photos = photos;
    }
    let total_products;
    if (search != null) {
        total_products = (await db.query("select count(*) as total_products from product where title like ? and is_deleted = false;", [search]))[0][0].total_products;
    } else {
        total_products = (await db.query("select count(*) as total_products from product where is_deleted = false;"))[0][0].total_products;
    }
    const total_pages = Math.ceil(total_products/page_size);

    return {
        products: products,
        total_pages: total_pages
    };

};