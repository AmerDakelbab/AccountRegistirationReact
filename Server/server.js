const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'page'
});
db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("database connected!")
    }
});

app.post('/signup', async (req,res) => {
        const {username,password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: 'Username and password are required!'});
        }
        try {
            const hashedPassword = await bcrypt.hash(password,10);
            db.query("INSERT INTO users (username,password) VALUES (?,?)",[username,hashedPassword],(err,result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ message:'Username already exists.' });
                    }
                    console.error('Error inserting!',err);
                    return res.status(500).json({message: 'Error creating User!'});
                } else {
                    console.log("User Created succesfully!");
                    return res.status(201).json({message: 'user created succesfully!'});
                }
            });
        } catch (err) {
            console.error("error is catched",err);
            return res.status(500).json({ message: 'Error creating user!'});
        }
    });

    
    app.post('/login', async (req,res) => {
        const {username,password} = req.body;
        if (!username || !password) {
            return res.status(400).json({message: 'Username and password are required!'})
        }
        try {
            db.query("SELECT * FROM users WHERE username = ?",[username],async(err,result) => {
                if(err) {
                    console.error("error:",err);
                    return res.status(500).json({message:'Server Error!'});
                } else {
                    if(result.length > 0) {
                        const match = await bcrypt.compare(password,result[0].password);
                        if (match) {
                            console.log("Logined Succes")
                            return res.status(200).json({ message: 'Login successful!' });
                        } else {
                            console.log("invaild password");
                            return res.status(401).json({ message: 'Invalid credentials!' });
                        } 
                        
                    } 
                }
            })
        } catch (err) {
            console.error("error",err);
            return res.status(500).json({message: 'Server error!'});
        }
    });

app.listen(5000,() => {
    console.log("App is listening on 5000")
});