const express = require("express");

// Middlewares..
const verifyAdmin = require("../../middleware/adminToken");
const verifyManeger = require("../../middleware/manegerToken");
const authToken = require("../../middleware/authToken");

const {
  adminLoginController,
  adminRegister,
} = require("../../controller/admin/adminAuth");

const {
  creatManagerController,
  getmanaegerController,
  getUserController,
  getprofile,
  deleteUser,
} = require("../../controller/admin/mange");

const { editeUserController } = require("../../controller/admin/manageUser");

const router = express.Router();

router.post("/adminRegister", adminRegister);
router.post("/adminLogin", adminLoginController);

router.post("/creatManaeger", authToken, verifyAdmin, creatManagerController);
router.post("/deleteUser", authToken, verifyAdmin, deleteUser);
router.get("/getManaeger", authToken, verifyAdmin, getmanaegerController);
router.get("/getUser", authToken, verifyAdmin, getUserController);
router.get("/profile", authToken, getprofile);

router.post("/user/edite/:ID", authToken, verifyManeger, editeUserController);
router.post("/maneger/edite/:ID", authToken, verifyAdmin, editeUserController);

module.exports = router;
