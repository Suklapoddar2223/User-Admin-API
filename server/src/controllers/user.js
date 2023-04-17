const fs = require("fs");
const jwt = require("jsonwebtoken");

const {securePassword} = require("../helpers/bcryptPassword");
const User = require("../models/user");
const dev = require("../config");
const { sendEmailWithNodemailer } = require("../helpers/email");
const { comparePassword } = require("../helpers/bcryptPassword");

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
       const token = jwt.sign({name,email,phone,hashedPassword,image }, 
        dev.app.jwtSecretKey,{expiresIn : "10m"});

        //prepare the email
        const emailData = {
            email,
            subject: "Account Activation Email",
            html:`
            <h2>Hello ${name}!</h2>
            <p>Please click here to <a href="${dev.app.clientURL}/api/user/activate/
            ${token}" target="_blank"activate your account></a></p>
        `,//html body
    };

    sendEmailWithNodemailer(emailData)

        //verification email to the user
       res.status(200).json({
        message: 'A verification link has been sent to your email',
       token : token,
     });
        


    } catch (error) {
        res.status(500).json({
            message : error.message,
         });
            
    };
};
//Email Verfication:
const verifyEmail = (req,res)=>{
    try {
        const {token} = req.body;
        if(!token){
           return res.status(404).json({
                messasge: "token is not available"
            });
        };

        jwt.verify(token,  dev.app.jwtSecretKey, async function(err, decoded) {
           if(err){
           return  res.status(401).json({
                messasge: "Token is expired"
            });
           }
           const {name, email, hashedPassword,phone,image}= decoded;
           const isExist = await User.findOne({email: email})
        if(isExist){
            return  res.status(400).json({
                message : "user with this email already exist"
             })
                
             }

             //create the user without image:
             const newUser = new User({
                name: name,
                email: email,
                phone: phone,
                password: hashedPassword,
                is_verfied: 1,
             })
             // if there is image add to above user:
             if(image){
                newUser.image.data = fs.readFileSync(image.path);
                newUser.image.contentType = image.type;
             }

             //save user:
             const user = await newUser.save()
             if(!user){
               return res.status(400).json({
                    messasge: "user is not created"
                });
             }
             res.status(201).json({
                user,
                messasge: "User is created.Continue to sign in"
            })
          });

        res.status(200).json({
            messasge: "email is verified"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

//login user:
        const loginuUser =async(req,res)=>{
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
                const isPasswordMatched = await comparePassword(password, user.password);

                if(!isPasswordMatched){
                    return  res.status(400).json({
                       message : "email or password did not match"
                     });
                 
                    }



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
        const logoutuUser =(req,res)=>{
            try {
                res.status(200).json({
                    message: "successfully logged-out"
                })
            } catch (error) {
                res.status(500).json({
                    message:error.message
                })
            }
        }

        //User Profile:
        const userProfile =(req,res)=>{
            const {name, email, phone,password,image} = req.body;
            try {
                res.status(200).json({
                    message: "User's Profile returned"
                })
            } catch (error) {
                res.status(500).json({
                    message:error.message
                })
            }
        }


module.exports = {registerUser,verifyEmail,loginuUser,logoutuUser,userProfile}