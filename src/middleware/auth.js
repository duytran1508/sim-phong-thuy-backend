const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "ERR", message: "Chưa đăng nhập" });
    }

    const token = authHeader.split(" ")[1];

    // Xác thực token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN || "default_secret");
    if (!decoded?.id) {
      return res.status(401).json({ status: "ERR", message: "Token không hợp lệ" });
    }

    // Lấy user từ DB để xác thực vai trò
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ status: "ERR", message: "Người dùng không tồn tại" });
    }

    // Gán thông tin cho request
    req.userId = user._id;
    req.userRole = user.vai_tro; // 0-admin, 1-staff, 2-khách

    next();
  } catch (error) {
    console.error("JWT auth error:", error.message);
    return res.status(401).json({ status: "ERR", message: "Token không hợp lệ hoặc hết hạn" });
  }
};

// Middleware phân quyền: chỉ cho phép admin
const adminOnly = (req, res, next) => {
  if (req.userRole !== 0) {
    return res.status(403).json({ status: "ERR", message: "Chỉ admin mới được phép" });
  }
  next();
};

// Middleware phân quyền: admin hoặc staff
const adminStaffOnly = (req, res, next) => {
  if (![0, 1].includes(req.userRole)) {
    return res.status(403).json({ status: "ERR", message: "Chỉ admin hoặc staff mới được phép" });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminOnly,
  adminStaffOnly,
};
