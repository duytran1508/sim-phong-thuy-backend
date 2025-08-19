const mongoose = require("mongoose");

// Schema con: thông tin sim đang dùng
const simUsingSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, trim: true },
  usedDurationMonths: { type: Number, default: 0, min: 0 }
}, { _id: false });

// Schema chính: yêu cầu luận sim
const customerRequestSchema = new mongoose.Schema({
  // Liên kết với User (nếu khách đã có tài khoản)
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

  // Thông tin cá nhân
  fullName: { type: String, required: true, trim: true },
  birthDate: { type: Date, required: true },
  cccd: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/^\d{12}$/, "CCCD phải gồm 12 số"] // validate cơ bản
  },

  // Thông tin sim hiện tại
  sims: { type: [simUsingSchema], default: [] },

  // Nhu cầu
  nhuCau: { 
    type: String,
    enum: ["XEM_SIM", "THIET_KE_SIM_MOI"],
    required: true
  },

  // Mục tiêu chính (có thể chọn nhiều)
  mucTieu: {
    type: [String],
    enum: ["KINH_DOANH_CONG_VIEC", "TINH_DUYEN_GIA_DAO", "TAI_LOC_MAY_MAN"],
    default: []
  },

  // Cách nhận kết quả nhanh (1 kênh)
  fastResultMethod: {
    type: String,
    enum: ["ZALO", "SMS", "EMAIL"],
    required: true
  },

  // Đặt lịch (nếu có)
  meetingType: { type: String, enum: ["ZOOM", "NONE"], default: "NONE" },
  meetingTime: { type: Date, default: null },

  // Trạng thái xử lý
  status: { 
    type: String, 
    enum: ["PENDING", "CONFIRMED", "DONE"], 
    default: "PENDING" 
  },

  // Ghi chú nội bộ
  note: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("CustomerRequest", customerRequestSchema, "customer_requests");
