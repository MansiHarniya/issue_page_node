const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var valid = require("validator");
const User = require("../../model/users");
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
 * Creat Maneager Controller For Admin User...

 */
const creatManagerController = async (req, res) => {
  
  console.log("========= creatManagerController ======");
  try {
    if (
      !req.body.employee_id &&
      !req.body.name &&
      !req.body.email &&
      !req.body.password &&
      !req.body.technology &&
      !req.body.teamName &&
      !req.body.projectmanagername &&
      !req.body.companyname &&
      !req.body.confirm_password
    ) {
      res.status(500).json({
        status: "Fail",
        message: "All Filed Requier..",
      });
    } else if (!req.body.employee_id) {
      res.status(500).json({
        status: "Fail",
        message: "Enter employee_id...",
      });
    } else if (!req.body.name) {
      res.status(500).json({
        status: "Fail",
        message: "Enter name...",
      });
    } else if (!req.body.email) {
      res.status(500).json({
        status: "Fail",
        message: "Enter Email...",
      });
    } else if (!req.body.password) {
      res.status(500).json({
        status: "Fail",
        message: "Enter Password...",
      });
    } else if (!req.body.technology) {
      res.status(500).json({
        status: "Fail",
        message: "Enter technology...",
      });
    } else if (!req.body.teamName) {
      res.status(500).json({
        status: "Fail",
        message: "Enter teamName...",
      });
    } else if (!req.body.projectmanagername) {
      res.status(500).json({
        status: "Fail",
        message: "Enter projectmanagername...",
      });
    } else if (!req.body.companyname) {
      res.status(500).json({
        status: "Fail",
        message: "Enter companyname...",
      });
    } else if (!req.body.confirm_password) {
      res.status(500).json({
        status: "Fail",
        message: "Enter confirm_password...",
      });
    } else if (!(typeof req.body.employee_id == "number")) {
      res.status(500).json({
        status: "Fail",
        message: "Envalid employee_id..",
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const hashedCPassword = await bcrypt.hash(req.body.confirm_password, 10);
      User.find({ email: req.body.email })
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
              teamName: req.body.teamName,
              companyname: req.body.companyname,
              confirm_password: hashedCPassword,
              userRole: "Manager",
            });

            let result = await data.save();
            res.send(result);
            console.log("New Maneger:-", result);
          }
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      Error: error,
    });
  }
};

/**
 * Get Maneager Controller For Admin User...

 */
const getmanaegerController = async (req, res) => {
  console.log("========= getmanaegerController ======");
  User.find({ userRole: "Manager" }).then((result) => {
    res.status(200).json({
      Manaeges: result,
    });
  });
};

/**
 * Get User Controller For Admin User...

 */
const getUserController = async (req, res) => {
  console.log("========= getUserController ======");
  User.find({ userRole: "User" }).then((result) => {
    res.status(200).json({
      Users: result,
    });
  });
};

/**
 * User Proflile Controller For All User...

 */
const getprofile = async (req, res) => {
  console.log("========= getprofile ======");
  // console.log("requser", req.user[0]._id);
  User.find({ _id: req.user[0]._id }).then((result) => {
    res.status(200).json({
      Users: result,
    });
  });
};

/**
 * Delete User Controller For Admin User...

 */
const deleteUser = async (req, res) => {
  console.log("========= getprofile ======");
  try {
    if (!req.body.email) {
      res.status(500).json({
        status: "Fail",
        Message: "Please Enter email",
      });
    } else {
      User.find({ email: req.body.email }).then(async (result) => {
        // console.log(result);
        if (result.length < 1) {
          res.status(500).json({
            status: "Fail",
            Message: "User Not Available...",
          });
        } else {
          const deleteUser = await User.findByIdAndDelete({
            _id: result[0]._id,
          });
          console.log(deleteUser);
          res.status(200).json({
            status: "Success",
            Message: result,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      Error: error,
    });
  }
};

module.exports = {
  creatManagerController,
  getmanaegerController,
  getUserController,
  getprofile,
  deleteUser,
};
