const User = require("../models/user");

const register = async (req,res,next) => {

    const {name,email,password,username} = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password,
            username
        });
    } catch (error) {
        next(error);
    }


    console.log(user);




    res.status(200)
        .json({
            success: true
        })

    


}


module.exports = {
    register
}
