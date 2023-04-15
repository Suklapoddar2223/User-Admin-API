//creating server:
const express = require("express");
const morgan = require("morgan");

const dev = require("./config");
const connectDatabase = require("./config/db");

const app = express();

const PORT = dev.app.serverPort;

app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.status(200).send("<h2>API is running</h2>")
})

app.listen(PORT, async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectDatabase();
});