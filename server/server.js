const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AuthenticationToken = require('./AuthenticationToken')
const crypto = require('crypto')


const dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lottery'
})


app.use(express.json())
app.use(cors())


app.get("/api/get_user", AuthenticationToken, (req, res) => {
    let decoded = req.decoded

    // console.log("Decoded : Check", decoded)

    if (decoded.bad_token) {
        res.json({ bad_token: true })
    } else {
        dbcon.query("SELECT * FROM users WHERE phone_number = ?", [decoded.phone_number], (err, rs) => {
            if (err) throw err

            res.json(rs)
        })
    }
})

app.post("/api/sign_in", (req, res) => {
    let phone_number = req.body.phone_number
    let password = req.body.password




    dbcon.query("SELECT * FROM users WHERE phone_number = ? AND password = ?", [phone_number, password], (err, user) => {
        if (err) throw err

        if (user.length > 0) {
            let token = jwt.sign({ phone_number: phone_number }, 'secret_play2', { expiresIn: '1d' })

            res.json({ status: true, token: token })

        } else {
            res.json({ status: false })
        }
    })

})


app.post("/api/sign_up", (req, res) => {
    let phone_number = req.body.phone_number
    let password = req.body.password
    let name = req.body.name
    let ref = req.body.ref
    let initial_token = 0

    dbcon.query("SELECT * FROM users WHERE phone_number = ? ", [phone_number], (err, user) => {
        if (err) throw err

        if (user.length > 0) {
            res.json({ status: false })
        } else {
            dbcon.query("INSERT INTO users (phone_number, password, name, ref, token) VALUES (?, ?, ?, ?, ?)", [phone_number, password, name, ref, initial_token], (err, inserted) => {
                if (err) throw err

                let token = jwt.sign({ phone_number: phone_number }, 'secret_play2', { expiresIn: '1d' })

                res.json({ status: true, token: token })
            })
        }
    })
})


app.get("/api/all_tickets", (req, res) => {
    dbcon.query("SELECT user_id FROM merchant", (err, tickets) => {
        if (err) throw err

        res.json(tickets)
    })
})


app.post("/api/get_ticket_merchant", (req, res) => {

    let merchant_id = req.body.merchant_id

    dbcon.query("SELECT * FROM merchant WHERE user_id = ?", [merchant_id], (err, rs) => {
        if (err) throw err

        res.json(rs)
    })
})


app.post("/api/purchase", AuthenticationToken, (req, res) => {

    let decoded = req.decoded
    let amount = req.body.amount
    let num_select = req.body.num_select
    let merchant_id = req.body.merchant_id
    let date = new Date().toLocaleString('TH-th')

    // console.log(num_select)

    if (decoded.bad_token) {
        res.json({ bad_token: true })
    } else {
        dbcon.query("SELECT * FROM users WHERE phone_number = ?", [decoded.phone_number], (err, user) => {

            if (err) throw err

            if (user.length > 0) {

                dbcon.query(`SELECT t${num_select} FROM merchant WHERE user_id = ?`, [merchant_id], (err, merchant) => {
                    if (err) throw err

                    if (merchant[0]['t' + num_select] - amount < 0) {
                        res.json({ UpdateTokenUser: false })
                    } else {
                        let change_token = user[0].token - amount

                        let end = 't' + '00'

                        // console.log(merchant[0], ' - ', amount)

                        let change_token_ticket = Number(merchant[0]['t' + num_select]) - Number(amount)

                        dbcon.query("UPDATE users SET token = ? WHERE phone_number = ?", [change_token, decoded.phone_number], (err, updateTokenUser) => {
                            if (err) throw err

                            dbcon.query(`UPDATE merchant SET t${num_select} = ? WHERE user_id = ?`, [change_token_ticket, merchant_id], (err, updateMerchantTicket) => {
                                if (err) throw err

                                if (user[0].ref) {

                                    dbcon.query("SELECT total_ref FROM users WHERE phone_number = ?", [user[0].ref], (err, target_user) => {
                                        if (err) throw err

                                        if (target_user.length > 0) {

                                            let change_token_target = (target_user[0].total_ref + ((amount * 5) / 100))

                                            dbcon.query("UPDATE users SET total_ref = ? WHERE phone_number = ?", [change_token_target, user[0].ref], (err, updateTotalRef) => {
                                                if (err) throw err

                                                dbcon.query("INSERT INTO purchase (phone_number, merchant_id, ticket, amount, status, date) VALUES (?, ?, ?, ?, ?, ?)", [decoded.phone_number, merchant_id, 't' + num_select, amount, 0, date], (err, insertedPurchase) => {
                                                    if (err) throw err

                                                    res.json({ UpdateTokenUser: true })
                                                })
                                            })

                                        } else {
                                            dbcon.query("INSERT INTO purchase (phone_number, merchant_id, ticket, amount, status, date) VALUES (?, ?, ?, ?, ?, ?)", [decoded.phone_number, merchant_id, 't' + num_select, amount, 0, date], (err, insertedPurchase) => {
                                                if (err) throw err

                                                res.json({ UpdateTokenUser: true })
                                            })
                                        }

                                    })

                                } else {
                                    dbcon.query("INSERT INTO purchase (phone_number, merchant_id, ticket, amount, status, date) VALUES (?, ?, ?, ?, ?, ?)", [decoded.phone_number, merchant_id, 't' + num_select, amount, 0, date], (err, insertedPurchase) => {
                                        if (err) throw err

                                        res.json({ UpdateTokenUser: true })
                                    })
                                }
                            })
                        })
                    }
                })
            }
        })
    }

    // console.log("Purchase")
})


