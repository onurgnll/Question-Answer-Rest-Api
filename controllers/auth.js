const User = require("../models/user");

const register = async (req,res,next) => {

    try {
        const {name,email,password,username} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            username
        });


        res.status(200)
            .json({
                success: true
            })
    
    } catch (error) {
        return next(error);
    }




    


}


module.exports = {
    register
}
