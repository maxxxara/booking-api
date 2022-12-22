import mysql from "mysql";

export const db = mysql.createConnection({
    host: "sql.freedb.tech",
    user: "freedb_maxara204",
    password: "hfE$3HMZwMZ@h7g",
    database: "freedb_hotelBooking"
})