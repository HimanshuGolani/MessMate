import express from "express";
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/Comment-controller.js";

const commentRouter = express.Router();

commentRouter.post("/addComment/:planId", addComment);
commentRouter.get("/allComments/:planId", getComments);
commentRouter.put("/updateComments/:commentId", updateComment);
commentRouter.delete("/deleteComment/:planId/:commentId", deleteComment);

export default commentRouter;
