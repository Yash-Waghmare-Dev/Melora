const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Get comments for a post
const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1",
      [postId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Create a new comment
const createComment = async (req, res) => {
  const { postId, userId, content } = req.body;
  try {
    await pool.query(
      "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)",
      [postId, userId, content]
    );
    res.status(201).send("Comment created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { getComments, createComment };
