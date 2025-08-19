const Feedback = require("../models/FeedbackModel");

// Tạo feedback
const create = async (data) => {
  const feedback = new Feedback(data);
  return await feedback.save();
};

// Lấy tất cả feedback
const getAll = async () => {
  return await Feedback.find().populate("userId", "fullName email");
};

// Lấy feedback theo ID
const getById = async (id) => {
  return await Feedback.findById(id).populate("userId", "fullName email");
};

// Cập nhật feedback
const update = async (id, data) => {
  return await Feedback.findByIdAndUpdate(id, data, { new: true });
};

// Xóa feedback
const remove = async (id) => {
  return await Feedback.findByIdAndDelete(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
