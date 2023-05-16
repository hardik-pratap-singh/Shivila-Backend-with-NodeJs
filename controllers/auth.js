const User = require("../models/auth.js")
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hardikps";
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs");


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodemailer5901@gmail.com',
        pass: 'anuaatoyxexjnxln'
    }
});



const signup = async (req, res) => {

    const { name, email, mobile, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(500).json({ error: "Email Already Taken ! " });
        }

        let userwithmobile = await User.findOne({mobile : mobile})
        if(userwithmobile){
            return res.status(500).json({ error: "Mobile Number Already Registered ! " });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        user = await User.create({ name, email, mobile, password: secPass })


        var mailOptions = {
            from: 'nodemailer5901@gmail.com',
            to: email,
            subject: 'Shivila|SignUp|Confirm',
            text: `Hey ${name} ! Welcome To Shivila. Your Credentials are as follows :- <br>Email : ${email}<br>Password : ${password}<br>Mobile : ${mobile} `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                // console.log(error);
                res.json({ "success": false })
            } else {
                res.json({ "sucess": false, "msg": "Email Sent" })
                // do something useful
            }
        });
        return res.status(200).json({ "success": true });
    }

    catch (err) {
        res.json({ error: "Internal Server Error .. " })
    }
}

const login = async (req, res) => {

    const { email, password, mobile } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: email });
        let userwithmobile = await User.findOne({ mobile : mobile });
        if (user || userwithmobile) {
            let passwordCompare ; 
            if(user) passwordCompare = bcrypt.compare(password, user.password);
            else  passwordCompare = bcrypt.compare(password, userwithmobile.password);
            
            // let pass = user.password ; 
            if (!passwordCompare) {
                return res.status(401).json({ "success": false, "issue": "password" });
            }


            else {
                let data ; 

                if(user){
                     data = {
                        user: {
                            id: user.id
                        }
                    }

                }

                else {
                    data = {
                        user: {
                            id: userwithmobile.id
                        }
                    }

                }
                
                const authToken = jwt.sign(data, JWT_SECRET);
                // console.log(data);
                // console.log(authToken); 
                return res.status(200).json({ "success": true, authToken });
            }
        }


        else {
            return res.status(401).json({ "success": false, "issue": "User Not registered" });
        }



    }

    catch (err) {
        console.log(err); 
        res.status(400).json({ error: "Internal Server Error .. " })
    }


}


const getuser = async (req, res) => {

    try {
        let userid = req.user.id;
        let data = await User.findById(userid).select('-password');
        res.status(200).json(data);
        // res.send("got it "); 

    } catch (err) {
        res.json({ "error": "getuser catch block" });
    }

}



module.exports = { signup, login, getuser }; 