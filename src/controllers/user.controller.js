const prisma = require("../config/prisma");

const VALID_ROLES = ["student", "librarian", "admin"];

// @route  GET /api/admin/users  (librarian/admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  PUT /api/admin/users/:id/role  (admin only)
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !VALID_ROLES.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`,
      });
    }

    // Admin khud apna role change na kar sake
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You cannot change your own role" });
    }

    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers, updateUserRole };