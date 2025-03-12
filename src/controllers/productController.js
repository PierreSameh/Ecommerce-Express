import { validationResult } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/ProductService.js";
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

export const index = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProductById(id);
    res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array()[0].msg });
    }
    const { id } = req.params;
    const response = await updateProduct(req, id);
    res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteProduct(id);
    res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json(error.message);
  }
};
