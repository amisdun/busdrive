const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const password_hash = require("password-hash")
const jwt = require("jsonwebtoken")
const db = require("../db_connection/mongoose_db")
const user = require("../model/users")
require("../index")

let user_signin = async (req,res,next) => {
    try {
        let user_account = await user.findOne({email: req.body.email}).exec()
        if(user_account){
            let verify = password_hash.verify(req.body.password,user_account.password)

            if(verify === true){
               let token = jwt.sign({user_id: user_account._id},process.env['USER_KEY'], {expiresIn: "24h"})
                res.json({res: "Auth success", token: token})
            }
            else{
                res.json({res: "Auth failed", msg: "invalid credentials"})
            }
        }

        else{
            res.json({res: "Auth failed", msg: "invalid credentials"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = user_signin