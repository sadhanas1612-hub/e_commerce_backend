import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";


dotenv.config();
const api = express();
api.use(express.json());
api.use(cors({ origin: 'http://localhost:5173' }));


const bcrypt = require("bcrypt");


const router = express.Router();

router.post("/signup", async (req, res) => {
const { name, email, password } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);

const sql =
    "INSERT INTO signup (name,email,password) VALUES (?,?,?)";

db.query(
    sql,
    [name, email, hashedPassword],
    (err, result) => {
    if (err) {
        return res.status(400).json({
        message: "Email already exists"
        });
    }

    res.json({
        message: "Signup Successful"
    });
    }
);
});

module.exports = router;

router.post("/login", (req, res) => {
const { email, password } = req.body;

db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {

    if (results.length === 0) {
        return res.status(401).json({
        message: "User not found"
        });
    }

    const user = results[0];

    const validPassword =
        await bcrypt.compare(
        password,
        user.password
        );

    if (!validPassword) {
        return res.status(401).json({
        message: "Wrong password"
        });
    }

    res.json({
        message: "Login Successful",
        userId: user.id,
        name: user.name
    });
    }
);
});
const PORT = process.env.PORT || 8000;

api.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});