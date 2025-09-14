const express = require("express");
const router = express.Router();
const CustomerRequestController = require("../controllers/CustomerRequestController");
const { authMiddleware, adminStaffOnly } = require("../middleware/auth");

// POST /api/request-sim/create: khách chưa đăng nhập vẫn tạo được, nếu có token thì gán userId
router.post("/create", CustomerRequestController.createRequest);

// GET /api/request-sim/getAll: chỉ admin/staff mới được xem
router.get("/getAll",  CustomerRequestController.getAllRequests);

// GET /api/request-sim/get-details/:id: chỉ admin/staff mới được xem
router.get("/get-details/:id", authMiddleware, adminStaffOnly, CustomerRequestController.getRequestById);

// PUT /api/request-sim/update/:id: chỉ admin/staff mới được cập nhật
router.put("/update/:id",  CustomerRequestController.updateRequest);

// Xác nhận yêu cầu
router.put("/confirm/:id", CustomerRequestController.confirmRequest);

// Hoàn tất yêu cầu
router.put("/complete/:id", CustomerRequestController.completeRequest);

// DELETE /api/request-sim/delete/:id: chỉ admin/staff mới được xóa
router.delete("/delete/:id", CustomerRequestController.deleteRequest);

module.exports = router;
