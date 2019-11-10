const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/dailybread"
const db = pgp(connectionString);

router.get('/albums/:album_id', (req, res) => {
  try {
    let pictures = db.any(`SELECT * FROM pictures WHERE album_id = ${req.params.album_id}`)
    res.json({
      data: pictures
    })
  }
  catch (err) {
    res.json({ error: err })
  }
})

router.post('/albums/:album_id', (req, res) => {
  try {
    db.none(`INSERT INTO pictures(album_id,body) VALUES(${req.params.album_id},$1)`)
  }
  catch (err) {
    res.json({ error: err })
  }
})


router.delete('/:pic_id', (req, res) => {
  try {
    db.none(`DELETE FROM pictures WHERE id = ${req.params.pic_id}`)
  }
  catch {
    res.json({ error: err })
  }
})

//Export
module.exports = router