const CustomerRequest = require("../models/CustomerRequestModel");

// Validate số điện thoại cơ bản
const isValidPhoneNumber = (phone) => /^0\d{9,10}$/.test(phone);

const createRequest = async (data, userId = null) => {
  try {
    const { fullName, birthDate, cccd, sims = [], nhuCau, mucTieu = [], fastResultMethod, meetingType, meetingTime, note } = data;

    // Check ít nhất 1 mục tiêu
    if (!mucTieu.length) {
      return { status: 400, success: false, message: "Vui lòng chọn ít nhất một mục tiêu." };
    }

    // Validate sims
    for (let s of sims) {
      if (!isValidPhoneNumber(s.phoneNumber)) {
        return { status: 400, success: false, message: `Số điện thoại không hợp lệ: ${s.phoneNumber}` };
      }
    }

    const newRequest = new CustomerRequest({
      user: userId || null,
      fullName,
      birthDate,
      cccd,
      sims,
      nhuCau,
      mucTieu,
      fastResultMethod,
      meetingType: meetingType || "NONE",
      meetingTime: meetingTime || null,
      note: note || ""
    });

    await newRequest.save();

    return { status: 201, success: true, message: "Tạo yêu cầu luận sim thành công.", data: newRequest };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi tạo yêu cầu luận sim", error: error.message };
  }
};

// Lấy tất cả yêu cầu
const getAllRequests = async () => {
  try {
    const requests = await CustomerRequest.find().populate("user", "ho_va_ten email");
    return { status: 200, success: true, data: requests };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi lấy yêu cầu", error: error.message };
  }
};

// Lấy chi tiết theo id
const getRequestById = async (id) => {
  try {
    const request = await CustomerRequest.findById(id).populate("user", "ho_va_ten email");
    if (!request) {
      return { status: 404, success: false, message: "Không tìm thấy yêu cầu" };
    }
    return { status: 200, success: true, data: request };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi lấy chi tiết yêu cầu", error: error.message };
  }
};

// Cập nhật yêu cầu
const updateRequest = async (id, data) => {
  try {
    const request = await CustomerRequest.findByIdAndUpdate(id, data, { new: true });
    if (!request) {
      return { status: 404, success: false, message: "Không tìm thấy yêu cầu" };
    }
    return { status: 200, success: true, message: "Cập nhật thành công", data: request };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi cập nhật yêu cầu", error: error.message };
  }
};

// Xoá yêu cầu
const deleteRequest = async (id) => {
  try {
    const request = await CustomerRequest.findByIdAndDelete(id);
    if (!request) {
      return { status: 404, success: false, message: "Không tìm thấy yêu cầu" };
    }
    return { status: 200, success: true, message: "Xoá yêu cầu thành công", data: request };
  } catch (error) {
    return { status: 500, success: false, message: "Lỗi khi xoá yêu cầu", error: error.message };
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest
};
