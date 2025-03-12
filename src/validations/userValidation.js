import { body } from "express-validator";

//Validate Register
export const validateRegister = [
  body("firstName").notEmpty().withMessage("First Name is Required"),
  body("lastName").notEmpty().withMessage("Last Name is Required"),
  body("email").isEmail().withMessage("Enter a Valid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
