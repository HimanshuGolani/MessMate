import UserModel from "../models/User-model.js";
import CustomerModel from "../models/Customer-model.js";
import plansModel from "../models/plans-model.js";
import VendorModel from "../models/vendor-model.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

// to display hapy custoemrs name and their count...
export const displayCustomersCount = async (req, res) => {
  try {
    const numberOfUsers = await UserModel.countDocuments();

    return res.status(200).send({
      noOfUsers: numberOfUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

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

    const id = existingUser._id;

    const customer = await CustomerModel.findOne({ userID: id });

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

    const { _id } = customer;

    return res.status(200).send({
      message: "Login successful.",
      success: true,
      user: existingUser,
      CustomerId: _id,
      role: "Customer",
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

    // Create and save Customer document if the role is 'Customer'
    let newCustomer;
    if (role === "Customer") {
      newCustomer = new CustomerModel({
        userID: newUser._id,
        fullName: name,
        address: address.city + ", " + address.location,
        phoneNumber: phone_no,
      });

      await newCustomer.save();
    }

    return res.status(201).send({
      message: "User registered successfully.",
      success: true,
      Customer: newCustomer,
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

    console.log("The body received is:", planId, customerId);

    if (!planId || !customerId) {
      return res.status(400).send({
        message: "Plan ID or Customer ID is missing.",
        success: false,
      });
    }

    // Find the user and plan
    const user = await CustomerModel.findById(customerId);
    const chosenPlan = await plansModel.findById(planId);

    if (!user || !chosenPlan) {
      return res.status(404).send({
        message: "User or Plan not found.",
        success: false,
      });
    }

    // Incrementing the plan's number of customers
    chosenPlan.numberOfCustomers += 1;

    // Setting current plan details for the user
    user.Current_Plan = {
      plan: planId,
      startingDate: chosenPlan.startingDateOfPlan, // Use the plan's starting date
      validTill: chosenPlan.endingDate, // Use the plan's ending date
      vendorId: chosenPlan.offeredBy,
    };

    const vendor = await VendorModel.findById(chosenPlan.offeredBy);

    if (!vendor) {
      return res.status(404).send({
        message: "Vendor not found.",
        success: false,
      });
    }

    vendor.ListOfCustomers.push(customerId);
    await user.save();
    await vendor.save();
    await chosenPlan.save(); // Save the updated plan

    console.log(user, vendor);

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

    console.log("User ID received:", userId);

    if (!userId) {
      return res.status(400).send({
        message: "ID not received.",
        success: false,
      });
    }

    const currentUser = await CustomerModel.findById(userId).populate(
      "Current_Plan.plan"
    );

    if (
      !currentUser ||
      !currentUser.Current_Plan ||
      !currentUser.Current_Plan.plan
    ) {
      return res.status(404).send({
        message: "User or Current Plan not found.",
        success: false,
      });
    }

    const currentPlan = currentUser.Current_Plan.plan;
    const offeredBy = currentUser.Current_Plan.plan.offeredBy;

    const vendorDetails = await VendorModel.findById(offeredBy);

    if (!vendorDetails) {
      return res.status(404).send({
        message: "Vendor not found.",
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
      currentPlan: {
        ...currentPlan.toObject(),
        startingDate: currentUser.Current_Plan.startingDate,
        validTill: currentUser.Current_Plan.validTill,
      },
      vendorName: vendorDetails.businessName,
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
