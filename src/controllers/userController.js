import { register } from "../services/UserService.js";

export const registerUser = async (req, res) => {
  try {
    const response = await register(req, res);
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};
