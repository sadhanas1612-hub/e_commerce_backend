import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const api = express();
api.use(express.json());
api.use(cors({ origin: 'http://localhost:5173' }));

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





const app = express();


app.use(cors());

app.use(express.json());



app.use("/products",productRoutes);



app.listen(5000,()=>{

console.log("Server running on port 5000");

});