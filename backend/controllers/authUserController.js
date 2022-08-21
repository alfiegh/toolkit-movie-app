import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' });
    }

    const existingUser = await User.findOne({ email });
    // console.log("EXISTING USER", existingUser)
    if (!existingUser) {
      return res
        .status(401)
        .json({
          errorMessage:
            'Wrong credentials, Please check your email or password!',
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({
          errorMessage:
            'Wrong credentials, please check your email or password!',
        });
    }

    // If everything is correct with validation, then sign the token.
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie
    res
      .cookie('token', token, {
        // httpOnly: true,
      })
      .send(existingUser);
    console.log(existingUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: 'An error occured.' });
  }
};

export const logoutUser = (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

export const isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (error) {
    res.json(false);
  }
};
