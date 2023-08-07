const express = require("express");
const app = express();
const dotenv = require("dotenv");
const allrouters = require("./routers/allrouters");


dotenv.config({ path: './config/env/config.env' });


app.listen(process.env.PORT, ()=> {
    console.log('Server started successfully on port : ' + process.env.PORT);
})

app.use("/api" , allrouters);


