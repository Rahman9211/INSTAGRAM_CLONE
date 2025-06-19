const express = require("express");
const router = express.Router();
const User = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../keys")
const requireLogin = require("../middleware/requireLogin");

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
                // user.save().then(() => {
                //     return res.status(200).json({ msg: "user saved successfully" });
                // });
                user.save().then((savedUser) => {
                    const token = jwt.sign({ id: savedUser._id }, SECRET_KEY);
                    return res.status(200).json({ msg: "User saved successfully", token });
                });

            });
        });
    }
});
// login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: "Please fill all the fields" });
    }

    User.findOne({ email: email })
        .then(dbUser => {
            if (!dbUser) {
                return res.status(422).json({ errorMessage: "No user exist for this email !!" });
            }

            bcrypt.compare(password, dbUser.password)
                .then(dbUser => {
                    const token = jwt.sign({ id: dbUser._id }, SECRET_KEY);
                    return res.status(200).json({ msg: "Login successful", token });
                });

        });
});
// protcted
router.get("/protcted", requireLogin, (req, res) => {
    res.status(200).json({ msg: "access granted!!" })

})

module.exports = router;























// router.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(422).json({ msg: "Please fill all the fields" }); // ✅ return added
//     } else {
//         User.findOne({ email: email }).then((savedUser) => {
//             if (!savedUser) {
//                 return res.status(422).json({ msg: "invalid email or password" });
//             }
//             bcrypt.compare(password, savedUser.password).then((doMatch) => {
//                 if (doMatch) {
//                     return res.status(200).json({ msg: "login successful" });
//                 } else {
//                     return res.status(422).json({ msg: "invalid email or password" });
//                 }
//             });
//         });
//     }
// });