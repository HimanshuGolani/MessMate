import mongoose from "mongoose";
import "dotenv/config";

const connectionWithDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`Connection is succesfull with mongodb`);
    })
    .catch((error) => {
      console.log(`Error occured ${error}`);
      process.exit(1);
    });
};

export default connectionWithDb;
