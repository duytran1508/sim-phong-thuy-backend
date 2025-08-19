const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");

// [POST] /api/blog/create
router.post("/create", BlogController.createBlog);

// [GET] /api/blog
router.get("/", BlogController.getAllBlogs);

// [GET] /api/blog/:slug
router.get("/:slug", BlogController.getBlogBySlug);

// [PUT] /api/blog/update/:id
router.put("/update/:id", BlogController.updateBlog);

// [DELETE] /api/blog/delete/:id
router.delete("/delete/:id", BlogController.deleteBlog);

module.exports = router;
