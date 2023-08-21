const bcrypt = require("bcrypt");
var valid = require("validator");

const passIncrypt = async (value) => {
  const encrption = bcrypt.hash(value, 10);
  return encrption;
};

const validpassword = async (value) => {
  var passwordValidator = require("password-validator");

  var schema = new passwordValidator()
    .lowercase()
    .uppercase()
    .digits()
    .symbols()
    .is()
    .max(15)
    .is()
    .min(8);
  const valid = schema.validate(value);
  console.log("valid :- ", valid);
  return Promise.resolve({ valid });
};




module.exports = { passIncrypt, validpassword };
