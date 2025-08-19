const Blog = require("../models/BlogModel");

// Tạo blog mới
const create = async (data) => {
  try {
    const { title, slug, content } = data;

    if (!title || !slug || !content) {
      return { status: 400, success: false, message: "Thiếu thông tin bắt buộc" };
    }

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return { status: 400, success: false, message: "Slug đã tồn tại" };
    }

    const newBlog = await Blog.create(data);
    return { status: 201, success: true, message: "Tạo blog thành công", data: newBlog };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi tạo blog", error: error.message };
  }
};

// Lấy tất cả blog
const getAll = async () => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return { status: 200, success: true, data: blogs };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi lấy blogs", error: error.message };
  }
};

// Lấy blog theo slug
const getBySlug = async (slug) => {
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return { status: 404, success: false, message: "Không tìm thấy blog" };
    }
    return { status: 200, success: true, data: blog };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi lấy blog", error: error.message };
  }
};

// Cập nhật blog
const update = async (id, data) => {
  try {
    const blog = await Blog.findByIdAndUpdate(id, data, { new: true });
    if (!blog) {
      return { status: 404, success: false, message: "Không tìm thấy blog" };
    }
    return { status: 200, success: true, message: "Cập nhật blog thành công", data: blog };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi cập nhật blog", error: error.message };
  }
};

// Xoá blog
const remove = async (id) => {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return { status: 404, success: false, message: "Không tìm thấy blog" };
    }
    return { status: 200, success: true, message: "Xoá blog thành công", data: blog };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi xoá blog", error: error.message };
  }
};

module.exports = {
  create,
  getAll,
  getBySlug,
  update,
  remove,
};
