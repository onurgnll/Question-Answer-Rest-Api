
const sendJWTToClient = (user,res) => {
    
    const token = user.generateJWT();

    const {JWT_COOKIE,NODE_ENV} = process.env
    return res.status(200)
        .cookie("access_token", token ,{
            httpOnly : true,
            expire: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),  
            secure: NODE_ENV == "DEV" ? false : true
        })
        .json({
            success: true,
            access_token : token,
            data: {
                name: user.name,
                email: user.email
            }
        })
}

module.exports = sendJWTToClient;