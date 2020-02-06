const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const jwt = require("jsonwebtoken")
const password_hash = require("password-hash")
const db = require("../db_connection/mongoose_db")
const admins = require("../model/admin")
require("../index")

let admin_singin = async (req,res,next) => {
    try {
        let admin = await admins.signup.findOne({username: req.body.username}).exec()
    if(admin){
        let verify = password_hash.verify(req.body.password,admin.password)
        if(verify == true){
            let token = jwt.sign({admin_id: admin._id},"mhgytuhuhryteghdvjdhdjvbdj",{expiresIn: "24h"})
            res.json({res: "Auth success",token: token})
        }
        else{res.json({res: "Auth failed", msg: "Invalid credentials"})}
    }
    else{res.json({res: "Auth failed", msg: "Invalid credentials"})}
    } catch (error) {
        console.log(error)
    }
}

module.exports = admin_singin