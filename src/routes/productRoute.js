import multer from "multer";
import express from "express";
import { uploadProductImages } from "../middlewares/ProductImagesMiddleware.js";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/productController.js";
import { adminMiddleware } from "../middlewares/AdminMiddleware.js";
import { validateStore } from "../validations/productValidation.js";

const router = express.Router();

router.post("/", uploadProductImages, adminMiddleware, validateStore, store);
router.get("/", index);
router.get("/:id", show);
router.put("/:id", uploadProductImages, adminMiddleware, validateStore, update);
router.delete("/:id", adminMiddleware, destroy);
export default router;
