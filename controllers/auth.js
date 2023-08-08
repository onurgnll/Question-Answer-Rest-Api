const User = require("../models/user");
const sendJWTToClient = require("../helpers/auth/sendjwttocookie");

const register = async (req,res,next) => {

    try {
        const {name,email,password,username} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            username
        });

        sendJWTToClient(user,res);
    
    } catch (error) {
        return next(error);
    }




    


}


module.exports = {
    register
}
