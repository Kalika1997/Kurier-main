import jwt from "jsonwebtoken";

// we will generate token then save it to cookie at the same time (when user sign-up)
const generateTokenAndSetCookie = (userId, res) => {
    // we will sign userId (payload) with our secret that is in env
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",  
	});
    // token created (signed from our secret) , now setting it to cookie
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // milli second  (-> 15 days)
		httpOnly: true, // to prevent XSS attacks cross-site scripting attacks(javascript)
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",

	});
};

export default generateTokenAndSetCookie;