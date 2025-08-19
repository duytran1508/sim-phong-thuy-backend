const CustomerRequestService = require("../services/CustomerRequestService");

// POST /api/request-sim
const createRequest = async (req, res) => {
  try {
    const {
      fullName,
      birthDate,
      cccd,
      sims = [],
      nhuCau,
      nhaMang,
      soSim,
      soThich,
    } = req.body;

    if (!fullName || !birthDate || !cccd) {
      return res.status(400).json({
        status: "ERR",
        message: "Thiếu thông tin bắt buộc",
      });
    }

    const response = await CustomerRequestService.createRequest({
      fullName,
      birthDate,
      cccd,
      sims,
      nhuCau,
      nhaMang,
      soSim,
      soThich,
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
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
};
