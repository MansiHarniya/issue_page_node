const mongoose = require("mongoose");
const user = new mongoose.Schema({
  employee_id: { type: Number, required: true },

  email: { type: String, required: true },
  password: { type: String, required: true },
  technology: { type: String, required: true },
  projectmanagername: { type: String, required: true },
  companyname: { type: String, required: true },
  confirm_password: { type: String, required: true },
});

module.exports = mongoose.model("userlogin", user);
