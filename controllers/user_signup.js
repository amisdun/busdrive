const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const db = require("../db_connection/mongoose_db")
const password_hash = require("password-hash")
const user_account = require("../model/users")
require("../index")

let users = async (req,res,next) => {
    try {
        let user = await user_account.findOne({email: req.body.email}).exec()
        if(user){res.json({res: "exist",msg: "User already exist"})}
        else{
            let hash = password_hash.generate(req.body.password)
            await new user_account({
                _id: new mongoose.Types.ObjectId,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                user_account_balance: 0.0
            }).save()

            res.status(201).json({res: "created",msg: "User account created succesfully"})

        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = users