import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
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

// Routes
app.use("/api/auth", userRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
