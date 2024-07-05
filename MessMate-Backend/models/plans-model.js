import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  planType: {
    type: String,
    enum: ["Lunch", "Dinner", "Both"],
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  offeredBy: {
    ref: "Vendor",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model("Plan", planSchema);
