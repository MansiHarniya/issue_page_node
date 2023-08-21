const express = require("express");
const User = require("../db/users");
const bcrypt = require("bcrypt");
var passwordValidator = require("password-validator");

const router = express.Router();
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

router.post("/signup", async (req, res) => {
  console.log(req.body);
  // if (condition) {

  // } else {

  // }

  console.log("first", req.body.password);
  // console.log(schema.validate(req.body.password),"rrr")
  User.find({ employee_id: req.body.employee_id })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({ msg: "Account already exists" });
      } else if (req.body.confirm_password != req.body.password) {
        res.send("password does not matched");
      } else if (!schema.validate(req.body.password)) {
        res.status(409).json({ msg: "Something Error" });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: Error,
            });
          } else {
            const user = new User({
              employee_id: req.body.employee_id,
              email: req.body.email,
              password: hash,
              technology: req.body.technology,
              projectmanagername: req.body.projectmanagername,
              companyname: req.body.companyname,
              confirm_password: req.body.confirm_password,
            });

            let result = await user.save();
            res.send(result);
          }
        });
      }
    });
});

module.exports = router;
