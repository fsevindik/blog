import express from "express";
import Comment from "../models/commentModel.js";
import { Film } from "../models/filmModel.js";

const router = express.Router();

// Get all comments for a film
router.get("/film/:filmId", async (req, res) => {
  try {
    const { filmId } = req.params;
    const comments = await Comment.find({ filmId })
      .populate("userId", "name")
      .populate("replies.userId", "name")
      .sort("-createdAt");

    console.log("Populated comments:", JSON.stringify(comments, null, 2));

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: error.message });
  }
});

// Add new comment
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
    const populatedComment = await Comment.findById(savedComment._id).populate(
      "userId",
      "name"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update comment
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

// Delete comment
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

// Add reply to a comm.
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
    await comment.save();

    const updatedComment = await Comment.findById(req.params.commentId)
      .populate("userId", "name")
      .populate("replies.userId", "name");

    res.status(201).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like or unlike comm.
router.post("/:commentId/like", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.reaction) {
      comment.reaction = { like: 0, usersLiked: [] };
    }

    const userLikedIndex = comment.reaction.usersLiked.indexOf(userId);

    if (userLikedIndex === -1) {
      comment.reaction.usersLiked.push(userId);
      comment.reaction.like += 1;
    } else {
      comment.reaction.usersLiked.splice(userLikedIndex, 1);
      comment.reaction.like -= 1;
    }

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    console.error("Error updating like:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get users who liked a comment
router.get("/:commentId/likes", async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId).populate(
      "reaction.usersLiked",
      "name"
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const likedUsers = comment.reaction ? comment.reaction.usersLiked : [];
    res.json(likedUsers);
  } catch (error) {
    console.error("Error fetching liked users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
