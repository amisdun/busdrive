const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const db = require("../db_connection/mongoose_db")
const available_bus = require("../model/busses")
require("../index")

let create_available_busses = async (req,res,next) => {
    try {
        let bus_number = await available_bus.findOne({bus_number: req.body.bus_number}).exec()
        if(bus_number){res.json({res: "active",msg: "Bus already added"})}
        else{
            new available_bus({
                _id: new mongoose.Types.ObjectId,
                bus_number: req.body.bus_number,
                seat_capacity: req.body.seat_capacity,
                route: req.body.route,
                travelling_session: req.body.travelling_session,
                travelling_date: req.body.travelling_date,
                fare: req.body.fare
            }).save()

            res.status(201).json({res: "created", msg: "Bus added successfully"})
        }
    } catch (error) {
        res.status(500).json({res: "error", msg: "An error has occured"})   
        console.log(error)
    }
}

let edit_available_busses = async (req,res,next) => {
    try {
        let update_bus = {
            bus_number: req.body.bus_number,
            seat_capacity: req.body.seat_capacity,
            route: req.body.route,
            travelling_session: req.body.travelling_session,
            travelling_date: req.body.travelling_date,
            fare: req.body.fare
        }
        await available_bus.findByIdAndUpdate({id: req.params.id},update_bus).exec()
        res.json({res: "updated", msg: "update successfully"})
    } catch (error) {
        res.status(500).json({res: "error", msg: "An error has occured"})
        console.log(error)
    }
}

let fetch_all_busses = async (req,res,next) => {
    try {
        let all_buses = await available_bus.find({}).exec()
        if(all_buses.length >= 1){res.json({res: "found", data: all_buses})}
        else{res.json({res: "No bus", msg: "No available bus at the moment"})}
    } catch (error) {
        console.log(error)
    }
}

let find_single_bus = async (req,res,next) => {
    try {
        let single_bus = await available_bus.findOne({bus_number: req.body.bus_number}).exec()
        if(single_bus){res.json({res: "found", data: single_bus})}
        else{res.json({res: "Not found"})}
    } catch (error) {
        res.status(500).json({res: "error", msg: "An error has occured"})
        console.log(error)
    }
}

let delete_bus = async (req,res,next) => {
    try {
        await available_bus.findByIdAndDelete({id: req.params.id}).exec()
        res.json({res: "deleted", msg: "deleted successfully"})
    } catch (error) {
        res.status(500).json({res: "error", msg: "An error has occured"})
        console.log(error)
    }
}

let find_by_initials = async (req,res,next) => {
    try {
        let data = {
            route: req.body.route,
            travelling_date: req.body.travelling_date,
            travelling_session:  req.body.travelling_session
        }

        let result = await available_bus.find(data).exec()

        if(result.length >= 1){res.json({res: "found", data: result})}
        else{res.json({res: "not found", msg: "No bus is available at the moment"})}
    } catch (error) {
        res.status(500).json({res: "error", msg: "An error has occured"})
        console.log(error)
    }
}


module.exports = {
    delete_bus,
    find_single_bus,
    fetch_all_busses,
    create_available_busses,
    edit_available_busses,
    find_by_initials
}
