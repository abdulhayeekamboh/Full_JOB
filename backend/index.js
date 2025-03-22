const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const port = 4000;
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());
const secret_key = "Hello@123450";

const db = mysql.createConnection({
    host:'sql12.freesqldatabase.com',
    user:'sql12768587',
    password:'2dsfhFarER',
    database:'sql12768587',
});

db.connect((e)=>{
    if (e){
        return console.log('database could not be connected');
    } console.log('database connected successfully done');
})

app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    const query = "Select * from work where email = ?";
    db.query(query,[email], (e,result)=>{
        if (e){
            return res.json({type:'error',message:'error while checking email vaidity'});
        } if (result.length === 0){
            const newQuery = "insert into work(name,email,password) values(?,?,?)";
            db.query(newQuery,[name,email,password], (e,result)=>{
                if (e){
                   return res.json({type:'error',message:'error while inserting data to database'});
                } res.json({type:'success',message:'Registration successfully done'});
            })
        }else {
            res.json({type:'error',message:'Email already exist'});
        }
    })

});


app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    const query = "Select * from work where email = ?";
    db.query(query,[email], (e,result)=>{
        if (e){
            return res.json({type:'error', message:'error while checking email validity'});
        } if (result.length > 0 && result[0].password === password){
            const token = jwt.sign(
                {id: result[0].id, email: result[0].email},
                secret_key,
                {expiresIn: '1h'}
            )
            const info = {
                name:result[0].name,
            }
            console.log(info);
            res.json({ type: 'success', message: 'Login successfully done', token, info });
                        
        }

    });
});


app.listen(port,()=>{
    console.log(`the server is started as http://localhost:${port}`);
})