const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/albums/:album_id', async (req, res) => {
  try {
    let pictures = await db.any(`SELECT * FROM pictures WHERE picture_id = ${req.params.album_id}`)
    res.json({
      data: pictures
    })
  }
  catch (err) {
    res.json({ error: err })
  }
})

router.post('albums/:album_id', async (req, res) => {
  try {
    await db.none(`INSERT INTO pictures(picture_id,body) VALUES(${req.params.album_id},$1)`, req.body.url)
    res.json({
      message: "added picture"
    })
  }
  catch (err) {
    res.json({ error: err })
  }
})


router.delete('/:pic_id', async (req, res) => {
  try {
    await db.none(`DELETE FROM pictures WHERE id = ${req.params.pic_id}`)
    res.json({
      message: "deleted picture"
    })
  }
  catch {
    res.json({ error: err })
  }
})

//Export
module.exports = router