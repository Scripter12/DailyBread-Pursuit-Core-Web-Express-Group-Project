const express = require('express')
const router = express.Router()
const db = require('./db')


router.get('/albums/:album_id', async (req, res) => {
  try {
    let pictures = await db.any(`SELECT * 
                                 FROM pictures 
                                 `);
    res.json({
      data: pictures
    });
  }
  catch (err) {
    res.json({ error: err })
  }
})

router.post('/albums/:albums_id', async (req, res) => {
  try {
    await db.none(`INSERT INTO pictures(album_id,body) VALUES(${req.params.album_id},$1)`)
  }
  catch (err) {
    res.json({ error: err })
  }
})


router.delete('/:pictures_id', async (req, res) => {
  try {
   await db.none(`DELETE FROM pictures WHERE id = ${req.params.pictures_id}`)
  }
  catch {
    res.json({ error: err })
  }
})

//Export
module.exports = router