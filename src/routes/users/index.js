const userRoute = require("express").Router();
const passport = require("passport");
const handleTokens = require("../../middlewares/handleTokens");
const { validateToken } = require("../../middlewares/auth");
const {
	getMeProfile,
	refreshTokenHandler,
	logout,
    loginUser,
    registerUser
} = require("../../controllers/userController");


userRoute.post("/register",registerUser)

userRoute.post("/login",loginUser)

userRoute.get("/me", validateToken, getMeProfile);

userRoute.get("/refreshToken", refreshTokenHandler);

userRoute.get("/logout", validateToken, logout);
//GOOGLE
userRoute.get(
	"/googleLogin",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoute.get("/googleRedirect", passport.authenticate("google"), handleTokens);



module.exports = userRoute;
