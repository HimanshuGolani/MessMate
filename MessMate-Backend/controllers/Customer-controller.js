import UserModel from "../models/User-model.js";
import bcrypt from "bcryptjs";

// login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "The credentials are incomplete.",
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).send({
        message: "The credentials are incorrect.",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "The credentials are incorrect.",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Login successful.",
      success: true,
      user: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

// User Registration
export const userRegister = async (req, res) => {
  try {
    const { name, email, password, address, phone_no, role } = req.body;

    if (!name || !email || !password || !address || !phone_no || !role) {
      return res.status(400).send({
        message: "The credentials are incomplete.",
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        message: "User already exists.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone_no,
      role,
    });

    await newUser.save();

    return res.status(201).send({
      message: "User registered successfully.",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};
// to display hapy custoemrs name and their count...

export const displayAllUsers = async (req, res) => {};

// plan related controllers
// getting the current plans he has
export const getCurrentPlans = async (req, res) => {};

// making the current plan
export const setCurrentPlan = async (req, res) => {};

// previous palns list
export const getPreviousPlans = async (req, res) => {};
