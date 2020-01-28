const express = require("express");

const router = express.Router();

const bc = require("bcryptjs");

const Users = require("../users/user-model.js");

router.post("/register", (req, res) => {
    const user = req.body;
    const hash = bc.hashSync(req.body.password, 8);
    user.password = hash;

    Users.insert(user)
    .then(users => {
        res.status(201).json(users)
    })
    .catch(err => {
        res.status(500).json({error: "There was an error adding a user."})
    })
})

router.post("/login", (req, res) => {
    const {username, password}= req.body;

    Users.getBy({username})
    .first()
    .then(user => {
        if (user && compareSync(password, user.password)) {
            res.status(200).json(`Welcome ${user.username}`)
        } else {
            res.status(401).json({error: "Invalid username or password."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;