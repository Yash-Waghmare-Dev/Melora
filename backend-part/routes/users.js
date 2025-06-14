const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  loginUser,
  registerUser,
  forgotPassword,
} = require("../controllers/usersController");
const authenticateToken = require("../middleware/authMiddleware");
const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Routes
router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/profile", authenticateToken, (req, res) => {
  res.send(`Welcome, user ${req.user.id}`);
});
router.get("/test-schema", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1",
      ["users"]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching schema");
  }
});

// Add test route to verify stored hash
router.post("/verify-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Get user's hashed password from database
    const result = await pool.query(
      "SELECT password_hash FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const hashedPassword = result.rows[0].password_hash;
    console.log("Stored hash:", hashedPassword);
    console.log("Comparing with password:", password);

    // Compare password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("Password match result:", isMatch);

    res.json({
      match: isMatch,
      message: isMatch ? "Password matches" : "Password does not match",
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
