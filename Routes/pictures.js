const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/dailybread"
const db = pgp(connectionString);


//Export
module.exports = router