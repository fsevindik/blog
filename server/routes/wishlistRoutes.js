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
    const { text } = req.body;
    const newWishListItem = new WishList({
      text,
      added: false,
      status: "pending",
    });
    const savedItem = await newWishListItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//update wishlist item status not wishitem's itself
router.patch("/:id", async (req, res) => {
  try {
    const { added, status } = req.body;
    const updatedItem = await WishList.findByIdAndUpdate(
      req.params.id,
      { added, status },
      { new: true,
        runValidators: true,
       }
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
