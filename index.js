import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";


dotenv.config();
const api = express();
api.use(express.json());
api.use(cors({ origin: 'http://localhost:5173' }));

api.post("/login", (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const sql = "SELECT * FROM customers WHERE username = ? AND password = ?";

    db.query(sql, [username, password], (error, result) => {
        if (error) {
            console.log('Error during login:', error);
            return res.json({  message: 'An error occurred during login' });
        }


        if(result.length > 0){
            return res.json({ message: 'Login successful' });
        }   else {
            return res.json({ message: 'Invalid username or password' });
        }
    });

});
const PORT = process.env.PORT || 8000;

api.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});