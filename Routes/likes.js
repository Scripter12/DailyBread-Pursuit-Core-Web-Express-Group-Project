const express = require('express')
const router = express.Router()
const db = require('./db')


router.get('/likes/posts/:post_id', (req,res) =>{
    let post_id = req.params.post_id
    try{
        let likes = db.any(`SELECT * FROM likes WHERE post_id = ${post_id}`)
        res.json({

            data : likes,
        })
    }catch{
        (error){
            res.json({
                'error' : error,
            })
        }
    }
})




//Export
module.exports = router
