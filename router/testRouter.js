const express = require("express");

const authToken = require("../middleware/authToken");
const { testConroller  } = require("../controller/testController");

const router = express.Router();

router.get("/test",authToken,testConroller);

module.exports = router;
