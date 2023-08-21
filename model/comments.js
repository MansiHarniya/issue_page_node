const mongoose = require("mongoose");

const userCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user_EmployID: {
    type: Number,
  },
  postDate: {
    type: Date,
    default: Date.now(),
  },
  lastUpdate: {
    type: Date,
  },
});

module.exports = mongoose.model("comment", userCommentSchema);
