const mongoose = require("mongoose")

let user_signup = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user_account_balance: {
        type: mongoose.Types.Decimal128,
        required: false
    },
    booking_details: [
        {  
            booking_id: {
                type: String,
                required: false
            },
            seat_number: {
                type: String,
                required: false
            },
            bus_number: {
                type: String,
                required: false
            },
            travelling_session: {
                type: String,
                required: false
            },
            booking_date: {
                type: String,
                required: false
            },
            route: {
                type: String,
                required: false
            },
            ticket_prize: {
                type: String,
                required: false
            }
        }
    ]
})

let users = mongoose.model("user_signup",user_signup)

module.exports = users