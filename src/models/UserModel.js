const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ho_va_ten: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mat_khau: { type: String, required: true },
  dien_thoai: { type: String },

  // 0: admin, 1: staff, 2: khách
  vai_tro: { type: Number, default: 2 }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;

