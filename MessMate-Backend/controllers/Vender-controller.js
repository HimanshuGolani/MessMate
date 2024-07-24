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

    const { _id } = existingUser;

    const user = await VendorModel.findOne({ userID: _id });

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
      role: "Vendor",
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
      role: "Vendor",
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
      .send({ message: "Plan created successfully", plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// A function taht lets the vendor retrieve his plans.
// make 2
// functions 1 to delete plan
// one to update his plan's

export const getCurrentPlans = async (req, res) => {
  try {
    // retrieve the vendorId from the params
    const { vendorId } = req.params;
    // find the vendor
    const vendor = await VendorModel.findById(vendorId).populate(
      "ListOfPlansOffered",
      "planName description planType price menuImage duration"
    );

    // check if the vendor exists or not ??
    // if does not exists
    if (!vendor) {
      return res.status(404).send({
        message: "Invalid VenderId",
      });
    }
    // if the vendor exists then continue
    // retrieve the plans form the vendor object
    const { ListOfPlansOffered } = vendor;

    // check if the list isEmpty
    if (ListOfPlansOffered.length === 0) {
      return res.status(204).send({
        message: "the list is empty.",
        ListOfPlansOffered,
      });
    }

    // if the List has elements then send the list
    // send the plans to the front end
    return res.status(200).send({
      message: "Succesfull",
      ListOfPlansOffered,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

// a function that gives the vendor all the customers list he has.

export const getListOfCustomers = async (req, res) => {
  try {
    // retrieve the vendorId form the params
    const { vendorId } = req.params;

    // serch for the vendor
    const vendor = await VendorModel.findById(vendorId).populate(
      "ListOfCustomers",
      "fullName address phoneNumber Current_Plan  startingDate validTill"
    );
    // check if the vendor exists or not.
    if (!vendor) {
      return res.status(404).send({
        message: "the list is empty.",
      });
    }
    // retrieve the list of customers from the vendor
    const { ListOfCustomers } = vendor;

    if (ListOfCustomers.length === 0) {
      return res.status(204).send({
        message: "the list is empty.",
        ListOfCustomers,
      });
    }

    return res.status(200).send({
      ListOfCustomers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
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

//update the plan

export const updatePlan = async (req, res) => {
  const { planId } = req.params;
  const { planName, description, menuImage, planType, price, duration } =
    req.body;

  try {
    console.log("The data recieved is :", planId);

    // Find the existing plan by ID
    const existingPlan = await PlanModel.findById(planId);

    console.log("The plans is : ", existingPlan);

    if (!existingPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // // Send the current values of the plan to the frontend
    // if (req.method === "GET") {
    //   return res.status(200).json({
    //     success: true,
    //     plan: existingPlan,
    //   });
    // }

    // Update the plan with the new values
    existingPlan.planName = planName || existingPlan.planName;
    existingPlan.description = description || existingPlan.description;
    existingPlan.menuImage = menuImage || existingPlan.menuImage;
    existingPlan.planType = planType || existingPlan.planType;
    existingPlan.price = price || existingPlan.price;
    existingPlan.duration = duration || existingPlan.duration;

    // Save the updated plan
    await existingPlan.save();

    console.log("The updated plan is : ", existingPlan);

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      plan: existingPlan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete plan
export const deletePlan = async (req, res) => {
  const { planId } = req.params;

  try {
    // Find the existing plan by ID
    const existingPlan = await PlanModel.findById(planId);

    if (!existingPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Find the vendor who offered the plan
    const vendor = await VendorModel.findById(existingPlan.offeredBy);

    if (vendor) {
      // Remove the plan from the vendor's ListOfPlansOffered
      vendor.ListOfPlansOffered = vendor.ListOfPlansOffered.filter(
        (id) => id.toString() !== planId
      );
      await vendor.save();
    }

    // Delete the plan
    await existingPlan.deleteOne();

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const VendorProfile = async (req, res) => {
  try {
    const { vendorId } = req.params;
    // cehck that the venodr id is recieved or not ??
    if (!vendorId) {
      return res.status(404).send({
        Message: "No vendorId recieved",
      });
    }
    // if recieved then retrieve the info and send it back.
    // find the vendor if exists
    const findVendor = await VendorModel.findById(vendorId);
    if (!findVendor) {
      return res.status(404).send({
        message: "Vendor not found.",
      });
    }

    console.log("====================================");
    console.log(findVendor);
    console.log("====================================");

    const {
      businessAddress,
      businessName,
      businessPhone,
      ListOfPlansOffered,
      Gst_No,
      ListOfCustomers,
      imageOfMess,
    } = findVendor;

    let no_of_plan_offered = ListOfPlansOffered.length;
    let no_of_customers = ListOfCustomers.length;

    // retrieve the name , no. of customers , phone no. , adderess , no. of plans offered by him.
    // and return it to the front end.
    return res.status(201).send({
      businessAddress,
      businessName,
      businessPhone,
      imageOfMess,
      plansOffered: no_of_plan_offered,
      noOfCustomers: no_of_customers,
      Gst_No,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
