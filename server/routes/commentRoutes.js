// commentRoutes.js
import express from "express";
import Comment from "../models/commentModel.js";
import Film from "../models/filmModel.js";

const router = express.Router();

// Get all comments for a film
router.get("/film/:filmId", async (req, res) => {
  try {
    const comments = await Comment.find({ filmId: req.params.filmId })
      .populate("userId", "name")
      .sort("-createdAt");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new comment to a film
router.post("/", async (req, res) => {
  try {
    const film = await Film.findById(req.body.filmId);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    const newComment = new Comment({
      filmId: req.body.filmId,
      userId: req.body.userId,
      content: req.body.content,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a comment
router.put("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.content = req.body.content;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a comment
router.delete("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
