const fs = require("fs");
const jwt = require("jsonwebtoken");

const {securePassword} = require("../helpers/bcryptPassword");
const User = require("../models/user");
const dev = require("../config");
const { sendEmailWithNodemailer } = require("../helpers/email");
const { comparePassword } = require("../helpers/bcryptPassword");




//login user:
const loginAdmin =async(req,res)=>{
    try {
    const {email,password} = req.body;
    if ( !email || !password ){
        return  res.status(404).json({
            message : "email or password missing"
            })
            
    };
    if (password.length <6){
        return  res.status(404).json({
            message : "minimum length should be 6 for password"
            })
            
    };
    const user = await User.findOne({email: email})
        if(!user){
        return  res.status(400).json({
            message : "user with this email does not exist"
        });
    
        }
    // verify isAdmin or not:
    if(user.is_admin===0){
        return  res.status(400).json({
            message : "user is not an admin"
        });
    }
    const isPasswordMatched = await comparePassword(password, user.password);

    if(!isPasswordMatched){
        return  res.status(400).json({
            message : "email or password did not match"
            });
        
        }
// create session:
        req.session.userId = user._id;


    res.status(200).json({
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            image:user.image,
        },
        message: "successfully logged-in"
    })
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}

//logout user:
const logoutAdmin =(req,res)=>{
    try {
        req.session.destroy(); //to destroy the session logging out
        res.clearCookie("admin_name"); // to clear cookies after logging out,"admin_name" is cookies name.
        res.status(200).json({
            ok: true,
            message: "successfully logged-out"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message:error.message
        })
    }
}
//get all users except admin:
const getUsersNotAdmin = async(req,res)=>{
    try {
        const users = await User.find({is_admin : 0})
        res.status(200).json({
            ok: true,
            message: "return users",
            users: users,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message:error.message
        })
    }
}



module.exports = 
{
 loginAdmin,
 logoutAdmin,
 getUsersNotAdmin
}