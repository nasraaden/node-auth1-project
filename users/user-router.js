const express = require("express");

const router = express.Router();

const Users = require("./user-model.js");
const restricted = require('../auth/restricted-middleware.js');

router.get("/", restricted, (req, res) => {
    Users.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "There was an error retrieving users."})
    })
})

module.exports = router;