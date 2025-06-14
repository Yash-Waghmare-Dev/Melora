const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Get replies for a comment
const getReplies = async (req, res) => {
  const { commentId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM replies WHERE comment_id = $1",
      [commentId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Create a new reply
const createReply = async (req, res) => {
  const { commentId, userId, content } = req.body;
  try {
    await pool.query(
      "INSERT INTO replies (comment_id, user_id, content) VALUES ($1, $2, $3)",
      [commentId, userId, content]
    );
    res.status(201).send("Reply created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { getReplies, createReply };
