const Book = require("../models/Book");

function isAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admins only" });
  next();
}

async function canEditBook(req, res, next) {
  
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (req.user.role === "admin") return next();
    if (
      req.user.role === "owner" &&
      book.createdBy.toString() === req.user.userId
    )
      return next();

    return res.status(403).json({ message: "Forbidden: Not allowed to edit" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { isAdmin, canEditBook };
