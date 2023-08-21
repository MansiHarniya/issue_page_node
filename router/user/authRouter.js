const express = require("express");
const {
  signinController,
  loginController,
} = require("../../controller/authController");

const { getIssueController } = require("../../controller/user/userPublic");

const router = express.Router();

router.post("/signup", signinController);
router.post("/login", loginController);
router.get("/getIssues/:page&:limit", getIssueController);

module.exports = router;
