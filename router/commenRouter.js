const express = require("express");
const { updateselfpassword } = require("../controller/commonController");
// import authToken
const authToken = require("../middleware/authToken");

const router = express.Router();

router.post("/updatePassword", authToken, updateselfpassword);

module.exports = router;
