const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/:owner_id', async (req, res) => {
    try{
  let getAlbums = await db.any(`SELECT 
                 a.album_title albums,
                 p.body pictures
              FROM pictures p
              FULL OUTER JOIN albums a
              ON a.id = p.album_id
              WHERE owner_id = ${req.params.owner_id}`);
    res.json({
        album: getAlbums,
        message: "success"
    })
}catch (error) {
    // console.log(error);
    res.json({
        message: error
    })
    }
})

router.post('/:owner_id', async (req, res) => {
    
    try {
        let insertQuery = `INSERT into albums WHERE owner_id = ${req.params.owner_id}
                VALUES($1)`
       
            await db.none(insertQuery, [req.body.album_title])
            res.json({
                post: insertQuery,
                message: "posted"
            })
        }catch (error) {
        res.json({
            message: error
        })
    }
})




//Export
module.exports = router