const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    pic: {
        type: String,
        default: "https://static.wikia.nocookie.net/disney/images/3/3c/Thor_Odinson_-_Profile.png/revision/latest/scale-to-width-down/1200?cb=20220513113709"
    },
    followers: [{
        type: "ObjectId",
        ref:"user"
    }],
    following:[{
        type: "ObjectId",
        ref:"user"
    }]

})
module.exports = mongoose.model("User", userSchema)

