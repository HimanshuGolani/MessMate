import express from "express";
import {
  createPlan,
  getAllVendors,
  getCurrentPlans,
  getListOfCustomers,
  vendorLogin,
  vendorRegister,
  updatePlan,
  deletePlan
} from "../controllers/Vender-controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/loginVendor", vendorLogin);
vendorRouter.post("/createVendor", vendorRegister);
vendorRouter.post("/addPlan/:vendorId", createPlan);
vendorRouter.get("/getMyPlans/:vendorId", getCurrentPlans);
vendorRouter.get("/getListOfCustomers/:vendorId", getListOfCustomers);
vendorRouter.get("/getAllVendorDetails", getAllVendors);
vendorRouter.put("/updatePlan/:planId", updatePlan);
vendorRouter.delete("/deletePlan/:planId",deletePlan);

export default vendorRouter;
