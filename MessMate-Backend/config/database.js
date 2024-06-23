import mongoose from "mongoose";
import "dotenv/config";

const connectionWithDb = () => {
  mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log(`Connection is succesfull with mongodb`);
    })
    .catch((error) => {
      console.log(`Error occured`);
      console.log(error);
      process.exit(1);
    });
};

export { connectionWithDb };
