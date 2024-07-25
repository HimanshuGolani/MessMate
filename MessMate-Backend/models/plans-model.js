import mongoose from "mongoose";
import moment from "moment";

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  menuImage: {
    type: String,
    required: true,
  },
  planType: {
    type: String,
    enum: ["Lunch", "Dinner", "Both"],
    required: true,
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
  numberOfCustomers: {
    type: Number,
    default: 0,
  },
  startingDateOfPlan: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
});

// Pre-save middleware to calculate the ending date
planSchema.pre("save", function (next) {
  if (this.isModified("startingDateOfPlan") || this.isModified("duration")) {
    const startingDate = moment(this.startingDateOfPlan);
    let endingDate;

    // Assuming duration is a string like "7 days" or "1 month"
    const durationParts = this.duration.split(" ");
    const durationValue = parseInt(durationParts[0]);
    const durationUnit = durationParts[1].toLowerCase();

    switch (durationUnit) {
      case "day":
      case "days":
        endingDate = startingDate.add(durationValue, "days");
        break;
      case "week":
      case "weeks":
        endingDate = startingDate.add(durationValue, "weeks");
        break;
      case "month":
      case "months":
        endingDate = startingDate.add(durationValue, "months");
        break;
      default:
        throw new Error("Invalid duration unit");
    }

    this.endingDate = endingDate.toDate();
  }
  next();
});

export default mongoose.model("Plan", planSchema);
