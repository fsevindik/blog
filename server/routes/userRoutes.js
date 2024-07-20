import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

//User register
router.post("/register", async (request, response) => {
  try {
    const { email, password, name } = request.body;
    const user = await User.create({ email, password, name });
    console.log("New user created");
    return response.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//user login
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
        token: token,
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

// find user with ID
router.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

export default router;
