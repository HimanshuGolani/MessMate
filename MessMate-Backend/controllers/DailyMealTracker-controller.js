import CustomerModel from "../models/Customer-model.js";
import MealTrackerModel from "../models/DailyMealTracker-model.js";
import PlanModel from "../models/plans-model.js";

export const cancellationHandler = async (req, res) => {
  try {
    // extracting the mealType from the req.body
    const { customerId, planId, mealType } = req.body;
    // checking the parameters for the controlers are non empty
    if (!customerId || !planId || !mealType) {
      return res.status(400).send({
        message: "The data is incompletely send.",
      });
    }

    const plan = await PlanModel.findById(planId);
    const customer = await CustomerModel.findById(customerId);

    // checking that the requests params are valid or not
    if (!plan || !customer) {
      return res.status(404).send({
        message: "Details not found",
        success: false,
      });
    }

    let cancelRequest;
    // checking the type of the meal.
    if (mealType === "Lunch") {
      // logic for canceling lunch
      cancelRequest = await MealTrackerModel.create({
        mealType: "Lunch",
        mealStatus: false,
        userIdOfCustomer: customerId,
        planId: plan,
      });
    } else if (mealType === "Dinner") {
      // logic for canceling of dinner
      cancelRequest = await MealTrackerModel.create({
        mealType: "Dinner",
        mealStatus: false,
        userIdOfCustomer: customerId,
        userIdOfVendor: vendorId,
      });
    }

    await cancelRequest.save();

    customer.Current_Plan.canceledMealsList.push(cancelRequest._id);

    return res.status(200).send({
      success: true,
      message: "meal canceled succesfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error.",
      success: false,
    });
  }
};
