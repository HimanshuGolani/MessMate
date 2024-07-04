import express from "express";
import {
  displayCustomersCount,
  getCurrentPlan,
  getPreviousPlans,
  purchasePlan,
  userLogin,
  userRegister,
} from "../controllers/Customer-controller.js";

const CustomerRouter = express.Router();

CustomerRouter.get("/getCustomerCount", displayCustomersCount);
CustomerRouter.post("/login", userLogin);
CustomerRouter.post("/createUser", userRegister);
CustomerRouter.get("/getCurrentPlanDetails/:userId", getCurrentPlan);
CustomerRouter.post("/purchasePlan", purchasePlan);
CustomerRouter.get("/getPreviousDetails", getPreviousPlans);

export default CustomerRouter;
