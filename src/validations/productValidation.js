import { body } from "express-validator";

export const validateStore = [
  body("title").notEmpty().withMessage("Title is Required"),
  body("price").notEmpty().withMessage("Price is Required"),
  body("stock").notEmpty().withMessage("Stock is Required"),

  body("images").custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error("At least one image is required");
    }
    return true;
  }),
];
