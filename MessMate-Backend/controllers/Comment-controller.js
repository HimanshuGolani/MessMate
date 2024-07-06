import Plan from "../models/plans-model.js";
import Comment from "../models/Comments-model.js";

// Add a new comment to a plan
export const addComment = async (req, res) => {
    const { planId } = req.params;
    const { customerId, vendorId, comment, rating } = req.body;
  
    try {
      const newComment = new Comment({
        customerId,
        vendorId,
        planId,
        comment,
        rating,
      });
  
      const savedComment = await newComment.save();
  
      await Plan.findByIdAndUpdate(planId, {
        $push: { comments: savedComment._id },
      });
  
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ message: "Error adding comment", error });
    }

};

  // Get all comments for a plan
export const getComments = async (req, res) => {
    const { planId } = req.params;
  
    try {
      const comments = await Comment.find({ planId }).populate("customerId").populate("vendorId");
  
      if (!comments) {
        return res.status(404).json({ message: "No comments found for this plan" });
      }
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving comments", error });
    }
};
// Update a comment
export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { comment, rating } = req.body;
  
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { comment, rating },
        { new: true }
      );
  
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: "Error updating comment", error });
    }
};
// Delete a comment
export const deleteComment = async (req, res) => {
    const { commentId, planId } = req.params;
  
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      await Plan.findByIdAndUpdate(planId, {
        $pull: { comments: commentId },
      });
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  };