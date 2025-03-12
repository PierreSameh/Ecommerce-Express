import multer from "multer";
import express from "express";
import { uploadProductImages } from "../middlewares/ProductImagesMiddleware.js";
import { store } from "../controllers/productController.js";
import { adminMiddleware } from "../middlewares/AdminMiddleware.js";
import { validateStore } from "../validations/productValidation.js";

const router = express.Router();

router.post("/", uploadProductImages, adminMiddleware, validateStore, store);

export default router;
