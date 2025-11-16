const express = require('express');
const router = express.Router();
const pool = require('../util/db')
const result = require('../util/result')

router.post('/', (req,res)=>{
    const {name, email, password, mobile} = req.body
    const sql = `INSERT into users(name, email, password, mobile) VALUES(?,?,?,?)`
    pool.query(sql, [name, email, password, mobile],(err, data)=>{
        if(data)
        {
            res.send(result.createResult(null,data))
        }
        else{
            res.send(result.createResult(err))
        }
    })
        
})

router.get('/',(req,res)=>{
    const sql = 'select * from users'
    pool.query(sql,(err,data)=>{
        if(data){
            res.send(result.createResult(null,data))
        } else {
            res.send(result.createResult(err))
        }
    })
})

router.put('/',(req,res)=>{
    const sql = 'UPDATE users SET name = ?, email = ?, mobile = ? where uid = ?'
    pool.query(sql, [uid], (err,data)=>{
        if(data){
            res.send(result.createResult(null,data))
        } else {

        }
    })
})

module.exports = router