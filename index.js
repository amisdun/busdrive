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


//registring router here

// initializing the port 
let port = 4000 || process.env.PORT

//serving the homepage
app.get("/",(req,res) => {
    res.json({res: "hello welcome to the homapage"})
})

//listening to the port

app.listen(port,() => {
    console.log(`server listening to port ${port}`)
})

module.exports = app