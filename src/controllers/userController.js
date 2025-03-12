import { register } from "../services/UserService.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array()[0].msg });
    }
    const response = await register(firstName, lastName, email, password);
    res.status(201).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
};
