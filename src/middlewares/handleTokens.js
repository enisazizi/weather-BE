const handleTokens = async (req, res, next) => {
	try {
		const { token, refreshToken } = req.user.tokens;
		res.cookie("token", token, { httpOnly: true });
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			path: "/api/users/refreshToken",
		});
		res.redirect(process.env.REDIRECT_URL);
	} catch (error) {
		console.log("Handle tokens error", error);
		next(error);
	}
};

module.exports = handleTokens;
