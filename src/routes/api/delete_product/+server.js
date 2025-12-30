import { db } from '$lib/database/db.js';
import { ROLES } from "$lib/enums";

export async function POST({request, locals}) {
    if (!locals.user) {
        redirect(301, "/login");
    } else if (locals.user.role != ROLES.ADMIN) {
        redirect(301, "/login");
    }
    let body = await request.json();
    let {product_id} = body;

    let res = await db.execute("update product set is_deleted = true where id = ?;", [product_id]);

    return new Response("good");
}