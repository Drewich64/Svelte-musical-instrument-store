import { db } from '$lib/database/db.js';
import { invalidateSession } from '$lib/login.js';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function POST({ cookies }) {

    const session_id = cookies.get("session");

    if (!session_id) {
        error(400, {message: "Session id must be provided to log out."});
    }

    await invalidateSession(session_id);

    cookies.delete("session", {path: "/"});

    return new Response("Exited successfully");

}