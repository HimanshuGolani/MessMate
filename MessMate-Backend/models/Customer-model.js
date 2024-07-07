import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: true },
  address: { type: String },
  phoneNumber: { type: String },
  Current_Plan: {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    startingDate: {
      type: Date,
    },
    validTill: {
      type: Date,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    canceledMealsList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MealTracker",
      },
    ],
  },
  PreviousPlans: [
    {
      plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
      },
      startingDate: {
        type: Date,
      },
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    },
  ],
});

export default mongoose.model("Customer", customerSchema);
