const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')()
const connectionString ="postgres://localhost:5432/dailyBread"
const db = pgp(connectionString);

router.get('/users', async (req, res) => {
    try{
        let allUsers = await db.any("SELECT * FROM users")
        res.json({
            posts: allUsers,
            message: "Success"
        })
    }catch(error){
        res.json({
            message: "Error"
        })
    }
    });
    
router.get('/users/:id', async (req,res) =>{
try{
    let getUser = await db.any(`SELECT * FROM users WHERE id = ${req.params.id}`)
    res.json({
        status: "Success",
        message: "Got single user",
        body:{
            user: getUser
        }
    })
}catch(error){
        res.json({
            message: "Error"
        })
}
});

router.post('/users', async (req,res) => {
    try{
        let insertQuery = `INSERT into users(firstname, lastname, bio, proPic)
        VALUES($1, $2, $3, $4)`

        await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.bio, req.body.proPic])
    
        res.json({
            user: insertQuery,
            message:"posted"
        })
    }catch(error){
        res.json({
            message:error
        })
    }
});

// router.delete('/users/:id', (req,res) => {

//     let deleteUser = `DELETE FROM users WHERE id = ${req.body.id}`
    
// })


//Export
module.exports = router;
