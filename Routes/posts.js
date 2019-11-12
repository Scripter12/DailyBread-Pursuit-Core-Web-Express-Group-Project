const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('', async (req, res) => {
    try {
        let allPost = await db.any("SELECT * FROM posts")

        res.json({
            posts: allPost,
            message: "Success"
        })
    } catch (error) {
        res.json({
            message: "Error"
        })
    }
})

router.get('/:posts_id', async (req, res) => {
    try {
        let getPost = await db.any(`SELECT * FROM posts WHERE id = ${req.params.posts_id}`)
        res.json({
            post: getPost,
            message: "Success"
        })
    } catch (error) {
        res.json({
            message: "Error"
        })
    }
})

router.post('', async (req, res) => {
    try {
        let insertQuery = `INSERT into posts(post_id, body)
                VALUES($1, $2)`
        if (!insertQuery) {
            res.json({
                message: "information Missing"
            })
        } else {
            await db.none(insertQuery, [req.body.post_id, req.body.body])
            res.json({
                post: req.body,
                message: "posted"
            })
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
})

router.patch('/:id', async (req, res) => {

    try{
    await db.none( `UPDATE posts SET body = '${req.body.key}' WHERE id = ${req.params.id}`)
    res.json({
        message: "updated post"
    })
    }catch(error){
        console.log(error)
        res.send({
            'error': error
        })
    }
})

//Export
module.exports = router