const fs = require("fs");
const jwt = require("jsonwebtoken");
const excel = require("exceljs");


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
};
//Update user:
const updateUserByAdmin = async (req,res)=>{
        try {
           const {id} = req.params;
           const isUserExist = await User.findById(id);
           if(!isUserExist){
               return res.status(404).json({
                   ok: true,
                   message: "user is not found"
               });
           };
           // isAdmin or not:
          await User.findByIdAndDelete(id)
               
           res.status(200).json({
               ok: true,
               message: "User is successfully deleted"
           })
        } catch (error) {
           res.status(500).json({
               message:error.message
           })
        }
       }
//delete user user by admin:
const deleteUserByAdmin = async (req,res)=>{
 try {
    const {id} = req.params;
    const isUserExist = await User.findById(id);
    if(!isUserExist){
        return res.status(404).json({
            ok: true,
            message: "user is not found"
        });
    };
    // isAdmin or not:
   await User.findByIdAndDelete(id)
        
    res.status(200).json({
        ok: true,
        message: "User is successfully deleted"
    })
 } catch (error) {
    res.status(500).json({
        message:error.message
    })
 }
}
//data exported to excel:
const usersExportedByAdmin = async(req,res)=>{
    try {
    const workBook =   new excel.Workbook();
    const worksheet = workbook.addWorksheet("Users");

worksheet.columns = [
  { header: "Id", key: "id", width: 5 },
  { header: "Title", key: "title", width: 25 },
  { header: "Description", key: "description", width: 25 },
  { header: "Published", key: "published", width: 10 },
];

// Add Array Rows
worksheet.addRows(users);

// res is a Stream object
res.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
res.setHeader(
  "Content-Disposition",
  "attachment; filename=" + "tutorials.xlsx"

);
res.status(200).json({
    ok: true,
    message: "User is successfully deleted"
})
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = 
{
 loginAdmin,
 logoutAdmin,
 getUsersNotAdmin,
 updateUserByAdmin,
 deleteUserByAdmin,
 usersExportedByAdmin
}