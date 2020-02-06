const mongoose = require("mongoose")

// let busses = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     bus_number: {
//         type: String,
//         required: true
//     },
//     seat_capacity: {
//         type: Number,
//         required: true
//     },
//     route: {
//         type: String,
//         required: false
//     },
//     travelling_session: {
//         type: String,
//         required: false
//     },
//     travelling_date: {
//         type: Date,
//         required: false
//     },
//     fare: {
//         type: String,
//         required: false
//     }
// })

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

// let bus = mongoose.model("buses",busses)
let available_bus = mongoose.model("available_bus",available_busses)
// module.exports = bus
module.exports = available_bus