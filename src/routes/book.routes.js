// src/routes/book.routes.js
const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/").get(getBooks).post(protect, createBook);

router
  .route("/:id")
  .get(getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;
