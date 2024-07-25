import express from "express";
import {
  canceledMealsList,
  cancellationHandler,
  todaysCancelation,
} from "../controllers/DailyMealTracker-controller.js";

const mealCancelationRouter = express.Router();

mealCancelationRouter.post("/cancelRequest", cancellationHandler);
mealCancelationRouter.get("/getTodaysCacnelation/:date", todaysCancelation);
mealCancelationRouter.get("/getTodasCanelations", canceledMealsList);

export default mealCancelationRouter;
