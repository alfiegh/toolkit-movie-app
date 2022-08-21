import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ errorMessage: "Not AUTHORIZED! Please login or sign up." })
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(verified)
		req.user = verified.user

		next();
	} catch (err) {
		console.log(err)
		res.status(401).json({ errorMessage: "Not AUTHORIZED! Please login or sign up."})
	}
}

export default auth;