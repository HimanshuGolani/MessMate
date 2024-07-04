import express from "express";
import {
  createPlan,
  getAllVendors,
  vendorLogin,
  vendorRegister,
} from "../controllers/Vender-controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/loginVendor", vendorLogin);
vendorRouter.post("/createVendor", vendorRegister);
vendorRouter.post("/addPlan/:vendorId", createPlan);
vendorRouter.get("/getAllVendorDetails", getAllVendors);

export default vendorRouter;
