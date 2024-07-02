import express from "express";
import "dotenv/config";
import connectionWithDb from "./Database_Connect/connectionWithDb.js";
import userRouter from "./router/user-router.js";

// initializing APP
const app = express();

const PORT = process.env.PORT || 5001;

// seting up middle wears
app.use(express.json());

// setting up routes
app.use("/api/v1/user", userRouter);

// connecting to mongoDb
connectionWithDb();

// starting the app
app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
