import express from "express";
import WishList from "../models/wishListModel.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const wishListItems = await WishList.find();
    res.json(wishListItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { filmTitle } = req.body;
    const newWishListItem = new WishList({
      filmTitle,
    });
    const savedItem = await newWishListItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", async (req, res) => {
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
