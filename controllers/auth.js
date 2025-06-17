const express = require("express")
const router = express.Router()
const User = require('../models/auth')
const bcrypt = require('bcrypt')

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(422).json({ msg: "Please Add All The Fields " })
    } 
        User.findOne({ email: email }).then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ msg: "User is already available" })
            }
            bcrypt.hash(password, 12).then((hashedPassword) => {
                const user = new User({
                    name, 
                    email, 
                    password: hashedPassword,
                })
                user.save()
              .then(()=>{
                res.status(200).json({msg:"user saved successfully"})
              })
            })
        })
        
    
})


module.exports = router