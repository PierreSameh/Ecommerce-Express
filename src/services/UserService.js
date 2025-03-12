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
        token: token,
        user: user,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Incorrect Email or Password");
      error.statusCode = 400;
      throw error;
    }
    const comparePassword = bcrypt.compare(password, user.password);
    if (!comparePassword) {
      const error = new Error("Incorrect Email or Password");
      error.statusCode = 400;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return {
      message: "User Logged In Successfully",
      data: {
        token: token,
        user: user,
      },
    };
  } catch (error) {
    throw error;
  }
};
