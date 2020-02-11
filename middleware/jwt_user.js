const jwt = require("jsonwebtoken");
require("../index").default
require("dotenv").config({path:__dirname + '/config.env'})

var authenticate = (req,res,next) => {
    jwt.verify(req.body.token,process.env['USER_KEY'],(err,decode)=>{
        if(err){
            res.json({
                message: "an error has occured",
                error: err
            })
        }
        req.user = decode;
        next();
    })
    
}

module.exports = authenticate;