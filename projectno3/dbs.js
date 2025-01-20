import mysql2 from 'mysql2'

const db= mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "abc"
});
export default db;