const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const db = require("../db_connection/mongoose_db")
const buses =  require("../model/busses") 
require("../index")

let booking = async (req,res,next) => {
    try {
        //generate random booking ID here

        let bus_id = req.params.bus_id
        let bus = await buses.findById(bus_id).exec()
        if(bus.seat_capacity >= 1){
            
        }
    } catch (error) {
        console.log(error)
    }
}