app.post('/api/finance', AuthenticationToken, (req, res) => {
    let decoded = req.decoded
    let amount = req.body.amount
    let date = new Date().toLocaleString('TH-th')
    let genre = req.body.genre
    let merchant_id = req.body.merchant_id

    // console.log(date)
    // console.log(amount)
    // console.log(genre)

    if (decoded.bad_token) {
        res.json({ bad_token: true })
    } else {
        dbcon.query("SELECT id FROM users WHERE phone_number = ?", [decoded.phone_number], (err, rs) => {
            if (err) throw err

            if (rs.length > 0) {
                dbcon.query("INSERT INTO finance (user_id, merchant_id, date, genre, amount, status) VALUES (?, ?, ?, ?, ?, ?)", [rs[0].id, merchant_id, date, genre, amount, 0], (err, insertedFinance) => {
                    if (err) throw err

                    res.json({ finance_success: true })
                })
            }
        })
    }
})


app.get("/api/getmyfinance", AuthenticationToken, (req, res) => {
    let decoded = req.decoded

    if (decoded.bad_token) {
        res.json({ bad_token: true })
    } else {
        dbcon.query("SELECT id FROM users WHERE phone_number = ?", [decoded.phone_number], (err, rs) => {
            if (err) throw err

            if (rs.length > 0) {
                dbcon.query("SELECT * FROM finance WHERE user_id = ? ORDER BY id DESC", [rs[0].id], (err, payload) => {
                    if (err) throw err

                    res.json(payload)
                })
            }
        })
    }
})


app.post("/api/delete_finance", (req, res) => {
    let finance_id = req.body.finance_id

    dbcon.query("SELECT status FROM finance WHERE id = ?", [finance_id], (err, finance) => {
        if (err) throw err

        if (finance[0].status == 1) {
            res.json({ impossible: true })
        } else {
            dbcon.query("DELETE FROM finance WHERE id = ?", [finance_id], (err, deleted) => {
                if (err) throw err

                res.json({ deleted: true })
            })
        }
    })
})


app.get("/api/get_all_wait_verify", AuthenticationToken, (req, res) => {
    let decoded = req.decoded

    if (decoded.bad_token) {
        res.json({ bad_token: true })
    } else {
        dbcon.query("SELECT id FROM users WHERE phone_number = ?", [decoded.phone_number], (err, rs) => {

            if (err) throw err

            if (rs.length > 0) {
                dbcon.query("SELECT users.name, users.phone_number, finance.id, finance.date, finance.genre, finance.amount, finance.status, finance.merchant_id, finance.user_id, finance.amount, finance.status FROM finance LEFT JOIN users ON finance.user_id = users.id ORDER BY finance.id DESC", [rs[0].id], (err, payload) => {
                    if (err) throw err

                    res.json(payload)

                })
            }
        })
    }
})

