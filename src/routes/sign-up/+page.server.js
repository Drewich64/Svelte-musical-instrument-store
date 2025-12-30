import { error, redirect, fail } from "@sveltejs/kit";
import {db} from "$lib/database/db";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

const ROLES = {
    USER: 6,
    ADMIN: 8,
    EMPLOYEE: 7
};

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (regex.test(password)) {
        return true;
    }
    return false;

}

function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

function validatePhone(phone) {
    const regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if (regex.test(phone)) {
        return true;
    }
    return false;
}

async function register({request}) {
    const data = await request.formData();
    const username = data.get("login");
    const password = data.get("password");
    const email = data.get("email");
    const phone = data.get("phone");

    let errors = {};

    if (!username || !password || !email) {
        errors.input_data = "Не всі поля заповнені.";
        return fail(400, {errors});
    }

    // Validate password
    if (!validatePassword(password)) {
        errors.password = true;
        return fail(400, {errors});
    }
    
    // Validate email
    if (!validateEmail(email)) {
        errors.email = "Введіть правильну пошту.";
        return fail(400, {errors});
    }

    // Validate phone
    if (phone) {
        if (!validatePhone(phone)) {
            errors.phone = "Введіть правильний номер телефону."
            return fail(400, {errors});
        }
    }

    // if user already exists error
    const user = (await db.query("select * from user where username = ?;", [username]))[0];
    if (user.length > 0) {
        errors.user = "Це ім'я вже використано."
        return fail(400, {errors});
    }

    await db.execute("insert into user (username, password, role, email, phone) values (?, ?, ?, ?, ?);", [username, encodeHexLowerCase(sha256(new TextEncoder().encode(password))), ROLES.USER, email, phone == "" ? null : phone]);

    return {status: 200};
}

export const actions = {register};