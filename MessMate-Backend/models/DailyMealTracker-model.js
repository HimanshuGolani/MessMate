import mongoose from "mongoose";

const MealTrackSchema = new mongoose.Schema({
  mealType: {
    type: String,
    enum: ["Lunch", "Dinner"],
    required: true,
  },
  todaysDate: {
    type: Date,
    default: () => new Date(),
  },
  mealStatus: {
    type: Boolean,
    default: true,
    required: true,
  },
  userIdOfCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
    index: true,
  },
  userIdOfVendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
    index: true,
  },
});

export default mongoose.model("MealTracker", MealTrackSchema);
