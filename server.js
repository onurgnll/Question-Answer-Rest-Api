const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: './config/env/config.env' });


app.listen(process.env.PORT, ()=> {
    console.log('Server started successfully on port : ' + process.dotenv.PORT);
})

app.get("/api" , (req,res,next) =>{
    res.send("selam");
})
