import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const registerUser = async (req, res) => {
	// res.status(200).json({msg: 'USER CREATED!'})
	const { username, email, password } = req.body;

	try {
		// if email already exists, send an error
		const isRegistered = await User.findOne({ email: email });
		if (isRegistered) {
			return res.status(400).send("Email already exists")
		}

		// Hashing passwords
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = new User({
			username: username,
			email: email,
			password: hashedPassword,
		})

		await newUser.save()

		// sign the token
		const token = jwt.sign({
			user: newUser._id,
		}, process.env.JWT_SECRET);

		// send the token in a HTTP-only cookie
		res.cookie("token", token, {
			// httpOnly: true,
		})
		.send();

		// console.log(token)

	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}