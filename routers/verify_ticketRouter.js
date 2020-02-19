const express = require("express")
const router = express.Router()
const verify_ticket = require("../controllers/verify_ticket")
const admin_auth = require("../middleware/jwt_admin")
require("../index")

router.get("/verify",admin_auth,verify_ticket)


module.exports = router