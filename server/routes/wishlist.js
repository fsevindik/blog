import express from "express";
import auth from "../middleware/auth.js";
import WishList from "../models/WishList.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const wishListItems = await WishList.find({ user: req.user.id });
    res.json(wishListItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { filmTitle } = req.body;
    const newWishListItem = new WishList({
      user: req.user.id,
      filmTitle,
    });
    const savedItem = await newWishListItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedItem = await WishList.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Wish list item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
