const User = require("../model/users");

const { passIncrypt, validpassword } = require("../services/helper");

const updateselfpassword = async (req, res) => {
  console.log("=== updateself ===");
  validpassword(req.body.password);
  try {
    if (!req.body.password && !req.body.confirm_password) {
      res.status(500).json({
        status: "Fail",
        message: "All Fileds requierd...",
      });
    } else if (!req.body.password) {
      res.status(500).json({
        status: "Fail",
        message: "Please Enter Password...",
      });
    } else if (!req.body.confirm_password) {
      res.status(500).json({
        status: "Fail",
        message: "Please Enter Conform Password...",
      });
    } else {
      const password = await passIncrypt(req.body.password);
      const cpassword = await passIncrypt(req.body.confirm_password);
      const updatepassword = await User.findByIdAndUpdate(
        {
          _id: req.user[0]._id,
        },
        {
          $set: { password: password, confirm_password: cpassword },
        }
      );
      console.log("Update Password user :- ", updatepassword);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: "Something Went Wrong...",
    });
  }
};

module.exports = { updateselfpassword };
