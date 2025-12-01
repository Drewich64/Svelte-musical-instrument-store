import { db } from "$lib/database/db";


let out = await db.execute("insert into users values (3, 'John', 'Doe');");