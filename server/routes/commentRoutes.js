import express from "express";
import Comment from "../models/commentModel.js";
import { Film } from "../models/filmModel.js";

const router = express.Router();

// take all comments for a film
router.get("/film/:filmId", async (req, res) => {
  try {
    const { filmId } = req.params;

    const comments = await Comment.find({ filmId })
      .populate("userId", "name")
      .sort("-createdAt");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add enw comment
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

// update
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

// delete comment
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

// add comment
router.post("/:commentId/replies", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const newReply = {
      userId: req.body.userId,
      content: req.body.content,
    };

    comment.replies.push(newReply);
    const updatedComment = await comment.save();
    res.status(201).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like or unlike a comment
router.post("/:commentId/likes", async (req, res) => {
  const { filmId, userId, content } = req.body;

  try {
    const newComment = new Comment({
      filmId,
      userId,
      content,
      reaction: { like: 0, usersLiked: [] },
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
