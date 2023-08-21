const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var valid = require("validator");

const { signUpBodyValidation } = require("../services/validation");

var passwordValidator = require("password-validator");

var schema = new passwordValidator()
  .lowercase()
  .uppercase()
  .digits()
  .symbols()
  .is()
  .max(15)
  .is()
  .min(8); // Define Password schema

/**
 * SignIn Controller For All User...

 */
const signinController = async (req, res) => {
  console.log("========= signinController ======");
  // console.log(req.body);
  const { error } = signUpBodyValidation(req.body);
  // console.log("Helper validation:-", error.details[0].message);

  try {
    if (
      !req.body.employee_id &&
      !req.body.name &&
      !req.body.email &&
      !req.body.password &&
      !req.body.technology &&
      !req.body.projectmanagername &&
      !req.body.companyname &&
      !req.body.confirm_password
    ) {
      res.status(500).json({
        status: "Fail",
        message:
          "Please Enter employee_id, email, password, confirm_password, technology, projectmanagername, companyname",
      });
    } else if (!req.body.employee_id) {
      res.status(500).json({
        status: "Fail",
        message: "Enter employee_id",
      });
    } else if (!req.body.name) {
      res.status(500).json({
        status: "Fail",
        message: "Enter name.",
      });
    } else if (!req.body.email) {
      res.status(500).json({
        status: "Fail",
        message: "Enter Email.",
      });
    } else if (!req.body.password) {
      res.status(500).json({
        status: "Fail",
        message: "Enter password",
      });
    } else if (!req.body.confirm_password) {
      res.status(500).json({
        status: "Fail",
        message: "Enter confirm_password",
      });
    } else if (valid.isEmpty(req.body.technology)) {
      res.status(500).json({
        status: "Fail",
        message: "Enter technology",
      });
    } else if (valid.isEmpty(req.body.projectmanagername)) {
      res.status(500).json({
        status: "Fail",
        message: "Enter projectmanagername",
      });
    } else if (valid.isEmpty(req.body.companyname)) {
      res.status(500).json({
        status: "Fail",
        message: "Enter companyname",
      });
    } else if (!(typeof req.body.employee_id == "number")) {
      res.status(500).json({
        status: "Fail",
        message: "Envalid employee_id..",
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const hashedCPassword = await bcrypt.hash(req.body.confirm_password, 10);
      User.find({
        $or: [{ email: req.body.email }, { employee_id: req.body.employee_id }],
      })
        .exec()
        .then(async (user) => {
          console.log(user);
          if (user.length >= 1) {
            res.status(409).json({ msg: "Account already exists" });
          } else if (!schema.validate(req.body.password)) {
            res.status(409).json({ msg: "Password Is Not valid" });
          } else if (req.body.confirm_password != req.body.password) {
            res.send("password does not matched");
          } else {
            const data = new User({
              employee_id: req.body.employee_id,
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              technology: req.body.technology,
              projectmanagername: req.body.projectmanagername,
              companyname: req.body.companyname,
              confirm_password: hashedCPassword,
            });

            let result = await data.save();
            res.send(result);
            console.log("Here:-", result);
          }
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/**
 * Login Controller For All User...

 */
const loginController = async (req, res) => {
  console.log("========= loginController ======");
  try {
    if (!req.body.email && !req.body.passwords) {
      res.status(500).json({
        status: "Fail",
        message: "Enter email and passwords",
      });
    } else if (!req.body.email) {
      res.status(500).json({
        status: "Fail",
        message: "Enter email",
      });
    } else if (!req.body.password) {
      res.status(500).json({
        status: "Fail",
        message: "Enter password",
      });
    } else {
      User.find({ email: req.body.email })
        .exec()
        .then((user) => {
          if (user.length < 1) {
            return res.status(401).json({
              msg: "User not exists",
            });
          }
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (!result) {
              return res.status(401).json({
                msg: "Password doesn't matched",
              });
            }

            if (result) {
              const token = jwt.sign(
                {
                  id: user[0]._id,
                  employee_id: user[0].employee_id,
                  userRole: user[0].userRole,
                  email: user[0].email,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "48h",
                }
              );
              console.log(token);
              res.status(200).json({
                // user_Id: user[0]._id,
                Employee_Details: user,
                token: token,
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            msg: "Error",
          });
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Fail",
      message: Error,
    });
  }
};

module.exports = { signinController, loginController };
