const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/albums/:owner_id', async (req, res) => {
    try{
        let album = await db.any(`SELECT * FROM albums WHERE owner_id = ${req.params.owner_id}`)

    res.json({
        album: album,
        message: "success"
    })
}catch (error) {
    res.json({
        message: "Error"
    })
}

router.post('/albums/:owner_id', async (req, res) => {
    
    try {
        let insertQuery = `INSERT into albums(album_title) WHERE owner_id = ${req.params.owner_id}
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

})


//Export
module.exports = router