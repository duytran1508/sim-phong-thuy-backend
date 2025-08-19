const FeedbackService = require("../services/FeedbackService");

// [POST] /api/feedback
const createFeedback = async (req, res) => {
  try {
    const { userId, content, rating } = req.body;
    if (!userId || !content || !rating) {
      return res.status(400).json({
        status: "ERR",
        message: "userId, content và rating là bắt buộc",
      });
    }

    const response = await FeedbackService.create({ userId, content, rating });

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

// [GET] /api/feedback
const getAllFeedback = async (req, res) => {
  try {
    const response = await FeedbackService.getAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Lỗi server",
    });
  }
};

// [GET] /api/feedback/:id
const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "Feedback ID là bắt buộc",
      });
    }

    const response = await FeedbackService.getById(id);

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

// [PUT] /api/feedback/:id
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "Feedback ID là bắt buộc",
      });
    }

    const { content, rating } = req.body;
    if (!content && !rating) {
      return res.status(400).json({
        status: "ERR",
        message: "Cần có content hoặc rating để cập nhật",
      });
    }

    const response = await FeedbackService.update(id, { content, rating });

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

// [DELETE] /api/feedback/:id
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "Feedback ID là bắt buộc",
      });
    }

    const response = await FeedbackService.remove(id);

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

module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
