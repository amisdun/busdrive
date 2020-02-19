const mongoose = require("mongoose")
mongoose.Promise = global.Promise
require("../index")

let verify_ticket = async (req,res,next) => {
    try {
        let booking_id = req.body.booking_id
        let ticket_verification = await booked.findById(booking_id).exec()
        if(ticket_verification.ticket_used === false){
            await booked.findByIdAndUpdate(booking_id,{ticket_used: true}).exec()
            res.json({res: "done"})
        }
        else{
            res.json({res: "error", msg: "ticket already used"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = verify_ticket