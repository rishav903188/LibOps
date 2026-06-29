const express = require("express");
const {
  borrowBook,
  returnBook,
  getMyBorrows,
} = require("../controllers/borrow.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/:bookId", protect, borrowBook);
router.put("/return/:borrowId", protect, returnBook);
router.get("/my", protect, getMyBorrows);

module.exports = router;