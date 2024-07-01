import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name: {
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
    startingDate: {
      type: Date,
      required: true,
    },
    validTill: {
      type: Date,
      required: true,
    },
    venderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      required: true,
    },
  },
  PreviousPlans: [
    {
      startingDate: Date,
      validTill: Date,
      venderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendor",
      },
    },
  ],
});

export default mongoose.model("User", userSchema);
