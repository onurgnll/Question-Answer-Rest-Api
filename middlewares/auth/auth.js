const jwt = require("jsonwebtoken");
const CustomError = require("../errors/CustomError");
const {isTokenIncluded , getAccessTokenfromHeader} = require("../../helpers/auth/tokenHelpers");

const getAccessToRoute = async (req,res,next) => {
    
    const {JWT_SECRET_KEY} = process.env;

    if(!isTokenIncluded(req)){
        return next(new CustomError("you are not authorized" , 401));
    }

    const access_token = getAccessTokenfromHeader(req);

    jwt.verify(access_token,JWT_SECRET_KEY,(err,decoded) => {
        if (err){
            return next(new CustomError("you are not au121thorized" , 401))
        }

        req.user = {
            id: decoded.id,
            name: decoded.name
        }
        console.log(decoded);
        next();
    })



}

module.exports = {
    getAccessToRoute
}