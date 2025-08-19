const BlogService = require("../services/BlogService");

// [POST] /api/blogs/create
const createBlog = async (req, res) => {
  try {
    const { title, content, slug } = req.body;
    if (!title || !content || !slug) {
      return res.status(400).json({
        status: "ERR",
        message: "Title, content và slug là bắt buộc",
      });
    }

    const response = await BlogService.create(req.body);

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

// [GET] /api/blogs
const getAllBlogs = async (req, res) => {
  try {
    const response = await BlogService.getAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Lỗi server",
    });
  }
};

// [GET] /api/blogs/:slug
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({
        status: "ERR",
        message: "Slug là bắt buộc",
      });
    }

    const response = await BlogService.getBySlug(slug);

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

// [PUT] /api/blogs/:id
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "Blog ID là bắt buộc",
      });
    }

    const response = await BlogService.update(id, req.body);

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

// [DELETE] /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "Blog ID là bắt buộc",
      });
    }

    const response = await BlogService.remove(id);

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
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
