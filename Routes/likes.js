const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/posts/:post_id', async (req,res) =>{
    let post_id = req.params.post_id
    try{
        let likes = await db.any(`SELECT * FROM likes WHERE post_id = ${post_id}`)
        res.json({
            data : likes,
        })
    }catch(error){
        res.json({
            'error' : error,
        })
    }
})

router.post('/posts/:post_id', async (req,res) =>{
    let post_id = req.params.post_id
    try{
        let insertQuery = `INSERT into likes(liker_id, post_id)
                VALUES($1, $2)`
        if (!insertQuery) {
            res.json({
                message: "information Missing"
            })

        }else {
            await db.none(insertQuery, [req.body.liker, req.params.post_id])
            res.json({
                message: "liked"
            })
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
})




//Export
module.exports = router
