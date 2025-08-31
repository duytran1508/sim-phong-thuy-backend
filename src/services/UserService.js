const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

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

    return { status: 200, success: true, message: "Đăng nhập thành công", data: user };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi đăng nhập", error: error.message };
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
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Chỉ cho phép update một số field nhất định
    const allowedFields = ["name", "email", "password", "phone"];
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
    return { status: 200, success: true, message: "Cập nhật thành công", data: user };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi cập nhật", error: error.message };
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

module.exports = {
  register,
  login,
  getAll,
  getById,
  update,
  remove,
};
