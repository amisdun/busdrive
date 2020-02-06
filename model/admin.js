const mongoose = require("mongoose")

let admin_signup = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

let routes = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    route: {
        type: String,
        required: true
    },
    fare: {
        type: String,
        required: true
    },
    travelling_date: {
        type: Date,
        required: true
    }
})


let route = mongoose.model("routes",routes)
let signup = mongoose.model("admin_signup", admin_signup)

module.exports = {
    signup,
    routes
}