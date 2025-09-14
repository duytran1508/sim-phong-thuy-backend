const UserService = require("../services/userService");


// [POST] /api/users/register
const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        status: "ERR",
        message: "Email, password và name là bắt buộc",
      });
    }

    const response = await UserService.register(req.body);

    if (response.status === "ERR") {
      return res.status(400).json(response);
    }

    return res.status(201).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Lỗi server",
    });
  }
};

// [POST] /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "Email và password là bắt buộc",
      });
    }

    const response = await UserService.login(req.body);

    if (response.status === "ERR") {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Lỗi server",
    });
  }
};

// [GET] /api/users
const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Lỗi server",
    });
  }
};

// [GET] /api/users/:id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "User ID là bắt buộc",
      });
    }

    const response = await UserService.getById(id);

    if (response.status === "ERR") {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Lỗi server",
    });
  }
};

// [PUT] /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "User ID là bắt buộc",
      });
    }

    const response = await UserService.update(id, req.body);

    if (response.status === "ERR") {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Lỗi server",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params; // id user cần đổi mật khẩu
    const { oldPassword, newPassword } = req.body;

    const response = await UserService.changePassword(id, oldPassword, newPassword);

    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Lỗi server",
      error: error.message
    });
  }
};


// [DELETE] /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "User ID là bắt buộc",
      });
    }

    const response = await UserService.remove(id);

    if (response.status === "ERR") {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Lỗi server",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
};
