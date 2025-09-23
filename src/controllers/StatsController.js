const Feedback = require("../models/FeedbackModel");
const Blog = require("../models/BlogModel");
const CustomerRequest = require("../models/CustomerRequestModel");

// Helper: gom dữ liệu theo thời gian
const groupByTime = (items, period = "month") => {
  const result = {};
  items.forEach(item => {
    const date = new Date(item.createdAt);
    let key = "";

    switch (period) {
      case "week":
        const week = Math.ceil(date.getDate() / 7);
        key = `Tuần ${week}`;
        break;
      case "month":
        key = `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;
        break;
      case "year":
        key = `${date.getFullYear()}`;
        break;
    }

    result[key] = (result[key] || 0) + 1;
  });

  return Object.entries(result).map(([label, count]) => ({ label, count }));
};

// Lấy thống kê cho dashboard
const getDashboardStats = async (req, res) => {
  try {
    const [feedbacks, blogs, forms] = await Promise.all([
      Feedback.find().lean(),
      Blog.find().lean(),
      CustomerRequest.find().lean()
    ]);

    const periods = ["week", "month", "year"];
    const stats = {};

    periods.forEach(period => {
      const feedbackData = groupByTime(feedbacks, period);
      const blogData = groupByTime(blogs, period);
      const formData = groupByTime(forms, period);

      const labels = new Set([
        ...feedbackData.map(f => f.label),
        ...blogData.map(b => b.label),
        ...formData.map(f => f.label)
      ]);

      stats[period] = Array.from(labels).map(label => ({
        label,
        feedback: feedbackData.find(f => f.label === label)?.count || 0,
        blogs: blogData.find(b => b.label === label)?.count || 0,
        forms: formData.find(f => f.label === label)?.count || 0
      }));
    });

    res.json({ status: 200, success: true, data: stats });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ status: 500, success: false, message: "Lỗi khi lấy thống kê", error: err.message });
  }
};

module.exports = { getDashboardStats };
