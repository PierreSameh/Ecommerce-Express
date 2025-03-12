import { body } from "express-validator";

export const validateStore = [
  body("title").notEmpty().withMessage("Title is Required"),
  //   body("images").().withMessage("Image is Required"),
  body("price").notEmpty().withMessage("Price is Required"),
  body("stock").notEmpty().withMessage("Stock is Required"),
];
