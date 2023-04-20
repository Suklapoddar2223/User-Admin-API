const User = require("../models/user");

const isAdmin = async(req,res,next)=>{
    try {
        if( req.session.userId){
            const id = req.session.userId;
            const userIsAdmin = await User.findById(id);
            if(userIsAdmin.is_admin===1){
                next()
            }else{
                return res.status(401).json({
                    message: "User is not an Admin"
                });
           
        }}
        else{
            return res.status(400).json({
                message: "Please log-in"
            })
        }
    } catch (error) {
        console.log(error)
    }
    };

    module.exports = {isAdmin}