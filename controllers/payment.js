const mongoose = require("mongoose") ; 
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Subscribers = require("../models/subscribers.js") ; 
const datecheck = require("../datecheck.js") ; 

const orders = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY,
            key_secret: process.env.SECRET,
        });

        const options = {
            amount: req.body.amount * 100,  //req.body.amount = 100 //amount in lowest possible currency value 
            currency: "INR",
            // receipt: `${crypto.randomBytes(10).toString("hex")} + ${req.user.id}.slice(5)`,
            receipt: crypto.randomBytes(10).toString("hex")
        };

        //order is being created here... 
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            // res.status(200).json({ data: order });
            //this is order ///
            // {
            //     "data": {
            //       "id": "order_LqG2bLFnfgvPCm",
            //       "entity": "order",
            //       "amount": 10000,
            //       "amount_paid": 0,
            //       "amount_due": 10000,
            //       "currency": "INR",
            //       "receipt": "3a52c9c38cc75db48420",
            //       "offer_id": null,
            //       "status": "created",
            //       "attempts": 0,
            //       "notes": [],
            //       "created_at": 1684223396
            //     }
            //   }
            res.status(200).json({ orderId: order.id });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}


const verify = async (req, res) => {

    const userid = req.user.id ; 
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.SECRET)
        .update(body.toString())
        .digest('hex');
    console.log("sign received ", req.body.response.razorpay_signature);
    console.log("sign generated ", expectedSignature);
    let response ; 
     
    if (expectedSignature === req.body.response.razorpay_signature){
        await Subscribers.create({ userid , orderid : req.body.response.razorpay_order_id , paymentid : req.body.response.razorpay_payment_id  });
        response = { "signatureIsValid": "true" }
    }

    else{
        response = { "signatureIsValid": "false" }
    }
        
    res.send(response);
}


const validity = async (req , res) => {

    try {

    let userid = req.user.id ; 
    let details = await Subscribers.findOne({userid}) ; 
    // console.log(details.datefrom) ;
    // console.log(details.dateto) ; 
    const present = new Date() ; 
    // console.log(present) ; 
    

    res.json({"Valid" :  (datecheck(details.fromdate , details.tilldate , present))}) ;
        
    } catch (error) {
        console.log(error) ; 
        res.json({"status" : "failure"}); 
        
    }

}


module.exports = { orders , verify , validity} ; 