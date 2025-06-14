const express = require("express");
const router = express.Router();
const {
  getComments,
  createComment,
} = require("../controllers/commentsController");

// Routes
router.get("/:postId", getComments);
router.post("/", createComment);

module.exports = router;
