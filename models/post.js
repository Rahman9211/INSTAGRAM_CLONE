const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    likes: [{
        type: ObjectId,
        ref: User
    }],
    Comment: [{
        text: String,
        postedBy: {
            type: ObjectId,
            ref: User
        }
    }],
    postedBy: {
        type: ObjectId,
        ref: User
    }

})

module.exports = mongoose.model("Post", postSchema)
