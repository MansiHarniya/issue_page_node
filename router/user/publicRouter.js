const express = require("express");
const {
  getIssueController,
  commentController,
  insertCommentController,
  updateCommentController,
  insertIssueController,
  updateIssueController,
} = require("../../controller/user/userPublic");

// import authToken
const authToken = require("../../middleware/authToken");

const router = express.Router();

router.get("/issues", authToken, getIssueController);
router.get("/issues/:page&:limit", authToken, getIssueController);
router.get("/issues/:id", authToken, getIssueController);
router.get("/comments", authToken, commentController);
router.get("/comments/:id", authToken, commentController);

router.post("/issues", authToken, insertIssueController);
router.post("/comments", authToken, insertCommentController);
router.post("/comments/edit/:id", authToken, updateCommentController);
router.post("/issues/edit/:id", authToken, updateIssueController);

module.exports = router;
