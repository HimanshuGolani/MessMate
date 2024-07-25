import express from "express";
import {
  canceledMealsList,
  cancellationHandler,
  todaysCancelation,
} from "../controllers/DailyMealTracker-controller.js";

const mealCancelationRouter = express.Router();

mealCancelationRouter.post("/cancelRequest", cancellationHandler);
mealCancelationRouter.get(
  "/getTodaysCacnelation/:selectedDate/:customerId",
  todaysCancelation
);
mealCancelationRouter.get(
  "/vendorGetTodaysCanelations/:vendorId",
  canceledMealsList
);

export default mealCancelationRouter;
