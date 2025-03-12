import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(console.log("DB Connected"))
  .catch((err) => {
    console.log("DB Failed to Connect!" + err);
  });

// Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
