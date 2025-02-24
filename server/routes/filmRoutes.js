import express from "express";
import { Film } from "../models/filmModel.js";

const router = express.Router();


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


router.post("/", async (req, res) => {
  try {
    const {
      title,
      director,
      releaseYear,
      posterImageUrlA,
      bannerImageUrlB,
      actors,
      filmOverview,
      trailerUrl,
      honorableMentions,
    } = req.body;
    if (
      !title ||
      !director ||
      !releaseYear ||
      !posterImageUrlA ||
      !bannerImageUrlB ||
      !actors ||
      !filmOverview
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: title, director, releaseYear, posterImageUrlA, bannerImageUrlB, actors, filmOverview",
      });
    }
    const newFilm = {
      title,
      director,
      releaseYear,
      posterImageUrlA,
      bannerImageUrlB,
      actors,
      filmOverview,
      trailerUrl,
      honorableMentions: honorableMentions || [],
      ratings: [],
    };
    const film = await Film.create(newFilm);
    return res.status(201).send(film);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const result = await Film.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Film not found" });
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


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


router.get("/actor/:actorName", async (req, res) => {
  try {
    const { actorName } = req.params;
    console.log("Actor Name:", actorName);
    const films = await Film.find({ "actors.name": actorName });

    if (films.length === 0) {
      return res.status(404).json({ message: "No films found for this actor" });
    }

    const simplifiedFilms = films.map((film) => ({
      _id: film._id,
      title: film.title,
      posterImageUrlA: film.posterImageUrlA,
    }));

    return res.status(200).json({
      actorName: actorName,
      films: simplifiedFilms,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
