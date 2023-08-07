const express = require("express");
const app = express();
const dotenv = require("dotenv");
const allrouters = require("./routers/allrouters");
const mongoose = require('mongoose');
const errorhandle = require("./middlewares/errors/errorHandling");

dotenv.config({ path: './config/env/config.env' });

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database connection succeed');
}).catch((err) => {
    console.log(err);
})


app.use("/api" , allrouters);

app.use(errorhandle);
app.listen(process.env.PORT, ()=> {
    console.log('Server started successfully on port : ' + process.env.PORT);
})



