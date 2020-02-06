const jwt = require("jsonwebtoken");
require("../../index")

var authenticate = (req,res,next) =>{
    jwt.verify(req.body.token,"mhgytuhuhryteghdvjdhdjvbdj",(err,decode)=>{
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