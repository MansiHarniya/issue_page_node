const jwt = require("jsonwebtoken");


const verifyManeger = async (req, res, next) => {
  //   console.log(req.user, "here");
  const userRole = req.user[0].userRole;
  if (userRole) {
    if (userRole == "Admin" || userRole=="Manager") {
      next();
    } else {
      res
        .status(401)
        .send({ status: "Fail", message: "You dont have access of It ...." });
    }
  } else {
    res.status(400).send({ status: "Fail", message: "Invadali Access....." });
  }
  //   next();
};
module.exports = verifyManeger;
