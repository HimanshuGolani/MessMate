import express from "express";

import {imageUpload} from "../controllers/fileUpload.js";

const uploadRouter=express.Router();

//uploadRouter.post("/localFileUpload",localFileUpload);
uploadRouter.post("/imageUpload",imageUpload);

export default uploadRouter;