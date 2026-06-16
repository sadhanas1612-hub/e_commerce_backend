import express from 'express';
import cors from 'cors';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const api = express();
api.use(express.json());
api.use(cors({ origin: 'http://localhost:5173' }));

// Login
api.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const sql = "SELECT * FROM customers WHERE username = ? AND password = ?";

    db.query(sql, [username, password], (error, result) => {
        if (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'An error occurred during login' });
        }

        if (result.length > 0) {
            return res.status(200).json({ message: 'Login successful', user: result[0] });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

const PORT = process.env.PORT || 8000;

api.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});