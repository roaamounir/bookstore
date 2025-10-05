const express = require("express");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");
const { canEditBook } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("createdBy", "username");
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, author, price, bookCoverImage, description, category } =
      req.body;
    const newBook = new Book({
      title,
      author,
      price,
      bookCoverImage,
      description,
      category,
      createdBy: req.user.userId,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, canEditBook, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, canEditBook, async (req, res) => {
  console.log(" Entered canEditBook, user:", req.user);

  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
