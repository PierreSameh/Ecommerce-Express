import { validationResult } from "express-validator";
import { createProduct } from "../services/ProductService.js";
export const store = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array()[0].msg });
    }
    const response = await createProduct(req);
    res.status(201).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
};
