import express from "express";
import Film from "../models/filmModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const films = await Film.find().populate("ratings.userId", "name");
    res.json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const film = await Film.findById(req.params.id).populate(
      "ratings.userId",
      "name"
    );
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }
    res.json(film);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    director: req.body.director,
    releaseDate: req.body.releaseDate,
    imageA: req.body.imageA,
    imageB: req.body.imageB,
    filmOverview: req.body.filmOverview,
  });

  try {
    const newFilm = await film.save();
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    film.title = req.body.title ?? film.title;
    film.director = req.body.director ?? film.director;
    film.releaseDate = req.body.releaseDate ?? film.releaseDate;
    film.imageA = req.body.imageA ?? film.imageA;
    film.imageB = req.body.imageB ?? film.imageB;
    film.filmOverview = req.body.filmOverview ?? film.filmOverview;

    const updatedFilm = await film.save();
    res.json(updatedFilm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    await film.remove();
    res.json({ message: "Film deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
