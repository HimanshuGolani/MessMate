import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  description: String,
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
});

export default mongoose.model("Plan", planSchema);
