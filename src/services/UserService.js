import { User } from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User Already Exists" });
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create User
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    user.save();
    //Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return {
      message: "User Registered Successfully",
      user: user,
      token: token,
    };
  } catch (error) {
    throw error;
  }
};
