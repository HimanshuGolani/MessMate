import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  businessName: { type: String, required: true },
  businessAddress: {
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  businessPhone: { type: String, required: true },
  ListOfPlansOffered: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
  ],
  Gst_No: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Vendor", vendorSchema);
