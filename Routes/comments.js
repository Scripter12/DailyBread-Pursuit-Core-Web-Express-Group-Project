const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/posts/:post_id', async (req, res) => {
  try {
    let comments = await db.any(`SELECT * FROM comments WHERE comment_id = ${req.params.post_id}`)
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
    await db.none(`INSERT INTO comments(comment_id,commenter_id,comment) VALUES(${req.params.post_id},${req.params.commenter_id},${req.body.comment})`)
    res.json({ message: "added comment" })
  }
  catch (err) {
    res.json({ error: err })
  }
}
)

router.patch('/:post_id/:commenter_id', async (req, res) => {
  try {
    await db.none("UPDATE comments SET comment = $1 WHERE comment_id = $2 AND commenter_id = $3 AND id = $4", [req.body.comment, req.params.post_id, req.params.commenter_id, req.query.id])
    res.json({ message: "changed comment" })
  }
  catch (err) {
    res.json({ error: err })
  }
})

router.delete('/:post_id/:commenter_id', async (req, res) => {
  try {
    await db.none(`DELETE FROM comments WHERE comment_id = $1 AND commenter_id = $2 AND id = $3`, [req.params.post_id, req.params.commenter_id, req.query.id])
    res.json({ message: "deleted comment" })
  }
  catch {
    res.json({ error: err })
  }
})

//Export
module.exports = router