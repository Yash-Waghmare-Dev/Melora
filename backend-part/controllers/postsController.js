const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Get all posts
const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { userId, content } = req.body;
  try {
    await pool.query("INSERT INTO posts (user_id, content) VALUES ($1, $2)", [
      userId,
      content,
    ]);
    res.status(201).send("Post created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { getPosts, createPost };
