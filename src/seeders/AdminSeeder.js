import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/User.js";
dotenv.config();

export const AdminSeeder = async () => {
  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const admin = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    admin.save();
  }
};
