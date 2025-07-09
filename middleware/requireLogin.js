const jwt = require("jsonwebtoken")
const User = require('../models/auth');
const { SECRET_KEY } = require("../keys")
module.exports = (req,res,next)=>{

    const {authorization}=req.headers

    if(!authorization){
        return res.status(401)
            .json({
                errorMessage: "please login first one"
            })
    }
    const token =authorization.replace("Bearer" , "")
    // console.log(token);

    jwt.verify(token,SECRET_KEY, (err, payload)=>{
        if(err){
            return res.status(401)
                .json({
                    errorMessage: "please login first two"
                })
        }
        const {id} = payload
        // console.log(id);

        User.findById(id) 
            .then(savedUser=>{
                // console.log("middleware:", savedUser);                             
             
                req.user = savedUser
                
                next()
            })
    })
}
