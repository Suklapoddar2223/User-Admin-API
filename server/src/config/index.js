//configurtaion:
require("dotenv").config()

console.log(process.env.SERVER_PORT)

const dev = {
    app : {
        serverPort : process.env.SERVER_PORT || 3001,
        jwtSecretKey: process.env.JWT_SECRET_KEY || "jdhuiydyyhebhebceuygfueyguy",
        smtpUserName:process.env.SMTP_USERNAME,
        smtpUserPassword:process.env.SMTP_PASSWORD,
        clientUrl: process.env.CLIENT_URL,
        sessionSecretKey: process.env.SESSION_SECRET_KEY
    },
    db : {
        url : process.env.MONGO_URL || "mongodb://127.0.0.1:27017/user-admin-db",
    }
}

module.exports = dev;