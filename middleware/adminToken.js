const jwt = require("jsonwebtoken");



const verifyAdmin = async (req, res, next) => {
  //   console.log(req.user, "here");
  const userRole = req.user[0].userRole;
  if (userRole) {
    if (userRole == "Admin") {
      next();
    } else {
      res
        .status(401)
        .send({ status: "Fail", message: "Only Admin User Have Access....." });
    }
  } else {
    res.status(400).send({ status: "Fail", message: "Invadali Access....." });
  }
  //   next();
};
module.exports = verifyAdmin;
