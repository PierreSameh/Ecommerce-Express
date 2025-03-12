import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import {
  validateRegister,
  validateLogin,
} from "../validations/userValidation.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
