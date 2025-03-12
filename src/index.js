import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import { AdminSeeder } from "./seeders/AdminSeeder.js";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("DB Connected"))
  .catch((err) => {
    console.log("DB Failed to Connect!" + err);
  });

//Admin Seeder
AdminSeeder();

// Routes
app.use("/api/auth", userRoute);
app.use("/api/products", productRoute);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
