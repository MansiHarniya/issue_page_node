const jwt = require("jsonwebtoken");
const users = require("../model/users");
const findebyEmployId = require("../services/findfromUser");
const verifyAdmin = require("./adminToken");


const authToken = async (req, res, next) => {
  console.log("========= authToken Middle Ware ======");
  const { authorization } = req.headers;
  try {
    if (authorization) {
      try {
        if (authorization.startsWith("Bearer")) {
          const { employee_id,id } = jwt.verify(
            authorization.split(" ")[1],
            process.env.JWT_KEY
          );
          req.user = await findebyEmployId(id);
          // console.log(req.user);
          next();
        } else {
          const { employee_id,id } = jwt.verify(
            authorization,
            process.env.JWT_KEY
          );
          req.user = await findebyEmployId(id);
          next();
        }
      } catch (error) {
        console.log(error);
        res
          .status(401)
          .send({ status: "Fail", message: "Token Is Invalid ..." });
      }
    } else {
      res.status(401).send({ status: "Fail", message: "Token is empty" });
    }
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .send({ status: "Fail", message: "Something Went Wrong..." });
  }
};

module.exports = authToken;
