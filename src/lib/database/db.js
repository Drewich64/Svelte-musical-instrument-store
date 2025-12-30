import {DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD} from '$env/static/private';
import mysql from "mysql2";
let db = mysql.createPool(
    {
        host: DATABASE_HOST,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME
    }
).promise();

export { db };