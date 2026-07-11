const bcrypt = require("bcrypt");
const db = require("../config/db");
const { generateAccessToken } = require("../utils/jwt");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const sql = `
    SELECT
      users.*,
      roles.role_name,
      departments.department_name
    FROM users
    LEFT JOIN roles
      ON users.role_id = roles.id
    LEFT JOIN departments
      ON users.department_id = departments.id
    WHERE users.email = ?
    LIMIT 1
  `;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateAccessToken(user);

    db.query(
      "UPDATE users SET last_login = NOW() WHERE id=?",
      [user.id]
    );

    delete user.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  });
};
// ======================================
// CHANGE PASSWORD
// ======================================

const changePassword = (req, res) => {
  const userId = req.user.id;

  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = req.body;

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New passwords do not match.",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 6 characters.",
    });
  }

  db.query(
    "SELECT password FROM users WHERE id=?",
    [userId],
    async (err, results) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Database error.",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      const user = results[0];

      const match = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!match) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect.",
        });
      }

      const hashedPassword =
        await bcrypt.hash(newPassword, 10);

      db.query(
        "UPDATE users SET password=? WHERE id=?",
        [hashedPassword, userId],
        (err) => {
          if (err) {
            console.error(err);

            return res.status(500).json({
              success: false,
              message: "Database error.",
            });
          }

          res.json({
            success: true,
            message:
              "Password changed successfully.",
          });
        }
      );
    }
  );
};
module.exports = {
  login,
  changePassword,
};