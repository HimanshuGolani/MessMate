import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  phone_no: {
    type: Number,
    required: true,
  },
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
    venderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
  },
  PreviousPlans: [
    {
      startingDate: Date,
      venderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendor",
      },
    },
  ],
});

export default mongoose.model("User", userSchema);
