const User = require("../../model/users");
const ObjectId = require("mongoose").Types.ObjectId;


const editeUserController = async (req, res) => {
  console.log("========= editeUserController ======");
  console.log(req.params.ID);
  if (
    !req.body.employee_id &&
    !req.body.name &&
    !req.body.email &&
    !req.body.technology &&
    !req.body.projectmanagername &&
    !req.body.companyname
  ) {
    res.status(500).json({
      status: "Fail",
      message: "Please Enter All Detials..",
    });
  } else if (!ObjectId.isValid(req.params.ID)) {
    res.status(500).json({
      status: "Fail",
      message: "User is Not Valid..",
    });
  } else if (!req.body.name) {
    res.status(500).json({
      status: "Fail",
      message: "Enter name ...",
    });
  } else if (!req.body.employee_id) {
    res.status(500).json({
      status: "Fail",
      message: "Enter employee_id",
    });
  } else if (!req.body.email) {
    res.status(500).json({
      status: "Fail",
      message: "Enter email ...",
    });
  } else if (!req.body.technology) {
    res.status(500).json({
      status: "Fail",
      message: "Enter technology ...",
    });
  } else if (!req.body.projectmanagername) {
    res.status(500).json({
      status: "Fail",
      message: "Enter projectmanagername ...",
    });
  } else if (!req.body.companyname) {
    res.status(500).json({
      status: "Fail",
      message: "Enter companyname ...",
    });
  } else if (!(typeof req.body.employee_id == "number")) {
    res.status(500).json({
      status: "Fail",
      message: "Envalid employee_id..",
    });
  } else {
    User.findById({
      _id: req.params.ID,
    }).then(async (result) => {
      console.log(result);
      //   console.log(String(result[0]._id));

      if (result.email == req.body.email) {
        User.findByIdAndUpdate(
          { _id: String(result._id) },
          {
            $set: {
              employee_id: req.body.employee_id,
              name: req.body.name,
              email: req.body.email,
              technology: req.body.technology,
              projectmanagername: req.body.projectmanagername,
              companyname: req.body.companyname,
            },
          }
        ).then(async (data) => {
          res.status(401).json({
            msg: "User Updated...",
          });
        });
      } else {
        res.status(401).json({
          msg: "Email is miss match from request User..",
        });
      }
    });
  }
};


// const editeManegerController = async (req, res) => {};

module.exports = { editeUserController };
