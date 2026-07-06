const express = require("express");
const {
  createBook, getBooks, getBookById, updateBook, deleteBook, uploadBookCover,
} = require("../controllers/book.controller");
const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Books
 *   description: Book catalog management
 */

/**
 * @openapi
 * /api/books:
 *   get:
 *     tags: [Books]
 *     summary: Get all books
 *     security: []
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     tags: [Books]
 *     summary: Create a new book (with optional cover image)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, author, isbn]
 *             properties:
 *               title:        { type: string, example: Atomic Habits }
 *               author:       { type: string, example: James Clear }
 *               isbn:         { type: string, example: "9780735211292" }
 *               genre:        { type: string, example: Self Help }
 *               totalCopies:  { type: integer, example: 5 }
 *               cover:        { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.route("/")
  .get(getBooks)
  .post(protect, upload.single("cover"), createBook);

/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Get a book by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *   put:
 *     tags: [Books]
 *     summary: Update a book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:       { type: string }
 *               author:      { type: string }
 *               isbn:        { type: string }
 *               genre:       { type: string }
 *               totalCopies: { type: integer }
 *               cover:       { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Updated book
 *   delete:
 *     tags: [Books]
 *     summary: Delete a book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Book removed
 */
router.route("/:id")
  .get(getBookById)
  .put(protect, upload.single("cover"), updateBook)
  .delete(protect, deleteBook);

/**
 * @openapi
 * /api/books/{id}/cover:
 *   post:
 *     tags: [Books]
 *     summary: Upload cover image for an existing book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [cover]
 *             properties:
 *               cover: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Cover uploaded successfully
 */
router.post("/:id/cover", protect, upload.single("cover"), uploadBookCover);

module.exports = router;