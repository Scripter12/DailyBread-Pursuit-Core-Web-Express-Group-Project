const express = require('express')
const pgp = require('pg-promise')
const postClass = require("../Classes/comments.js");
const router = express.Router()
const connectionString = "postgres://localhost:5432/dailyBread"
const db = pgp(connectionString);



router.get("/posts/:post_id", (req, res) => {

})

router.post("/posts/:post_id/:commenter_id")

router.patch(":post_id/commenter_id")

router.delete(":post_id/commenter_id")
//Export
module.exports = router