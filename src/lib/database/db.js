import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "musical_instrument_store_user",
    password: "KQ%`~V&trn%WX9Lnvp^x",
    database: "musical_instrument_store"
});
