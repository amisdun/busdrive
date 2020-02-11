require("dotenv").config({path:__dirname + '/config.env'})
const publish_key = process.env["PUBLISH_KEY"]
const secret_key = process.env["SECRET_KEY"]
const stripe = require("stripe")(secret_key)

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
            if(charge){ res.json({res: "success"}); next()}
            else{res.json({res: "failed", msg: "an error has occured, pls try again"})}
        }
    } catch (error){
        console.log(error)
    }
}

module.exports = stripe_payment
