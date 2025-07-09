const express = require("express");
const router = express.Router();
const User = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

// signup
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ msg: "Please fill all the fields" });
    }

    User.findOne({ email }).then(savedUser => {
        if (savedUser) {
            return res.status(422).json({ msg: "User already exists" });
        }

        bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({ name, email, password: hashedPassword });

            user.save().then(savedUser => {
                const token = jwt.sign({ id: savedUser._id }, SECRET_KEY);
                return res.status(200).json({ msg: "User saved successfully", token });
            });
        });
    });
});

// login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: "Please fill all the fields" });
    }

    User.findOne({ email }).then(dbUser => {
        if (!dbUser) {
            return res.status(422).json({ errorMessage: "No user exists with this email" });
        }

        bcrypt.compare(password, dbUser.password).then(doMatch => {
            if (doMatch) {
                const token = jwt.sign({ id: dbUser._id }, SECRET_KEY);
                return res.status(200).json({ msg: "Login successful", token });
            } else {
                return res.status(401).json({ errorMessage: "Invalid credentials" });
            }
        });
    });
});

// protected
router.get("/protected", requireLogin, (req, res) => {
    res.status(200).json({ msg: "Access granted!!" });
});

module.exports = router;
