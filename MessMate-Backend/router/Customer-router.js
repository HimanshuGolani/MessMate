import express from "express";
import { userLogin, userRegister } from "../controllers/Customer-controller.js";

const CustomerRouter = express.Router();

CustomerRouter.post("/login", userLogin);
CustomerRouter.post("/createUser", userRegister);

export default CustomerRouter;
