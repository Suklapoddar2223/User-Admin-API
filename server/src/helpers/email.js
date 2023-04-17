const nodemailer = require("nodemailer");

const dev = require("../config");

exports.sendEmailWithNodemailer = async(emailData)=>{
   
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,//true for 465,false for other ports
            auth: {
                user: dev.app.smtpUserName,
                pass: dev.app.smtpUserPassword,
            },
        });

        const mailOptions = {
            from: dev.app.smtpUserName,//sender address
            to: emailData.email,//list of receviers
            subject: emailData.subject, //subject of the email
            html: emailData.html, //html body

        };

        //send mail with defined transport object
        await transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log("----SMTP ERROR1------");
                console.log(error);
              }else{
                console.log("Message sent: %s", info.response);
              }
        });
        
    } catch (error) {
        console.log("-----SMTP ERROR2-----");
        console.log("Problem Sending Email: ", error)
    }
}