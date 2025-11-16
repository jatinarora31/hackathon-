const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../util/db')
const result = require("../util/result")
const config = require("../util/config")
const route = express.Router()

const router = express.Router()

router.post('/signin', (req, res) => {
    console.log("tesing: ",req.body)
    const { email, password } = req.body
    console.log(email,password)
    const sql = `SELECT * FROM users WHERE email = ?`
    pool.query(sql, [email], (err, data) => {
        if (err)
            res.send(result.createResult(err))
        else if (data.length == 0)
            res.send(result.createResult("Invalid Email"))
        else {
            // in this else block the data is present i.e 
            // the user is kept at 0th index in the data array
            // check for the pasword
            bcrypt.compare(password, data[0].password, (err, passwordStatus) => {
                if (passwordStatus) {
                    const payload = {
                        uid: data[0].uid,
                    }
                    //jwt.sign(payload,config.secret)
                    const token = jwt.sign(payload, config.SECRET)
                    const user = {
                        token,
                        name: data[0].name,
                        email: data[0].email,
                        mobile: data[0].mobile
                    }
                    res.send(result.createResult(null, user))
                }
                else
                    res.send(result.createResult('Invalid Password'))
            })
        }

    })
})

router.post('/signup', (req, res) => {
    const { name, email, password, mobile } = req.body
    const sql = `INSERT INTO users(name,email,password,mobile) VALUES (?,?,?,?)`
    // create the hashedpassword
    bcrypt.hash(password, config.SALT_ROUND, (err, hashedPassword) => {
        if (hashedPassword) {
            pool.query(sql, [name, email, hashedPassword, mobile], (err, data) => {
                res.send(result.createResult(err, data))
            })
        } else
            res.send(result.createResult(err))
    })
})

module.exports = router