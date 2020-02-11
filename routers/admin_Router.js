const express = require("express")
const router = express.Router()
const admin_signin = require("../controllers/admin_singin")
const admin_signup = require("../controllers/admin_signup")
require("../index")

router.post("/admin_signin",admin_signin)
router.post("/admin_signup",admin_signup)

module.exports = router