const ApiError = require("../classes/ApiError")
const UserModel = require("../models/userModel")

const {handleRefreshToken,generateTokens} = require("../utils/jwt")

exports.registerUser = async(req,res,next)=>{
    try{
        const newUser = new UserModel(req.body)
        const {_id} = await newUser.save()
        res.status(201).send(_id)
    }catch(error){
        console.log(error)
        next(error)
    }
}
exports.loginUser = async(req,res,next)=>{
    try{
        const {email,password}= req.body 
        const user = await UserModel.findByCredentials(email,password)
        console.log("user",user)
        const tokens = await  generateTokens(user)
        res.send(tokens)
    }catch(error){
        console.log(error)
        next(error)
    }
}

exports.getMeProfile = async(req,res,next)=>{
    try {
        res.status(201).json({data:req.user})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.refreshTokenHandler = async(req,res,next)=>{
    try {
        const oldRefreshToken = req.cookies.refreshTokenHandler 
        if(!oldRefreshToken)
        throw new ApiError(400,"refresh token missing")
        const newRefreshToken = await handleRefreshToken(oldRefreshToken)
        res.cookies("token",newTokens.token)
        res.cookies("refreshToken", newTokens.refreshToken);
		res.send("OK");
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.logout = async (req, res, next) => {
	try {
		req.user.refreshTokens = [];
		await req.user.save();
		res.clearCookie("token");
		res.clearCookie("refreshToken");
		// res.redirect(process.env.REDIRECT_LOGIN_URL);
		res.send("OK");
	} catch (error) {
		console.log("logout error: ", error);
		next(error);
	}
};
