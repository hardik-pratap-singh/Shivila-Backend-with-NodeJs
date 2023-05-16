const mongoose = require("mongoose");
const afterSixMonths = require("../aftersixmonths.js")
const currentdate = () => {
    
    let date = new Date().toISOString().split("T")[0] ; 
    return date; 
}
// Use the sixMonthsLater date in your code as needed
// console.log(sixMonthsLater);

const subscriberSchema = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'users',
    },
    orderid : {
        type : String,
        require : true 
    },
    paymentid : {
        type : String, 
        require : true 
    },
    fromdate : {
        type : Date , 
        default : currentdate()
    },
    tilldate : {
        type : Date , 
        default : afterSixMonths() 
    }
})

const Subscribers = mongoose.model('subscribers', subscriberSchema);

module.exports = Subscribers ; 

