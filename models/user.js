const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        requied: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        requied: true
    },
    
    email: {
        type: String,
        requied: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        requied: true,
        select : false
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    about : {
        type:String
    },
    website : {
        type: String 
    },
    place : {
        type: String
    },
    profile_image : {
        type : String,
        default : "default.jpg"
    },
    blocked : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now

    }
});



module.exports = mongoose.model("User",User);