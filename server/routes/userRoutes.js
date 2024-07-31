import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";

const router = express.Router();

// register
router.post("/register", async (request, response) => {
  try {
    const { email, password, name } = request.body;
    const user = await User.create({ email, password, name });
    console.log("New user created");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return response.status(201).json({
      _id: user._id, // dont forget to type like _id   not .id for fe
      name: user.name,
      email: user.email,
      token,
      role: user.role,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//  login
router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      console.log("User logged in successfully");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return response.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        role: user.role,
      });
    } else {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get user by- ID
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get user's favorite films
router.get("/:userId/favorites", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("favorites");

    if (user) {
      res.json({
        favorites: user.favorites,
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Add a film to user's favorites
router.post("/:userId/favorites/:filmId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const filmId = new mongoose.Types.ObjectId(req.params.filmId);

    const user = await User.findById(userId);

    if (user) {
      if (!user.favorites.includes(filmId)) {
        user.favorites.push(filmId);
        await user.save();
        res.status(200).send("Film added to favorites");
      } else {
        res.status(400).send("Film already in favorites");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Remove a film from user's favorites
router.delete("/:userId/favorites/:filmId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const filmId = new mongoose.Types.ObjectId(req.params.filmId);

    const user = await User.findById(userId);
    if (user) {
      user.favorites = user.favorites.filter(
        (favoriteFilmId) => !favoriteFilmId.equals(filmId)
      );
      await user.save();
      res.status(200).send("Film removed from favorites");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
