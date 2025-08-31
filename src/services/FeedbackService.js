const Feedback = require("../models/FeedbackModel");

// Tạo feedback
const create = async (data) => {
  try {
    const feedback = new Feedback(data);
    const savedFeedback = await feedback.save();
    return { status: 201, success: true, data: savedFeedback };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi tạo feedback", error: error.message };
  }
};

// Lấy tất cả feedback
const getAll = async () => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "fullName email");
    return { status: 200, success: true, data: feedbacks };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi lấy danh sách feedback", error: error.message };
  }
};

// Lấy feedback theo ID
const getById = async (id) => {
  try {
    const feedback = await Feedback.findById(id).populate("userId", "fullName email");
    if (!feedback) {
      return { status: 404, success: false, message: "Không tìm thấy feedback" };
    }
    return { status: 200, success: true, data: feedback };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi lấy feedback", error: error.message };
  }
};

// Cập nhật feedback
const update = async (id, data) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, data, { new: true });
    if (!updatedFeedback) {
      return { status: 404, success: false, message: "Không tìm thấy feedback để cập nhật" };
    }
    return { status: 200, success: true, data: updatedFeedback };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi cập nhật feedback", error: error.message };
  }
};

// Xóa feedback
const remove = async (id) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return { status: 404, success: false, message: "Không tìm thấy feedback để xóa" };
    }
    return { status: 200, success: true, message: "Xóa feedback thành công" };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi xóa feedback", error: error.message };
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
