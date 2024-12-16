const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5400;
const path = require('path');

// middleware to parse json data 
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// mysql database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
} );

// connect to database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});
// serve the html form 
app.get('/form',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

// API endpoint to add a new product
app.get('/',(req,res)=>{
    res.send('Welcome to the product API');
});

app.get('/users',(req,res)=>{
    const sql = 'select* from users';
    db.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });   
});

app.post('/users',(req,res)=>{
    const user = req.body;
    const sql = 'INSERT INTO users(name,email)VALUES(?,?)';
    db.query(sql,user,(err,result)=>{
        if (err) throw err;
        res.json({message: 'User added successfully', id: result.insertId});
    });
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});