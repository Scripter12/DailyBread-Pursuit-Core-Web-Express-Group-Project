const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/posts/:post_id', async (req, res) => {
  try {
    let comments = await db.any(`SELECT * FROM comments WHERE post_id = ${req.params.post_id}`)
    res.json({
      data: comments
    })
  }
  catch (err) {
    console.log(err);
    res.json({ error: err })
  }
});

router.post('/posts/:post_id/:commenter_id', async (req, res) => {
  try {
    await db.none(`INSERT INTO comments(post_id,commenter_id,comment) VALUES(${req.params.post_id},${req.params.commenter_id}, '${req.body.comment}')`)
    res.json({ message: "added comment" })
  }
  catch (err) {
    console.log(err);
    res.json({ error: err })
  }
})

router.patch('/:post_id/:commenter_id', async (req, res) => {
  try{
    await db.none( `UPDATE comments SET comment = '${req.body.comment}' WHERE post_id = ${req.params.post_id} AND commenter_id = ${req.params.commenter_id}`)
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

router.delete('/:post_id/:commenter_id', async (req, res) => {
  try {
    let deletedUser = await db.none(`DELETE FROM comments WHERE post_id = ${req.params.post_id} AND commenter_id = ${req.params.commenter_id} AND id = ${req.body.id}`);
    res.json({ 
      message: "deleted comment" ,
      data : deletedUser
  })
  } catch(err){
    console.log(err);
    res.json({ error: err })
  }
})

//Export
module.exports = router