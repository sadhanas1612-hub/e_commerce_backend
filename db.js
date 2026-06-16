import mysql from 'mysql2';

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'e_commerce'
});

connection.connect((err)=>{
    if(err){
        console.log('Error connecting to the database:', err);
        return;
    }   
    console.log('Connected to the database!');
});

export default connection;