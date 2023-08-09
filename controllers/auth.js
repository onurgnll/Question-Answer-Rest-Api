const User = require("../models/user");
const {sendJWTToClient} = require("../helpers/auth/tokenHelpers");
const CustomError = require("../middlewares/errors/CustomError");
const bcrypt = require("bcrypt");

const register = async (req,res,next) => {

    try {
        const {name,email,password,username} = req.body;
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });

        sendJWTToClient(user,res);
    
    } catch (error) {
        return next(error);
    }
}


const profile = async (req,res,next) => {
    try {
        res.json({
            success: true,
            message: "welcome",
            data: req.user
        })
    } catch (error) {
        next(error);
    }
}

const comparePasses = (password,hashedpass) => {
    return bcrypt.compareSync(password,hashedpass);
}

const login = async (req,res,next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if(!(email && password)){
            return next(new CustomError("please both input email and password",400))
        }
        
        const user = await User.findOne({email}).select("+password");
        
        if(!comparePasses(password, user.password)){
            return next(new CustomError("cant access password is wrong", 401))
        }


        sendJWTToClient(user,res);

    } catch (error) {
        next(error);
    }
}


const logout = async (req,res,next) => {
    const {JWT_COOKIE_EXPIRE,NODE_ENV} = process.env;
    
    // Send To Client With Res
    
    return res
    .status(200)
    .cookie("token",null, {
        httpOnly : true,
        expires : new Date(Date.now()),
        secure : NODE_ENV === "development" ? false : true
    })
    .json({
        success : true,
        message : "Logout Successfull"
    });
}
module.exports = {
    register,
    profile,
    login,
    logout
}
