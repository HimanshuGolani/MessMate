import UserModel from "../models/User-model.js";
import CustomerModel from "../models/Customer-model.js";
import plansModel from "../models/plans-model.js";
import bcrypt from "bcryptjs";
import vendorModel from "../models/vendor-model.js";
import jwt from 'jsonwebtoken';


// to display hapy custoemrs name and their count...
export const displayCustomersCount = async (req, res) => {
  try {
    const numberOfUsers = await UserModel.countDocuments();
    const user = await UserModel.find();

    return res.status(200).send({
      noOfUsers: numberOfUsers,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

//Load environment variable from .env file
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY=process.env.SECRET_KEY;

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

    //Generate JWT token
    const token=jwt.sign({id:existingUser,role:existingUser.role},SECRET_KEY,{expiresIn:"1h"});
    
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

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, SECRET_KEY, { expiresIn: "1h" });

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
// Function where the customer can buy the plans
export const purchasePlan = async (req, res) => {
  try {
    const { planId, customerId } = req.body;

    if (!planId || !customerId) {
      return res.status(400).send({
        message: "Plan ID or Customer ID is missing.",
        success: false,
      });
    }

    const user = await UserModel.findById(customerId);
    const chosenPlan = await plansModel.findById(planId);

    console.log("====================================");
    console.log(user, chosenPlan);
    console.log("====================================");

    if (!user || !chosenPlan) {
      return res.status(404).send({
        message: "User or Plan not found.",
        success: false,
      });
    }

    if (user.Current_Plan) {
      return res.status(400).send({
        message: "You already have an ongoing plan.",
        success: false,
      });
    }

    user.Current_Plan = planId;
    const { offeredBy } = chosenPlan;
    const vendor = await VendorModel.findById(offeredBy);

    if (!vendor) {
      return res.status(404).send({
        message: "Vendor not found.",
        success: false,
      });
    }

    vendor.ListOfCustomers.push(customerId);
    await user.save();
    await vendor.save();

    return res.status(200).send({
      message: "The plan is added successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

// Getting the current plan details customer has
// error exists in this fix it.
export const getCurrentPlan = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({
        message: "ID not received.",
        success: false,
      });
    }

    const currentUser = await CustomerModel.findById(userId)
      .populate("Current_Plan.plan")
      .populate("Current_Plan.vendorId");

    if (!currentUser) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
      currentPlan: currentUser.Current_Plan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

// Previous plans list
export const getPreviousPlans = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({
        message: "ID not received.",
        success: false,
      });
    }

    const currentUser = await CustomerModel.findById(userId)
      .populate("PreviousPlans.plan")
      .populate("PreviousPlans.vendorId");

    if (!currentUser) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
      previousPlans: currentUser.PreviousPlans,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};
