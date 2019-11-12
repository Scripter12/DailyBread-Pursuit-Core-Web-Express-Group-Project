const express = require('express')
const router = express.Router()
const db = require('./db')


router.get('/:owner_id', async (req, res) => {
  try {
    let album = await db.any('SELECT * FROM albums WHERE owner_id = $1', req.params.owner_id)
    res.json({
      albums: album,
      message: "success"
    })
  }
  catch (err) {
    res.json({ message: err })
  }
})


router.post('/:owner_id', async (req, res) => {

  try {
    let insertQuery = `INSERT into albums(album_title) WHERE owner_id = ${req.params.owner_id}
                VALUES($1)`

    await db.none(insertQuery, [req.body.album_title])
    res.json({
      post: insertQuery,
      message: "posted"
    })
  } catch (error) {
    res.json({
      message: error
    })
  }
})




//Export
module.exports = router