import { db } from "$lib/database/db";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { error } from "@sveltejs/kit";
import { invalidateAllSessions } from "$lib/login.js";
import { redirect } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
    let body = await request.json();
    let {password} = body;
    let session_id = cookies.get("session");
    
    // Finding the user id by the session id provided in locals
    const sessions = (await db.query("select user_id from user_session where id = ?;", [encodeHexLowerCase(sha256(new TextEncoder().encode(session_id)))]))[0];

    if (sessions.length == 0) {
        error(400, {message: "This user couldn't be deleted."});
    }

    const user_id = sessions[0].user_id;

    // Checking the password
    if (!password) {
        error(400, "The password was not provided.");
    }

    const users = (await db.query("select user.id, user.password, user.is_deleted from user where user.id = ?;", [user_id]))[0];
    
    if (users.length <= 0) {
        error(400, {user: true});
    }
    const user = users[0];

    if (user.is_deleted) {
        error(400, {message: "This user is deleted."});
    }

    // check if the password is correct

    if (encodeHexLowerCase(sha256(new TextEncoder().encode(password))) !== user["password"]) {
        error(401, {message: "Wrong password"});
    }

    // Set the flag "is_deleted" in the user table
    await db.execute("update user set is_deleted = true where id = ?;", [user.id]);

    // Set the flag "is_deleted" of the orders of that user
    await db.execute("update `order` set is_deleted = true where user_id = ?;", [user.id]);

    // Delete the sessions associated with the user
    await invalidateAllSessions(user_id);

    cookies.delete("session", {path: "/"});

    redirect(300, "/login");

    return new Response("Account was deleted");
}