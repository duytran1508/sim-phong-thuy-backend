const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/FeedbackController");
const { authMiddleware, adminStaffOnly } = require("../middleware/auth");

// POST /api/feedback/create: tạo feedback (có thể thêm authMiddleware nếu muốn bắt login)
router.post("/create", FeedbackController.createFeedback);

// GET /api/feedback/getAll: chỉ admin/staff mới được xem tất cả feedback
router.get("/getAll", FeedbackController.getAllFeedback);

// GET /api/feedback/get-details/:id: chỉ admin/staff mới được xem chi tiết
router.get("/get-details/:userId", FeedbackController.getFeedbackById);
// PUT /api/feedback/update/:id: chỉ admin/staff mới được cập nhật
router.put("/update/:id", authMiddleware, adminStaffOnly, FeedbackController.updateFeedback);

// DELETE /api/feedback/delete/:id: chỉ admin/staff mới được xóa
router.delete("/delete/:id", authMiddleware, adminStaffOnly, FeedbackController.deleteFeedback);

module.exports = router;
