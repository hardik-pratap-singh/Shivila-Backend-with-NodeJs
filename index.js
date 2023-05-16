require("dotenv").config() 
const express = require("express")
const app = express()
const db = require('./db')
db();
const cors = require("cors") ; 
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const authRouter = require("./routers/auth.js")
app.use("/auth" , authRouter);
const newrouter = require("./routers/payment.js")
app.use("/payment" , newrouter); 

const PORT = process.env.PORT || 5000  ;

app.get("/" , (req , res) => {
    res.sendFile("standard.html" , {root : __dirname}) ; 
})


app.listen(PORT , () => {
    console.log("server running on PORT 5000");
})

