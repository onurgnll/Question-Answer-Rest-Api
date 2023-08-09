const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


User.methods.generateJWT = function() {
    const {JWT_SECRET_KEY , JWT_EXPIRE_TIME} = process.env;
    const payload = {
        id : this._id,
        name: this.name
    };
    console.log(this._id +  "    "+this.name);
    const token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn : JWT_EXPIRE_TIME
    })
    return token;



}




User.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash
            next();
        });
    });
    

  });


module.exports = mongoose.model("User",User)