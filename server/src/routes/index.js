const formidable = require("express-formidable")
const router = require("express").Router();

const { registerUser } = require("../controllers/user");


router.post("/register" ,formidable(), registerUser);


module.exports= router