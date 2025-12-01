import mysql from "mysql2"
let db = mysql.createConnection({
    user: "college",
    password: "2en9-bb3y",
    host: "localhost",
    database: "test_with_sv"
}).promise();

export { db };