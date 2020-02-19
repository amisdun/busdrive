const express = require("express")
const router = express.Router()
require("../index")
const user_auth = require("../middleware/jwt_user")
const booking = require("../controllers/booking")

router.post("/book_bus_ticket/:bus_id", user_auth,booking)

module.exports = router