// const express = require("express");
// const requireLogin = require("../middleware/requireLogin");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Post = mongoose.model("Post");
const express = require("express")
// const post = require("../models/post")
const Post = require("../models/post");

const requireLogin = require("../middleware/requireLogin");
const router = express.Router()


router.post("/createPost", requireLogin, (req, res) => {


    const {title, body, pic} = req.body

    if(!title || !body || !pic){
        return res.status(422).json({
            error:" please  fill all the file"
        })
    }
        const post = new Post({
            title,
            body,
            photo: pic,
            postedBy: req.user
        });

         post.save()
            .then(data =>{
                return res.status(201).json({
                    msg : "post added successfully"
                })
            })
        // .then(result => {
        //     res.json({ post: result });
        // })
        // .catch(err => {
        //     console.log(err);
        // });
    
});

module.exports = router; 


