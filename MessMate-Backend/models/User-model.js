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
  role: {
    type: String,
    enum: ["Customer", "Vendor"],
    required: true,
  },
});

export default mongoose.model("User", userSchema);
