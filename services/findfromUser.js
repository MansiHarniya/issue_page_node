const users = require("../model/users");

/**
 * Auth Middleware for Verfiy User Token...
 * @param {String} employee_id
 */
const findebyEmployId = async (employee_id) => {
  console.log("========= findebyEmployId Services ======");
  // console.log(employee_id);
  return await users
    .find({ _id: employee_id })
    .select("-password")
    .select("-confirm_password");
};

module.exports = findebyEmployId;
