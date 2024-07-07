import express from "express";
import {
  canceledMealsList,
  cancellationHandler,
} from "../controllers/DailyMealTracker-controller.js";

const mealCancelationRouter = express.Router();

mealCancelationRouter.post("/cancelRequest", cancellationHandler);
mealCancelationRouter.get("/getTodasCanelations", canceledMealsList);

export default mealCancelationRouter;
