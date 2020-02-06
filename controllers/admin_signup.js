const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const jwt = require("jsonwebtoken")
const password_hash = require("password-hash")
const db = require("../db_connection/mongoose_db")
require("../index")
const signup = require("../model/admin")

let admin_signup = async (req,res,next) => {
    try {
        let admin = await signup.signup.findOne({username: req.body.username}).exec()

        if(admin){res.json({res: "exist",msg: "username aleady exist"})}
        else{
            let hash = password_hash.generate(req.body.password)
            new signup.signup({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash
            }).save()

            res.status(201).json({res: "created", msg: "new admin account created"})
        }
    } catch (error) {
        res.status(500).json({err: "An error has occured"})
        console.log(error)
    }
}

module.exports = admin_signup