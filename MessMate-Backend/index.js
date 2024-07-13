import express from "express";
import "dotenv/config";
import connectionWithDb from "./Database_Connect/connectionWithDb.js";
import CustomerRouter from "./router/Customer-router.js";
import vendorRouter from "./router/Vender-router.js";
import commentRouter from "./router/Comment-router.js";
import mealCancelationRouter from "./router/MealCanelation-router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// initializing APP
const app = express();

const PORT = process.env.PORT || 5001;

// seting up middle wears
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// setting up routes
app.use("/api/v1/user", CustomerRouter);
app.use("/api/v1/vender", vendorRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/meal", mealCancelationRouter);

// connecting to mongoDb
connectionWithDb();

// starting the app
app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
