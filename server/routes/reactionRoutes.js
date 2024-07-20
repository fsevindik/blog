import express from "express";
import Film from "../models/filmModel.js";

const router = express.Router();

// Add a like to a film
router.post("/:filmId/like", async (req, res) => {
  try {
    const { filmId } = req.params;
    const { userId } = req.body;

    const film = await Film.findById(filmId);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    // Check if the user has already liked
    const existingLike = film.ratings.find(
      (rating) => rating.userId.toString() === userId
    );

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "User has already liked this film" });
    }

    // Add new like
    film.ratings.push({
      userId,
      rating: 10, // We'll use 10 to represent a like
    });

    await film.save();

    res.json({ message: "Like added successfully", film });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a like from a film
router.delete("/:filmId/like", async (req, res) => {
  try {
    const { filmId } = req.params;
    const { userId } = req.body;

    const film = await Film.findById(filmId);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    // Remove the user's like
    film.ratings = film.ratings.filter(
      (rating) => rating.userId.toString() !== userId
    );

    await film.save();

    res.json({ message: "Like removed successfully", film });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get likes for a film
router.get("/:filmId/likes", async (req, res) => {
  try {
    const { filmId } = req.params;

    const film = await Film.findById(filmId).populate("ratings.userId", "name");
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    const likes = film.ratings.map((rating) => ({
      user: rating.userId,
    }));

    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get like count for a film
router.get("/:filmId/likeCount", async (req, res) => {
  try {
    const { filmId } = req.params;

    const film = await Film.findById(filmId);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    const likeCount = film.ratings.length;

    res.json({ likes: likeCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
