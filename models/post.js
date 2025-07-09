const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },

    photos: {
        type: String,
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    Comment: [{
        text: String,
        postedBy: {
            type: ObjectId,
            ref: "User"
        }
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  // ✅ Use string, not variable
    }


})

module.exports = mongoose.model("Post", postSchema)
