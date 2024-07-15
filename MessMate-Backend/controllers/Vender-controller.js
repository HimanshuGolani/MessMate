import bcrypt from "bcryptjs";
import UserModel from "../models/User-model.js";
import VendorModel from "../models/vendor-model.js";
import PlanModel from "../models/plans-model.js";
import "dotenv/config";

// vender login
export const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const existingUser = await UserModel.findOne({ email });

    console.log("====================================");
    console.log(existingUser);
    console.log("====================================");

    const { _id } = existingUser;

    const user = await VendorModel.findOne({ userID: _id });

    console.log("====================================");
    console.log(user._id);
    console.log("====================================");

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password Incorrect" });
    }

    // if (existingUser.role !== "Vendor") {
    //   return res.status(403).json({ message: "Access Denied" });
    // }

    return res.status(200).send({
      message: "Login successful.",
      success: true,
      user: existingUser,
      vendorId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

// vender signup
export const vendorRegister = async (req, res) => {
  const {
    name,
    email,
    password,
    imageOfMess,
    address,
    phone_no,
    businessName,
    Gst_No,
  } = req.body;

  console.log(
    name,
    email,
    password,
    imageOfMess,
    address,
    phone_no,
    businessName,
    Gst_No
  );

  if (
    !name ||
    !email ||
    !password ||
    !address ||
    !phone_no ||
    !businessName ||
    !Gst_No
  ) {
    return res.status(400).send({
      message: "The credentials are incomplete.",
      success: false,
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.log(existingUser);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone_no,
      role: "Vendor",
    });

    await newUser.save();

    const newVendor = await VendorModel.create({
      userID: newUser._id,
      businessName,
      businessAddress: newUser.address,
      businessPhone: phone_no,
      imageOfMess,
      Gst_No,
    });

    await newVendor.save();

    res.status(201).send({
      message: "Vendor registered successfully",
      Vendor: newVendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// function from where the vendors can create plans
export const createPlan = async (req, res) => {
  const { vendorId } = req.params;
  const { planName, description, menuImage, planType, price, duration } =
    req.body;

  console.log(
    vendorId,
    planName,
    description,
    menuImage,
    planType,
    price,
    duration
  );

  if (
    !planName ||
    !description ||
    !planType ||
    !price ||
    !duration ||
    !vendorId ||
    !menuImage
  ) {
    return res.status(400).send({
      message: "The plan details are incomplete.",
      success: false,
    });
  }

  try {
    const vendor = await VendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const newPlan = await PlanModel.create({
      planName,
      description,
      planType,
      price,
      duration,
      menuImage,
      offeredBy: vendor._id,
    });

    vendor.ListOfPlansOffered.push(newPlan._id);
    await vendor.save();

    res
      .status(201)
      .json({ message: "Plan created successfully", plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// function to display all venders.

export const getAllVendors = async (req, res) => {
  try {
    const vendors = await VendorModel.find()
      .populate("userID", "name email address phone_no")
      .populate(
        "ListOfPlansOffered",
        "planName description planType price menuImage duration"
      );

    res.status(200).json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
