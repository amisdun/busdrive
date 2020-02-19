const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const db = require("../db_connection/mongoose_db")
const buses =  require("../model/busses") 
const user = require("../model/users")
const uniqid = require("uniqid")
require("../index")

let booking = async (req,res,next) => {
    try {
        //generate random booking ID here
        let booking_id = uniqid() 

        let bus_id = req.params.bus_id
        let user_id = req.user.user_id
        let bus = await buses.findById(bus_id).exec()
        let day = new Date().getUTCDay()
        let month = new Date().getUTCMonth()
        let year = new Date().getUTCFullYear()
        let date = `${month}/${day}/${year}`
        if(bus.seat_capacity >= 1){
            let user_booking = await user.findById(user_id).exec()
            if(user_booking.user_account_balance >= bus.fare){
                let new_account_balance = user_booking.user_account_balance - bus.fare
                await user.findByIdAndUpdate(user_id,{user_account_balance: new_account_balance}).exec()
                await user.findByIdAndUpdate(user_id,{"$push": {
                    booking_details: {
                        booking_id: booking_id,
                        seat_number: bus.seat_capacity,
                        bus_number: bus.bus_number,
                        travelling_session: bus.travelling_session,
                        booking_date: date,
                        route: bus.route,
                        ticket_prize: bus.fare
                    }
                }}).exec()
                let new_seat = bus.seat_capacity - 1
                await buses.findByIdAndUpdate(bus_id,{seat_capacity: new_seat}).exec()
                res.json({res: "booking success",msg: 'Thanks for riding with us',data: new_booked})
            }
            else{
                res.json({res: "insufficient", msg: "Your balance is insufficient"})
            }
        }
        else{
            res.json({res: "book error", msg: "all seats have been booked, please next bus will be available soon"})
        }
    } catch (error) {
        res.json({res: "error", msg: "An error has occured"})
        console.log(error)
    }
}

module.exports = booking