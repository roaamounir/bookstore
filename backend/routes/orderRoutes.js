const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("books.book", "title author")
      .populate("user", "username name");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { books } = req.body;
    if (!books || books.length === 0)
      return res.status(400).json({ message: "No books provided" });

    const totalPrice = books.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = new Order({
      books: books.map((b) => ({
        book: b.bookId,
        quantity: b.quantity,
        price: b.price,
      })),
      user: req.user.userId,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("books.book", "title")
      .populate("user", "username");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
