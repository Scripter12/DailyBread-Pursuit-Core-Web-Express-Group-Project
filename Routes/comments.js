const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/dailybread"
const db = pgp(connectionString);

router.get('/posts/:post_id', async (req, res) => {
  try {
    let comments = db.any(`SELECT * FROM comments WHERE comment_id = ${req.params.post_id}`)
    res.json({
      data: comments
    })
  }
  catch (err) {
    res.json({ error: err })
  }
});

router.post('/posts/:post_id/:commenter_id', (req, res) => {
  try {
    db.none(`INSERT INTO comments(comment_id,commenter_id,comment) VALUES(${req.params.post_id},${req.params.commenter_id},${req.body.comment}`)
  }
  catch (err) {
    res.json({ error: err })
  }
}
)

router.patch('/:post_id/:commenter_id', (req, res) => {
  try {
    db.none(`UPDATE comments SET comment = ${req.body.comment} WHERE comment_id = ${req.params.post_id} AND commenter_id = ${req.params.commenter_id} AND id = $1`)
  }
  catch{
    res.json({ error: err })
  }
})

router.delete('/:post_id/:commenter_id', (req, res) => {
  try {
    db.none(`DELETE FROM comments WHERE comment_id = ${req.params.post_id} AND commenter_id = ${req.params.commenter_id} AND id = $1`)
  }
  catch {
    res.json({ error: err })
  }
})


//Export
module.exports = router