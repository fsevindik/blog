import express from "express";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const router = express.Router();

// Admin'in tüm mesajları alması
router.get("/admin/messages", async (req, res) => {
  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const messages = await Message.find({ recipient: adminUser._id })
      .sort("sentAt")
      .populate("sender", "name");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kullanıcıdan admin'e mesaj gönderme
router.post("/", async (req, res) => {
  const { userId, content } = req.body;

  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const message = new Message({
      sender: userId,
      recipient: adminUser._id,
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Belirli bir kullanıcıya ait mesajları alma
router.get("/:userId", async (req, res) => {
  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const messages = await Message.find({
      $or: [
        { sender: req.params.userId, recipient: adminUser._id },
        { sender: adminUser._id, recipient: req.params.userId },
      ],
    })
      .sort("sentAt")
      .populate("sender", "name")
      .populate("recipient", "name");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mesaj silme
router.delete("/:messageId", async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Message.findByIdAndDelete(req.params.messageId);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
router.delete("/:messageId", async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await Message.findByIdAndDelete(req.params.messageId);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
