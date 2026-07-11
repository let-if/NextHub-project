const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  getDashboard,
} = require("../controllers/dashboard.controller");

router.get("/", authenticate, getDashboard);

module.exports = router;