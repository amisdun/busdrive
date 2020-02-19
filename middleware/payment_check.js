require("dotenv").config({path:__dirname + '/config.env'})
const secret_key = process.env["SECRET_KEY"]
const stripe = require("stripe")(secret_key)
const paypal = require("paypal-rest-sdk")
const path = require("path")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const user = require("../model/users")
require("../index")

let paypal_payment = async (req,res,next) => {
    user_id = req.user.user_id
    amount = req.body.amount
    let created_payment_link;
    paypal.configure({
        'mode': 'sandbox',
        'client_id': process.env['CLIENT_ID'],
        'client_secret': process.env['CLIENT_SECRET']
    })

    let create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4000/pay/payment/success",
            "cancel_url": "http://localhost:4000/pay/payment/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "account",
                    "sku": "user account",
                    "price": amount,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": amount
            },
            "description": "Account loading."
        }]
    };

    let create_payment = await paypal.payment.create(create_payment_json)
    if(create_payment){
        for(let i = 0; i <  create_payment.links.length; i++){
            if(create_payment.links[i].rel === "approval_url"){
                created_payment_link = create_payment.links[i].href
            }
            return created_payment_link
        }
        res.json({res: "approval_url", data: created_payment_link})
    }
}

let paypal_verification_success = async (req,res,next) => {
    let payment_id = req.query.payment_id
    let payer_id = req.query.payer_id
    let execute_payment_json = {
        "payer_id" : payer_id,
        "transactions" : [{
            "amount" : {
                "currency" : "USD",
                "total" : amount
            }
        }]
    }
    try {
        let execute_payment = await paypal.payment.execute(payment_id,execute_payment_json)
        if(execute_payment){
            let update_user_account = await user.findByIdAndUpdate(user_id, {user_account_balance: amount}).exec()
            res.redirect(path.join(__dirname + "/"))
                
        } 
    } catch (error) {
        res.json({res: "An error has occured"})
        console.log(error)
    }
}

let paypal_verification_cancel = (req,res,next) => {
    //res.sendFile(path.join(__dirname + "/"))
}

let stripe_payment = async (req,res,next) => {
    try{
        let customer = await stripe.customers.create({
            email: req.body.stripeEmail,
            token: req.body.stripeToken
        })
        if(customer){
            let charge = await stripe.charges.create({
                amount: req.body.amount,
                description: req.body.description,
                currency: "usd",
                customer: customer.id
            })
            if(charge){ 

            res.json({res: "success"}); 
            await new payment_details({
                _id: new mongoose.Types.ObjectId,
                payment_id: charge,
                email: req.user.email,
                booked: false
            }).save()

            req.charge = charge

            next()
        }
            else{res.json({res: "failed", msg: "an error has occured, pls try again"})}
        }
    } catch (error){
        console.log(error)
    }
}

let already_paid = async (req,res,next) => {
    let payment_id = req.params.payment_id
    try {
        let p_details = await payment_details.findOne({payment_id: payment_id})
        if(p_details){
            if(p_details.booked === true){
                res.json({booked: true, msg: "This payment has already been booked"})
            }
            if(p_details.booked === false){
                res.json({booked: false}); 
                
                next()
            }
        }
        else{
            res.json({res: "incorrect",msg: "Incorrect payment ID"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    stripe_payment: stripe_payment,
    already_paid: already_paid,
    paypal_payment: paypal_payment,
    paypal_verification_success: paypal_verification_success,
    paypal_verification_cancel: paypal_verification_cancel
}
