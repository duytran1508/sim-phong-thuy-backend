const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  summary: { type: String, default: "" },
  content: { type: String, required: true }, // HTML/Markdown
  coverImageUrl: { type: String, default: "" },
  tags: { type: [String], default: [] },
  author: { type: String, default: "Admin" },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema, "blogs");
