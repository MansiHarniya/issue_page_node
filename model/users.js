const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employee_id: {
    type: Number,
    // required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: "Test@123",
  },
  confirm_password: {
    type: String,
    default: "Test@123",
    // required: true,
  },
  technology: {
    type: String,
    // required: true,
  },
  teamName: [
    {
      type: String,
      default: "",
    },
  ],
  projectmanagername: {
    type: String,
    // required: true,
  },
  companyname: {
    type: String,
    // required: true,
  },
  userRole: {
    type: String,
    default: "User",
    enu: ["User", "Admin", "Manager", "HR"],
  },
});

module.exports = mongoose.model("users", userSchema);
