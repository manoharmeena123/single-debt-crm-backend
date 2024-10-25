import { Request, Response } from "express";
import dotenv from 'dotenv';
import User from "@/models/userModel"; // Mongoose User model
import { validateUser } from "@/validation/userValidator"; // Joi validation
import jwt from "jsonwebtoken";
import { ROLES } from "@/constant/roles"; // Assuming you've added roles constants
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = validateUser(req.body);
  if (error) {
    // 400 Bad Request - Validation error
    res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
    return; // Exit the function after sending the response
  }

  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      // 409 Conflict - User already exists
      res.status(409).json({
        status: 409,
        message: "User with this email already exists",
      });
      return;
    }

    // Create a new user
    user = new User({ name, email, password, role });
    await user.save();

    // 201 Created - Successfully created user
    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    // 500 Internal Server Error
    res.status(500).json({
      status: 500,
      message: "An error occurred while registering the user",
    });
  }
};

// Login a user and generate JWT
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      // 404 Not Found - User not found
      res.status(404).json({
        status: 404,
        message: "User with this email does not exist",
      });
      return;
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // 401 Unauthorized - Password is incorrect
      res.status(401).json({
        status: 401,
        message: "Invalid password",
      });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // 200 OK - Successfully logged in
    res.status(200).json({
      status: 200,
      message: "Login successful",
      token,
    });
  } catch (err) {
    // 500 Internal Server Error
    res.status(500).json({
      status: 500,
      message: "An error occurred while logging in",
    });
  }
};
