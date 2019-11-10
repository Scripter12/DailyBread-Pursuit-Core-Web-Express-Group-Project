const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('', async (req, res) => {
    try {
        let allUsers = await db.any("SELECT * FROM users");

        res.json({
            users: allUsers,
            message: "Success"
        })
    } catch (error) {
        res.json({
            message: "Error"
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        let getUser = await db.one(`SELECT * FROM users WHERE id = ${req.params.id}`);
        res.json({
            status: "Success",
            message: "Got single user",
            body: {
                user: getUser
            }
        })
    } catch (error) {
        res.json({
            message: "No user associated with this ID"
        })
    }
});

router.post('/', async (req, res) => {
    try {
        let insertQuery = `INSERT into users(firstname, lastname, bio, proPic)
        VALUES($1, $2, $3, $4)`

        if (!insertQuery) {
            res.json({
                message: "Information Missing"
            })
        } else {
            await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.bio, req.body.proPic]);

            res.json({
                user: insertQuery,
                message: "posted"
            })
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let deletedUser = await db.none(`DELETE FROM users WHERE id = ${req.params.id}`);

        res.json({
            status: "Success",
            message: "Deleted User",
            body: {
                data: deletedUser
            }
        })
    }
    catch (error) {
        res.json({
            message: error
        })
    }
})


//Export
module.exports = router;
