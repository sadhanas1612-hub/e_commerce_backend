import express from "express";
import db from "../db.js";


const router = express.Router();



router.get("/",(req,res)=>{


const sql="SELECT * FROM products";


db.query(sql,(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


});


});



router.post("/",(req,res)=>{


const {name,price,category,image}=req.body;


const sql=
"INSERT INTO products(name,price,category,image) VALUES(?,?,?,?)";


db.query(
sql,
[name,price,category,image],
(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


});


});



export default router;