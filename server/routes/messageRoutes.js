import express from "express";
import Message from "../models/messageModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, content } = req.body;

  try {
    const message = new Message({
      sender: userId,
      recipient: "admin",
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId, recipient: "admin" },
        { sender: "admin", recipient: req.params.userId },
      ],
    }).sort("sentAt");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
