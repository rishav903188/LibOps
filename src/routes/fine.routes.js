const express = require("express");
const { getMyFines, payFine, getAllFines } = require("../controllers/fine.controller");
const { protect } = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Fines
 *   description: Late return fine management
 */

/**
 * @openapi
 * /api/fines/my:
 *   get:
 *     tags: [Fines]
 *     summary: Get all fines of the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's fines with book details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fine'
 */
router.get("/my", protect, getMyFines);

/**
 * @openapi
 * /api/fines/{id}/pay:
 *   put:
 *     tags: [Fines]
 *     summary: Mark a fine as paid
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
 *         description: Fine marked as paid
 *       400:
 *         description: Fine already paid
 *       403:
 *         description: Not your fine
 */
router.put("/:id/pay", protect, payFine);

/**
 * @openapi
 * /api/fines:
 *   get:
 *     tags: [Fines]
 *     summary: "Get all fines — admin view (⚠️ RBAC missing — v2.0.5 me lock hoga)"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All fines with user and book details
 */
router.get("/", protect, getAllFines);

module.exports = router;