const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/albums/:album_id', async (req, res) => {
  try {
    let pictures = await db.any(`SELECT * FROM pictures WHERE owner_id = ${req.params.picture_id}`)
    res.json({
      data: pictures
    })
  }
  catch (err) {
    console.log(err)
    res.json({ error: err })
  }
})

router.post('/:album_id', async (req, res) => {
  try {
   await db.none(`INSERT INTO pictures(album_id,body) VALUES(${req.params.album_id},$1)`)
  }
  catch (err) {
    res.json({ error: err })
  }
})


router.delete('/:pic_id', async (req, res) => {
  try {
    await db.none(`DELETE FROM pictures WHERE id = ${req.params.pic_id}`)
  }
  catch {
    res.json({ error: err })
  }
})

//Export
module.exports = router