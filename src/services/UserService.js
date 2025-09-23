const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Đăng ký
const register = async (data) => {
  try {
    console.log("data", data)
    const { name, password, email } = data;

    const existing = await User.findOne({ email });
    if (existing) {
      return { status: 400, success: false, message: "Email đã tồn tại" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { status: 201, success: true, message: "Đăng ký thành công", data: newUser };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi đăng ký", error: error.message };
  }
};

// Đăng nhập
const login = async (data) => {
  try {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      return { status: 404, success: false, message: "Không tìm thấy user" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, success: false, message: "Sai mật khẩu" };
    }

    // Tạo access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.vai_tro },
      process.env.ACCESS_TOKEN,        // secret
      { expiresIn: "1d" }              // thời gian hết hạn
    );    

    // (optional) tạo refresh token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN,       // dùng secret riêng
      { expiresIn: "7d" }
    );    

    return {
      status: 200,
      success: true,
      message: "Đăng nhập thành công",
      data: {
        user,
        accessToken,
        refreshToken, // nếu cần
      },
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Lỗi khi đăng nhập",
      error: error.message,
    };
  }
};

// Lấy tất cả user
const getAll = async () => {
  try {
    const users = await User.find();
    return { status: 200, success: true, data: users };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi lấy users", error: error.message };
  }
};

// Lấy user theo id
const getById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { status: 404, success: false, message: "Không tìm thấy user" };
    }
    return { status: 200, success: true, data: user };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi lấy user", error: error.message };
  }
};

// Cập nhật user
const update = async (id, data) => {
  try {
    const allowedFields = ["name", "email", "phone"];
    const updateData = {};

    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updateData[key] = data[key];
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    if (!user) {
      return { status: 404, success: false, message: "Không tìm thấy user" };
    }
    return { status: 200, success: true, message: "Cập nhật thông tin thành công", data: user };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi cập nhật thông tin", error: error.message };
  }
};

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { status: 404, success: false, message: "Không tìm thấy user" };
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return { status: 400, success: false, message: "Mật khẩu cũ không đúng" };
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { status: 200, success: true, message: "Đổi mật khẩu thành công" };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi đổi mật khẩu", error: error.message };
  }
};

// Xoá user
const remove = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return { status: 404, success: false, message: "Không tìm thấy user" };
    }
    return { status: 200, success: true, message: "Xoá thành công", data: user };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi xoá user", error: error.message };
  }
};

// Cập nhật vai trò
const updateRole = async (id, role) => {
  try {
    if (![0, 1, 2].includes(role)) {
      return { status: 400, success: false, message: "Vai trò không hợp lệ" };
    }

    const user = await User.findByIdAndUpdate(
      id,
      { vai_tro: role },
      { new: true }
    ).select("-password");

    if (!user) {
      return { status: 404, success: false, message: "Không tìm thấy user" };
    }

    return { status: 200, success: true, message: "Cập nhật vai trò thành công", data: user };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi cập nhật vai trò", error: error.message };
  }
};

module.exports = {
  register,
  login,
  getAll,
  getById,
  update,
  remove,
  changePassword,
  updateRole
};