app.post("/api/updateVerify", (req, res) => {
    let finance_id = req.body.finance_id
    let user_id = req.body.user_id
    let merchant_id = req.body.merchant_id

    // console.log(finance_id)

    dbcon.query("SELECT genre ,amount FROM finance WHERE id = ?", [finance_id], (err, finance) => {
        if (err) throw err

        // console.log(finance)

        if (finance[0].genre == 'ฝาก') {
            dbcon.query("SELECT token FROM users WHERE id = ?", [merchant_id], (err, merchant) => {
                if (err) throw err


                // console.log(merchant[0].token, ' - ', finance[0].amount)
                let merchant_change_token = merchant[0].token - finance[0].amount // Merchant

                dbcon.query("UPDATE users SET token = ? WHERE id = ?", [merchant_change_token, merchant_id], (err, updated) => {
                    if (err) throw err

                    dbcon.query("SELECT token FROM users WHERE id = ?", [user_id], (err, user) => {
                        if (err) throw err

                        let user_change_token = user[0].token + finance[0].amount //Buyer

                        dbcon.query("UPDATE users SET token = ? WHERE id = ?", [user_change_token, user_id], (err, updated) => {
                            if (err) throw err

                            dbcon.query("UPDATE finance SET status = ? WHERE id = ? ", [1, finance_id], (err, updateStatus) => {
                                if (err) throw err

                                // console.log("Updated")
                                res.json({ update_success: true })
                            })
                        })
                    })

                })
            })
        } else {
            if (finance[0].genre == 'ถอน') {
                dbcon.query("SELECT token FROM users WHERE id = ?", [merchant_id], (err, merchant) => {
                    if (err) throw err

                    dbcon.query("SELECT token FROM users WHERE id = ?", [user_id], (err, user) => {
                        if (err) throw err

                        let user_change_token = user[0].token - finance[0].amount //withdrawer

                        dbcon.query("UPDATE users SET token = ? WHERE id = ?", [user_change_token, user_id], (err, updated) => {
                            if (err) throw err

                            dbcon.query("UPDATE finance SET status = ? WHERE id = ? ", [1, finance_id], (err, updateStatus) => {
                                if (err) throw err

                                // console.log("Updated")
                                res.json({ update_success: true })
                            })
                        })
                    })

                })
            }
        }
    })

})


app.get('/api/allbought', AuthenticationToken, (req, res) => {
    let decoded = req.decoded

    if (decoded.bad_token) {
        res.json({ bad_token: true })
    } else {
        dbcon.query("SELECT * FROM purchase WHERE phone_number = ? ORDER BY id DESC", [decoded.phone_number], (err, rs) => {
            if (err) throw err

            res.json(rs)
        })
    }
})


app.get('/api/profile', AuthenticationToken, (req, res) => {
    let decoded = req.decoded

    if (decoded.bad_token) {
        res.json({ bad_token: true })
    } else {
        dbcon.query("SELECT * FROM users WHERE phone_number = ?", [decoded.phone_number], (err, rs) => {
            if (err) throw err

            res.json(rs)
        })
    }
})


app.get('/api/sub', AuthenticationToken, (req, res) => {
    let decoded = req.decoded

    if (decoded.bad_token) {
        res.json({ bad_token: true })
    } else {
        dbcon.query("SELECT * FROM users WHERE ref = ?", [decoded.phone_number], (err, payload) => {
            if (err) throw err

            res.json(payload)
        })
    }
})


app.post('/api/edit_update', (req, res)=>{
    let user_id = req.body.user_id
    let pre_name = req.body.pre_name
    let last_name = req.body.last_name
    let bank_name = req.body.bank_name
    let bank_number = req.body.bank_number


    dbcon.query("UPDATE users SET pre_name = ?, last_name = ?, bank_name = ?, bank_number = ? WHERE id = ?", [pre_name, last_name, bank_name, bank_number, user_id], (err, updateEdit)=>{
        if(err) throw err

        res.json({edited: true})
    })
})


app.post("/api/check_user", AuthenticationToken, (req, res)=>{
    let decoded = req.decoded

    if(decoded.bad_token){
        res.json({bad_token: true})
    }else{

        dbcon.query("SELECT * FROM users WHERE phone_number = ? ", [decoded.phone_number], (err, user)=>{
            if(err) throw err

            if(user.length > 0){
                dbcon.query("SELECT * FROM purchase WHERE merchant_id = ? ", [user[0].id], (err, payload)=>{
                    if(err) throw err

                    res.json(payload)
                })
            }
        })
    }
})


app.listen(3005, () => {
    console.log("Server is running on port 3005")
})