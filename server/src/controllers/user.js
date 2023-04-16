const jwt = require("jsonwebtoken");

const securePassword = require("../helpers/bcryptPassword");

const registerUser = async(req,res)=>{
    try {
        const {name,email,password,phone}=req.fields;
        const {image} =req.files;
       

        if (!name || !email || !password || !phone){
            return  res.status(404).json({
                message : "name,email,phone,password missing"
             })
                
        };
        if (password.length<6){
            return  res.status(404).json({
                message : "minimum length shold be 6 for password"
             })
                
        };
        if (image && image.size>1000000){
            return  res.status(400).json({
                message : "image size should be more than 1mb"
             })
                
        }

        const isExist = await User.findOne({email: email})
        if(isExist){
            return  res.status(400).json({
                message : "user with this email already exist"
             })
                
        }
       const hashedPassword = await securePassword(password);
       //store data
       const token = jwt.sign({name,email,phone,hashedPassword,image }, dev.app.jwtSecretKey);

       res.status(201).json({
       token : token
     });
        
    } catch (error) {
        res.status(500).json({
            message : error.message,
         });
            
    };
};




module.exports = {registerUser}