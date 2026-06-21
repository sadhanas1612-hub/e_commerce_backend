import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const api = express();
api.use(express.json());
api.use(cors({ origin: 'http://localhost:5173' }));

<<<<<<< HEAD
api.post("/login", (req, res) =>{
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const address = req.body.address;

    const sql = "SELECT * FROM login WHERE name = ? AND password = ? ";

    db.query(sql, [name, password], (error, result) => {
        if (error) {
            console.log('Error during login:', error);
            return res.json({  message: 'An error occurred during login' });
        }
=======
>>>>>>> 479700959b95f222d11892dfbb65426466daf0e6



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





const app = express();


app.use(cors());

app.use(express.json());



app.use("/products",productRoutes);



app.listen(5000,()=>{

console.log("Server running on port 5000");

});