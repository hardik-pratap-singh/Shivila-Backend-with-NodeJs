const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');

const {signup , login , getuser} = require("../controllers/auth.js");
const fetchuser  = require("../middlewares/fetchuser.js") ; 

//Registration API 
router.post("/signup", [
    body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('mobile' , 'Enter a valid mobile number').isLength({ min : 10 , max  : 10 }),
    body('password', 'Enter a valid password').isLength({ min: 2 }),
] , signup );

//Login API 
router.post("/login" , [    
    body('password', 'Enter a valid password').isLength({ min: 2 }) , 
] , login); 


router.get("/getuser" , fetchuser , getuser ); 


module.exports = router; 