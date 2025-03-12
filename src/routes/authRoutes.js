import express from "express";
import { registerUser } from "../controllers/userController.js";
import { validateRegister } from "../validations/userValidation.js";
const router = express.Router();

router.post("/register", validateRegister, registerUser);

const authRoutes = router;
export default authRoutes;
