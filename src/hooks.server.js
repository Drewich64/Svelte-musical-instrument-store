import { redirect } from '@sveltejs/kit';
import { db } from '$lib/database/db';
import { sha256 } from 'oslo/crypto';
import { validateSessionToken } from '$lib/login';
import { ROLES } from '$lib/enums';

export async function handle({ event, resolve }) {
    const token = event.cookies.get("session");
    let {session, user} = await validateSessionToken(token);
    event.locals.user = await user;
    // console.log("-----------------------------------------");
    // console.log(await session, await user);
    // console.log("-----------------------------------------");

    // console.log(event.url.pathname);

    if (event.url.pathname.startsWith("/login") || event.url.pathname.startsWith("/sign-up") || event.url.pathname.startsWith("/products") || event.url.pathname.startsWith("/product") || event.url.pathname.startsWith("/api") || event.url.pathname.startsWith("test")) {
        return resolve(event);
    }
    
    if (user == null) {
        if (event.url.pathname.startsWith("/products") || event.url.pathname.startsWith("/product")) {
            return resolve(event);
        }
        redirect(301, "/login");
    }

    
    if (user.role == ROLES.USER) {
        if (event.url.pathname.startsWith("/products") || event.url.pathname.startsWith("/product") || event.url.pathname.startsWith("/orders")) {
            return resolve(event);
        }
        redirect(301, "/login");
    }

    if (user.role == ROLES.EMPLOYEE) {
        if (!event.url.pathname.startsWith("/employee")) {
            redirect(301, "/login");
        }
        return resolve(event);
    }

    if (user.role == ROLES.ADMIN) {
        if (!event.url.pathname.startsWith("/admin")) {
            redirect(301, "/login");
        }
        return resolve(event);
    }

    
    

    return resolve(event);
}