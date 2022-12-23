const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')


const dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lottery'
})


app.use(express.json())
app.use(cors())

app.get("/api/test", (req, res)=>{
    res.json("Test")
})


app.post("/api/sign_in", (req, res)=>{
    let phone_number = req.body.phone_number
    let password = req.body.password

    dbcon.query("SELECT * FROM users WHERE phone_number = ? AND password = ?", [phone_number, password], (err, user)=>{
        if(err) throw  err

        if(user.length > 0){
            let token = jwt.sign({username: username}, 'secret_play2', {expiresIn: '1h'})

            res.json({status: true, token})
        }else{
            res.json({status: false})
        }
    })
    
})


app.post("/api/sign_up", (req, res)=>{
    let phone_number = req.body.phone_number
    let password = req.body.password

    dbcon.query("SELECT * FROM users WHERE phone_number = ? AND password = ?", [phone_number, password], (err, user)=>{
        if(err) throw  err

        if(user.length > 0){
            res.json({status: false})
        }else{
            dbcon.query("INSERT INTO users (phone_number, password) VALUES (?, ?)", [phone_number, password], (err, inserted)=>{
                if(err) throw err

                let token = jwt.sign({phone_number: user[0].phone_number}, 'secret_play2', {expiresIn: '1h'})

                res.json({status: true, token})
            })
        }
    })
    
})


app.get("/api/all_tickets", (req, res)=>{
    dbcon.query("SELECT * FROM ticket", (err, tickets)=>{
        if(err) throw err

        res.json(tickets)
    })
})


app.listen(3001, ()=>{
    console.log("Server is running on port 3001")
})