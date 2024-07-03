import express from "express";
import {
  vendorLogin,
  vendorRegister,
} from "../controllers/Vender-controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/loginVendor", vendorLogin);
vendorRouter.post("/createVendor", vendorRegister);

export default vendorRouter;
