const router = require("express").Router();
const fetchuser = require("../middlewares/fetchuser.js")
const { orders , verify , validity } = require("../controllers/payment.js") ; 



router.post("/orders", fetchuser , orders)
router.post("/verify", fetchuser ,  verify)
router.post("/validity" , fetchuser , validity)


module.exports = router;