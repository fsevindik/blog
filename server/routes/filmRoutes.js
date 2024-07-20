import express from "express";
import { Film } from "../models/filmModel.js";

const router = express.Router();

// Get all films
router.get("/", async (req, res) => {
  try {
    const films = await Film.find({});
    return res.status(200).json({
      count: films.length,
      data: films,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get a specific film
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findById(id);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }
    return res.status(200).json(film);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Create a new film
router.post("/", async (req, res) => {
  try {
    const {
      title,
      director,
      releaseYear,
      posterImageUrl,
      bannerImageUrl,
      actors,
      filmOverview,
    } = req.body;
    if (
      !title ||
      !director ||
      !releaseYear ||
      !posterImageUrl ||
      !bannerImageUrl ||
      !actors ||
      !filmOverview
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: title, director, releaseYear, posterImageUrl, bannerImageUrl, actors, filmOverview",
      });
    }
    const newFilm = {
      title,
      director,
      releaseYear,
      posterImageUrl,
      bannerImageUrl,
      actors,
      filmOverview,
      ratings: [],
    };
    const film = await Film.create(newFilm);
    return res.status(201).send(film);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update a film
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Film.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Film not found" });
    }
    return res.status(200).send({ message: "Film updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a film
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Film.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Film not found" });
    }
    return res.status(200).send({ message: "Film deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Rate a film
router.post("/:id/rate", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, rating } = req.body;

    const film = await Film.findById(id);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    const existingRatingIndex = film.ratings.findIndex(
      (r) => r.userId.toString() === userId
    );
    if (existingRatingIndex > -1) {
      film.ratings[existingRatingIndex].rating = rating;
    } else {
      film.ratings.push({ userId, rating });
    }

    await film.save();
    const averageRating = film.calculateAverageRating();

    res.json({ averageRating });
  } catch (error) {
    console.error("Error rating film:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get average rating of a film
router.get("/:id/averageRating", async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findById(id);

    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    const averageRating = film.calculateAverageRating();
    res.json({ averageRating });
  } catch (error) {
    console.error("Error getting average rating:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
