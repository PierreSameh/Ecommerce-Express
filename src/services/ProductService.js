import { Product } from "../models/Product.js";
import dotenv from "dotenv";
import { deleteMultipleFiles } from "../traits/DeleteMulterUploads.js";
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

export const getAllProducts = async () => {
  try {
    let products = await Product.find();
    products = products.map((product) => {
      return {
        ...product.toObject(),
        images: product.images.map((image) => {
          return `${process.env.APP_URL}${process.env.APP_PORT}${image}`;
        }),
      };
    });
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    let product = await Product.findById(id);
    if (!product) {
      let error = new Error("Product Not Found");
      error.statusCode = 404;
      throw error;
    }
    product.images = product.images.map((image) => {
      return `${process.env.APP_URL}${process.env.APP_PORT}${image}`;
    });
    return product;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (req, id) => {
  try {
    let product = await Product.findById(id);
    if (!product) {
      let error = new Error("Product Not Found");
      error.statusCode = 404;
      throw error;
    }
    if (product.images.length > 0) {
      deleteMultipleFiles(product.images);
    }

    const { title, description, price, stock } = req.body;
    const imagesPaths = req.files.map(
      (file) => `/uploads/products/${file.filename}`
    );

    product.set({
      title,
      description,
      images: imagesPaths,
      price,
      stock,
    });
    await product.save();
    return {
      message: "Product Updated Successfully",
      data: {
        product: product,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      let error = new Error("Product Not Found");
      error.statusCode = 404;
      throw error;
    }
    if (product.images.length > 0) {
      deleteMultipleFiles(product.images);
    }

    await product.deleteOne();
    return { message: "Product Deleted Successfully" };
  } catch (error) {
    throw error;
  }
};
