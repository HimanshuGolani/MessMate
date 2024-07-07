import express from "express";
import { cancellationHandler } from "../controllers/DailyMealTracker-controller.js";

const mealCancelationRouter = express.Router();

mealCancelationRouter.post("/cancelRequest", cancellationHandler);

export default mealCancelationRouter;
