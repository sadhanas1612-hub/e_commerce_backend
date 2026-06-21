import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'sadhana';
const DB_NAME = process.env.DB_NAME || 'e_commerce';

const connection = mysql.createConnection({
host: DB_HOST,
user: DB_USER,
password: DB_PASSWORD
});

connection.connect((err) => {
if (err) {
    console.log('Error connecting to the MySQL server:', err);
    return;
}

connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (createDbErr) => {
    if (createDbErr) {
    console.log('Error creating database:', createDbErr);
    return;
    }

    connection.changeUser({ database: DB_NAME }, (changeDbErr) => {
    if (changeDbErr) {
        console.log('Error selecting database:', changeDbErr);
        return;
    }

    const createTableSql = `
        CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    connection.query(createTableSql, (createTableErr) => {
        if (createTableErr) {
        console.log('Error creating customers table:', createTableErr);
        return;
        }

        console.log('Connected to MySQL and ensured database/table exist.');
    });
    });
});
});

export default connection;