const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var passwordValidator = require("password-validator");

var schema = new passwordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Password", "Password123"]);
const Admin = require("../../model/users");
// const admin = require("../../model/admin");


const adminLoginController = async (req, res) => {
  console.log("========= adminLoginController ======");
  try {
    if (!req.body.email && !req.body.password) {
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
      Admin.find({ email: req.body.email, userRole: "Admin" })
        .exec()
        .then((admin) => {
          if (admin.length < 1) {
            return res.status(401).json({
              msg: "UserId not exists",
            });
          }
          bcrypt.compare(
            req.body.password,
            admin[0].password,
            (err, result) => {
              if (!result) {
                return res.status(401).json({
                  msg: "Password doesn't matched",
                });
              }
              if (result) {
                const token = jwt.sign(
                  {
                    id: admin[0]._id,
                    admin_email: admin[0].email,
                    role: admin[0].userRole,
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "48h",
                  }
                );
                res.status(200).json({
                  email: admin[0].email,
                  employee_id: admin[0].employee_id,
                  userRole: admin[0].userRole,
                  token: token,
                });
              }
            }
          );
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


const adminRegister = async (req, res) => {
  console.log("========= adminRegister ======");
  if (!req.body.email && !req.body.password) {
    res.status(500).json({
      msg: "Eneter Email and password..",
    });
  } else if (!req.body.email) {
    s;
    res.status(500).json({
      msg: "Eneter Email ..",
    });
  } else if (!req.body.password) {
    res.status(500).json({
      msg: "Eneter Password ..",
    });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    Admin.find({ email: req.body.email })
      .exec()
      .then(async (user) => {
        console.log(user);
        if (user.length >= 1) {
          return res.status(401).json({
            msg: "UserId not exists",
          });
        } else {
          const admin = new Admin({
            email: req.body.email,
            password: hashedPassword,
            userRole: "Admin",
          });
          let result = await admin.save();
          res.send(result);
          console.log(result);
        }
      });
  }
};

module.exports = { adminLoginController, adminRegister };
