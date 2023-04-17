const formidable = require("express-formidable")
const router = require("express").Router();

const { registerUser, verifyEmail, loginuUser, logoutuUser, userProfile } = require("../controllers/user");


router.post("/register" ,formidable(), registerUser);
router.post("/verify-email" , verifyEmail);
router.post("/login" , loginuUser);
router.get("/logout" , logoutuUser);
router.get("/profile" , userProfile);





module.exports= router;