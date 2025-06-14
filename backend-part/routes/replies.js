const express = require("express");
const router = express.Router();
const { getReplies, createReply } = require("../controllers/repliesController");

// Routes
router.get("/:commentId", getReplies);
router.post("/", createReply);

module.exports = router;
