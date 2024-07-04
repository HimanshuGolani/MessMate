import UserModel from "../models/User-model.js";
import CustomerModel from "../models/Customer-model.js";
import plansModel from "../models/plans-model.js";
import bcrypt from "bcryptjs";
import vendorModel from "../models/vendor-model.js";
import jwt from 'jsonwebtoken';


// to display hapy custoemrs name and their count...
export const displayCustomersCount = async (req, res) => {
  try {
    const numberodUsers = await CustomerModel.count();
    return res.status().send({
      noOfUsers: numberodUsers,
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

// funciton where the customer can buy the plans
export const prchasePlan = async (req, res) => {
  try {
    const { planId, customerId } = req.body;
    // checking the inputs are non-empty
    if (!planId || !customerId) {
      return res.status().send();
    }

    // if the fields exists then exists then find the plan and custome

    const user = await CustomerModel.findById(customerId);
    const choosenPlan = await plansModel.findById(planId);

    // if any one of the user or the plan is not found
    if (!user || !choosenPlan) {
      return res.status().send();
    }

    // if the user and plan is available then

    // check if the user have any current plan on going ?
    if (user.Current_Plan) {
      return res.status().send({
        message: "You have a plan on going, you cannot buy another.",
      });
    } else {
      // add the plan id to the userId
      user.Current_Plan = planId;
      // add the user to the vendor
      const { offeredBy } = choosenPlan;
      const vendor = await vendorModel.findById(offeredBy);
      // if the vendor is not found
      if (!vendor) {
        return res.status().send({
          message: "Vendor not found",
        });
      }
      // add the customer ot the venodr
      vendor.ListOfCustomers.push(customerId);

      return res.status().send({
        message: "The plan is added succesfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

// getting the current plan details customer has
export const getCurrentPlan = async (req, res) => {
  try {
    // getting the id form the params
    const { userId } = req.params;
    // checking the id
    if (!userId) {
      return res.status().send({
        message: "Id not recieved",
      });
    }
    // if the id is non-empty
    // fetch the user from the db
    const currentUser = CustomerModel.findById(userId);
    // checking if the user exists or not
    if (!currentUser) {
      return res.status().send({
        message: "User not found",
      });
    }
    // currentUser.Current_Plan;
    return res.status().send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

// previous palns list
export const getPreviousPlans = async (req, res) => {
  try {
    // getting the id form the params
    const { userId } = req.params;
    // checking the id
    if (!userId) {
      return res.status().send({
        message: "Id not recieved",
      });
    }
    // if the id is non-empty
    // fetch the user from the db
    const currentUser = CustomerModel.findById(userId);
    // checking if the user exists or not
    if (!currentUser) {
      return res.status().send({
        message: "User not found",
      });
    }
    // return the properties res need
    // currentUser.;
    return res.status().send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};
