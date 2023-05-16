const jwt = require("jsonwebtoken")
const JWT_SECRET = "hardikps"
const express = require("express")



const fetchuser = (req , res , next) => {

    const token = req.header('token') ;
    if(!token){
        return res.status(401).json({"error" : "unauthorized"});
    }

    try {
        const data = jwt.verify(token , JWT_SECRET );
        req.user = data.user ; 

        //req.user.id will give you the id of the loggedIn user 
        // res.json({"success" : true }) ; 
        // console.log("reached here"); //ye infinite baar kyu chal rha hai 
        next();
        
    } catch (err) {
        return res.status(401).json({"error" : "unauthorized"});
        
    }
}

module.exports = fetchuser ; 