import CustomerModel from "../models/Customer-model.js";
import vendorModel from "../models/vendor-model.js";
export const cancellationHandler = async (req, res) => {
  try {
    // extracting the mealType from the req.body
    const { customerId, vendorId, mealType } = req.body;
    // checking the parameters for the controlers are non empty
    if (!customerId || !vendorId || !mealType) {
      return res.status().send();
    }

    const vendor = await vendorModel.findOne(vendorId);
    const customer = await CustomerModel.findOne(customerId);

    // checking that the requests params are valid or not
    if (!vendor || !customer) {
      return res.status().send();
    }

    // checking the type of the meal.
    if (mealType === "Lunch") {
      // logic for canceling lunch
    } else if (mealType === "Dinner") {
      // logic for canceling of dinner
    }
  } catch (error) {}
};
