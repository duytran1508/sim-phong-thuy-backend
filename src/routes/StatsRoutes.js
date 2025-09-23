const express = require("express");
const router = express.Router();
const { authMiddleware, adminOnly } = require("../middleware/auth");
const { getDashboardStats } = require("../controllers/StatsController");

// Chỉ admin mới truy cập được
router.get("/dashboard", getDashboardStats);

module.exports = router;
