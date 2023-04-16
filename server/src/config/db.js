const mongoose = require("mongoose");
const dev = require(".")
const connectDatabase = async ()=>{
    try {
        await mongoose.connect(dev.db.url);
        console.log("Database is Connected");
        
    } catch (error) {
        console.log("Database is not Connected");
        console.log(error);
   }

};
module.exports = connectDatabase;