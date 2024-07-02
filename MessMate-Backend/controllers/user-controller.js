import UserModel from "../models/User-model.js";
import bcrypt from "bcryptjs";
export const userLogin = async (req, res) => {
  try {
    // Extracting the data from the request body.
    const { email, password } = req.body;

    // Checking that the email and password fields are non-empty.
    if (!email || !password) {
      return res.status(400).send({
        message: "The credentials are incomplete.",
        success: false,
      });
    }

    // Checking if the user exists in the DB.
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).send({
        message: "The credentials are incorrect.",
        success: false,
      });
    }

    // Checking if the password matches.
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

    // If the email and password are correct, log the user in.
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

export const userRegister = async (req, res) => {
  try {
    // Extracting the data from the req.body
    const { name, email, password, address, phone_no } = req.body;

    // Checking if the inputs are non-empty
    if (!name || !email || !password || !address || !phone_no) {
      return res.status(400).send({
        message: "The credentials are incomplete.",
        success: false,
      });
    }

    console.log(name, email, password, address, phone_no);

    // Checking if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        message: "User already exists.",
        success: false,
      });
    }

    // Hashing the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating the new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone_no,
    });

    // Saving the new user in the DB
    await newUser.save();

    // Responding with a success message
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
