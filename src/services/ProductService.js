import { Product } from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config();

export const createProduct = async (req) => {
  try {
    const { title, description, price, stock } = req.body;
    const imagesPaths = req.files.map(
      (file) => `/uploads/products/${file.filename}`
    );
    const product = await Product.create({
      title,
      description,
      images: imagesPaths,
      price,
      stock,
    });
    return product;
  } catch (error) {
    throw error;
  }
};
