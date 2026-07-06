const express = require("express");
const { overview, mostBorrowed, overdue } = require("../controllers/admin.controller");
const { protect } = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Admin Analytics
 *   description: "Dashboard stats (⚠️ RBAC missing — v2.0.5 me admin/librarian lock hoga)"
 */

/**
 * @openapi
 * /api/admin/analytics/overview:
 *   get:
 *     tags: [Admin Analytics]
 *     summary: System overview stats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Aggregated stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBooks:          { type: integer }
 *                 totalUsers:          { type: integer }
 *                 activeBorrows:       { type: integer }
 *                 waitingReservations: { type: integer }
 *                 finesCollected:      { type: number }
 *                 finesPending:        { type: number }
 *                 finesWaived:         { type: number }
 */
router.get("/analytics/overview", protect, overview);

/**
 * @openapi
 * /api/admin/analytics/most-borrowed:
 *   get:
 *     tags: [Admin Analytics]
 *     summary: Top N most borrowed books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: Ranked list of most borrowed books
 */
router.get("/analytics/most-borrowed", protect, mostBorrowed);

/**
 * @openapi
 * /api/admin/analytics/overdue:
 *   get:
 *     tags: [Admin Analytics]
 *     summary: Currently overdue borrows
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overdue borrows with daysOverdue
 */
router.get("/analytics/overdue", protect, overdue);


module.exports = router;