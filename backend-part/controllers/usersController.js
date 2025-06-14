const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Get all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check for duplicate email
    const duplicateCheck = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (duplicateCheck.rows.length > 0) {
      return res.status(409).send("Email already in use");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email",
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Server error");
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    // Check if user exists
    const result = await pool.query(
      "SELECT user_id, username, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("User not found. Please register first.");
    }

    const user = result.rows[0];

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    // Generate JWT token using the JWT_SECRET from .env
    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Log successful login
    console.log("User logged in successfully:", user.email);

    // Send response with token and user info
    res.json({
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error");
  }
};

// Mock forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    // Simulate sending reset email
    res.send(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { getUsers, registerUser, loginUser, forgotPassword };
