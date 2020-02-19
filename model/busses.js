const mongoose = require("mongoose")

let available_busses = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bus_number: {
        type: String,
        required: true
    },
    seat_capacity: {
        type: Number,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    travelling_session: {
        type: String,
        required: true
    },
    travelling_date: {
        type: Date,
        required: true
    },
    fare: {
        type: String,
        required: true
    }
})

let available_bus = mongoose.model("available_bus",available_busses)
module.exports = available_bus