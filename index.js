const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
require("dotenv").config({path:__dirname + '/config.env'})

let app = express()

// using cors
app.use(cors())

//initializing body parser
app.use(bodyParser.urlencoded({extended: false}))
// pasrsing body payload as json
app.use(bodyParser.json())

// serving static files
// app.use(express.static(""))

// requiring router here
const admin = require("./routers/admin_Router")
const users = require("./routers/user_Router")
const bookings = require("./routers/bookingRouter")
const verify_ticket = require("./routers/verify_ticketRouter")
const buses = require("./routers/available_bussesRouter")
const payment = require("./routers/paymentRouter")

//registring router here
app.use("/admin",admin)
app.use("/users",users)
app.use("/book",bookings)
app.use("/ticket",verify_ticket)
app.use("/bus",buses)
app.use("/pay",payment)

// initializing the port 
let port = 4000 || process.env.PORT

//serving the homepage
app.get("/",(req,res) => {
    res.locals.name = "mikel"
    res.json({res: "hello welcome to the homapage"})
    console.log(res.locals.name)
})

//listening to the port

app.listen(port,() => {
    console.log(`server listening to port ${port}`)
})

module.exports = app