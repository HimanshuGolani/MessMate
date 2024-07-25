import CustomerModel from "../models/Customer-model.js";
import MealTrackerModel from "../models/DailyMealTracker-model.js";
import PlanModel from "../models/plans-model.js";
import vendorModel from "../models/vendor-model.js";

import moment from "moment";

export const cancellationHandler = async (req, res) => {
  try {
    // Extracting the mealType from the req.body
    const { customerId, selectedDate, planId, mealType } = req.body;

    // Checking that the parameters for the controllers are non-empty
    if (!customerId || !planId || !mealType || !selectedDate) {
      return res.status(400).send({
        message: "The data is incompletely sent.",
      });
    }

    const plan = await PlanModel.findById(planId);
    const customer = await CustomerModel.findById(customerId);

    // Checking that the request params are valid or not
    if (!plan || !customer) {
      return res.status(404).send({
        message: "Details not found",
        success: false,
      });
    }

    // Get the current time
    const currentTime = moment();

    let cancelRequest;

    // Checking the type of the meal and the cancellation time
    if (mealType === "Lunch") {
      // Check if the request is made before 12 PM
      const lunchCutoffTime = moment().set({ hour: 12, minute: 0 });
      if (currentTime.isAfter(lunchCutoffTime)) {
        return res.status(400).send({
          message: "Lunch cancellation must be requested before 12 PM.",
        });
      }

      // Logic for canceling lunch
      cancelRequest = await MealTrackerModel.create({
        mealType: "Lunch",
        mealStatus: false,
        todaysDate: selectedDate,
        userIdOfCustomer: customerId,
        planId: planId,
      });
    } else if (mealType === "Dinner") {
      // Check if the request is made before 6 PM
      const dinnerCutoffTime = moment().set({ hour: 18, minute: 0 });
      if (currentTime.isAfter(dinnerCutoffTime)) {
        return res.status(400).send({
          message: "Dinner cancellation must be requested before 6 PM.",
        });
      }

      // Logic for canceling dinner
      cancelRequest = await MealTrackerModel.create({
        mealType: "Dinner",
        mealStatus: false,
        todaysDate: selectedDate,
        userIdOfCustomer: customerId,
        planId: planId,
      });
    }

    await cancelRequest.save();

    customer.Current_Plan.canceledMealsList.push(cancelRequest._id);
    await customer.save();

    return res.status(200).send({
      success: true,
      message: "Meal canceled successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const todaysCancelation = async (req, res) => {
  try {
    const { selectedDate, customerId } = req.params;

    if (!selectedDate) {
      return res.status(400).send({ message: "Date parameter is missing." });
    }

    const canceledMeals = await MealTrackerModel.find({
      userIdOfCustomer: customerId,
      todaysDate: selectedDate,
    }).populate("userIdOfCustomer");

    // If no canceled meals are found
    if (canceledMeals.length === 0) {
      return res
        .status(200)
        .send({ message: "No canceled meals for the selected date." });
    }

    // Format the response with detailed customer information
    const response = canceledMeals.map((meal) => ({
      mealType: meal.mealType,
      canceledOn: meal.todaysDate,
      customer: {
        name: meal.userIdOfCustomer.fullName || "Unknown",
        address: meal.userIdOfCustomer.address || "Unknown",
      },
    }));

    console.log("====================================");
    console.log(response);
    console.log("====================================");

    return res.status(200).send({ response });
  } catch (error) {
    console.error("Error fetching today's cancellations:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};

export const canceledMealsList = async (req, res) => {
  const { vendorId } = req.params;

  try {
    // Find the vendor by ID and populate the ListOfCustomers field
    const vendor = await vendorModel
      .findById(vendorId)
      .populate("ListOfCustomers");

    if (!vendor) {
      return res.status(404).send({ message: "The vendor was not found" });
    }

    // Extract ListOfCustomers from the vendor object
    const { ListOfCustomers } = vendor;

    // Initialize canceledMealsList as an empty array
    let canceledMealsList = [];

    // Check if ListOfCustomers is not empty and has at least one customer
    if (ListOfCustomers.length > 0) {
      const firstCustomer = ListOfCustomers[0];
      const currentPlan = firstCustomer.Current_Plan || {};
      canceledMealsList = currentPlan.canceledMealsList || [];
    }

    // Fetch details of canceled meals using MealTrackerModel
    const todaysCancelationList = await Promise.all(
      canceledMealsList.map(async (mealId) => {
        const user = await MealTrackerModel.findById(mealId);
        return user;
      })
    );

    // Respond with the list of canceled meals
    res.status(200).send(todaysCancelationList);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
