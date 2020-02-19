const express = require("express")
const router = express.Router()
require("../index")
const user_auth = require("../middleware/jwt_user")
const payment_check = require("../middleware/payment_check")


// // payment through stripe
// router.post("/stripe/payment_check/:bus_id",user_auth,payment_check.stripe_payment,booking)
// router.post("/stripe/already_paid/:payment_id",user_auth,payment_check.already_paid,booking)

// paypemt through paypal
router.post("/payment/payment_check",user_auth,payment_check.paypal_payment)
router.get("/payment/success",payment_check.paypal_verification_success)
router.get("/payment/cancel", payment_check.paypal_verification_cancel)

module.exports = router
