import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (firstName, lastName, email, password) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      const error = new Error("User Already Exists");
      error.statusCode = 400;
      throw error;
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
      data: {
        user: user,
        token: token,
      },
    };
  } catch (error) {
    throw error;
  }
};
