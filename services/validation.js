const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const signUpBodyValidation = (body) => {
  const schema = joi.object({
    employee_id: joi.number().positive().required(),
    name: joi.string().label("name"),
    email: joi.string().email().required().label("Email"),
    technology: joi.string().required(),
    projectmanagername: joi.string().required(),
    companyname: joi.string().required(),
    password: passwordComplexity().required().label("Password"),
    confirm_password: passwordComplexity().required().label("confirm_password"),
  });
  return schema.validate(body);
};

module.exports = { signUpBodyValidation };
