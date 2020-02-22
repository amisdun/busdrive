const express = require("express")
const router = express.Router()
const user_signin = require("../controllers/user_signin")
const user_signup = require("../controllers/user_signup")
require("../index")

router.post("/user_signin",user_signin)
router.post("/user_signup",user_signup)

module.exports = router