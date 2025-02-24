import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select(
      "_id name email online lastActiveAt"
    );
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.create({
      email,
      password,
      name,
      online: true,
      lastActiveAt: new Date(),
    });
    console.log("New user created");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      role: user.role,
      online: user.online,
      lastActiveAt: user.lastActiveAt,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      user.online = true;
      user.lastActiveAt = new Date();
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        role: user.role,
        online: user.online,
        lastActiveAt: user.lastActiveAt,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.post("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.online = false;
      await user.save();
      res.status(200).send("User logged out and status updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        online: user.online,
        lastActiveAt: user.lastActiveAt,
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:userId/favorites", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("favorites");

    if (user) {
      res.json({ favorites: user.favorites });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

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

router.patch("/:userId/online", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { online } = req.body;

    const user = await User.findById(userId);
    if (user) {
      user.online = online;
      user.lastActiveAt = new Date();
      await user.save();
      res.status(200).send("User online status updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.patch("/update-online-status", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.online = true;
      user.lastActiveAt = new Date();
      await user.save();
      res.status(200).send("User online status updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
