const CustomerRequestService = require("../services/CustomerRequestService");
const User = require ("../models/UserModel")

// POST /api/request-sim
const createRequest = async (req, res) => {
  try {
    const {
      user,                // ObjectId của User (nếu có)
      fullName,
      birthDate,
      cccd,
      sims = [],           // Mảng sim { phoneNumber, usedDurationMonths }
      nhuCau,
      mucTieu = [],        // Mảng mục tiêu chính
      fastResultMethod,    // Kênh nhận kết quả nhanh
      meetingType = "NONE",
      meetingTime = null,
      note = ""
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!fullName || !birthDate || !cccd || !nhuCau || !fastResultMethod) {
      return res.status(400).json({
        status: "ERR",
        message: "Thiếu thông tin bắt buộc: fullName, birthDate, cccd, nhuCau, fastResultMethod",
      });
    }

    // Đảm bảo sims là mảng và đúng cấu trúc
    const simsArray = Array.isArray(sims) ? sims : [];

    const response = await CustomerRequestService.createRequest({
      user: user || null,
      fullName,
      birthDate,
      cccd,
      sims: simsArray,
      nhuCau,
      mucTieu,
      fastResultMethod,
      meetingType,
      meetingTime,
      note
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message || "Lỗi server",
    });
  }
};


// GET /api/request-sim
const getAllRequests = async (req, res) => {
  try {
    const response = await CustomerRequestService.getAllRequests();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const confirmRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await CustomerRequestService.confirmRequest(id);

    if (response.status === "ERR") {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Hoàn tất DONE
const completeRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await CustomerRequestService.completeRequest(id);

    if (response.status === "ERR") {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};


// GET /api/request-sim/:id
const getRequestById = async (req, res) => {
  try {
    const response = await CustomerRequestService.getRequestById(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

// PUT /api/request-sim/:id
const updateRequest = async (req, res) => {
  try {
    const response = await CustomerRequestService.updateRequest(
      req.params.id,
      req.body
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

// DELETE /api/request-sim/:id
const deleteRequest = async (req, res) => {
  try {
    const response = await CustomerRequestService.deleteRequest(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  confirmRequest,
  completeRequest
};
