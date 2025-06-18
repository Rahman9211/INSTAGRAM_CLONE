const express = require("express");
const router = express.Router();
const User = require('../models/auth');
const bcrypt = require('bcrypt');

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ msg: "Please fill all the fields" });
    } else {
        User.findOne({ email: email }).then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ msg: "User is already available" });
            }
            bcrypt.hash(password, 12).then((hashedPassword) => {
                const user = new User({
                    name,
                    email,
                    password: hashedPassword,
                });
                user.save().then(() => {
                    return res.status(200).json({ msg: "user saved successfully" });
                });
            });
        });
    }
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: "Please fill all the fields" });
    } else {
        User.findOne({ email: email }).then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ msg: "invalid email or password" });
            }
            bcrypt.compare(password, savedUser.password).then((doMatch) => {
                if (doMatch) {
                    return res.status(200).json({ msg: "login successful" });
                } else {
                    return res.status(422).json({ msg: "invalid email or password" });
                }
            });
        });
    }
});

module.exports = router;
