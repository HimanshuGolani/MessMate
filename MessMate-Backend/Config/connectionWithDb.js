import mongoose from "mongoose";
import "dotenv/config";

const connectionWithDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {})
    .catch((error) => {
      process.exit(1);
    });
};

export default connectionWithDb;
