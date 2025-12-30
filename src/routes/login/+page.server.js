import {error, redirect, fail} from "@sveltejs/kit";
import {db} from "$lib/database/db";
import { createSession, generateSessionToken, invalidateAllSessions } from "$lib/login.js";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { ROLES } from "$lib/enums.js";

async function login({cookies, request}) {
    const data = await request.formData();
    const username = data.get("login");
    const password = data.get("password");

    let errors = {};

    // find if user with this login exists
    const users = (await db.query("select user.id, user.username, user.password, role.name as role, user.email, user.is_deleted from user inner join role on user.role = role.id where username = ?;", [username]))[0];
    if (users.length <= 0) {
        errors.user = "Такого коритувача не існує";
        return fail(400, {errors});
    }
    const user = users[0];

    if (user.is_deleted) {
        errors.user = "Користувач видалений";
        return fail(400, {errors});
    }

    // check if the password is correct

    if (encodeHexLowerCase(sha256(new TextEncoder().encode(password))) !== user["password"]) {
        errors.password = "Неправильний пароль";
        return fail(401, {errors});
    }

    // Create a session and set the cookie
    invalidateAllSessions(user.id);
    const token = await generateSessionToken();
    const session = await createSession(await token, user.id);
    cookies.set("session", token, {
        sameSite: 'strict',
        httpOnly: true,
        path: "/",
        maxAge: (await session).expiresAt
    });


    if (user.role == ROLES.ADMIN) {
        redirect(301, "/admin/products/0");
    } else if (user.role == ROLES.EMPLOYEE) {
        redirect(301, "/employee/0");
    }
    redirect(301, "/products/0");

}


export const actions = {login}