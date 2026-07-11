
const express = require("express");

const router = express.Router();

const authenticate =
require("../middleware/authMiddleware");

const {
login,
changePassword
}=require("../controllers/auth.controller");



// ==============================
// LOGIN
// ==============================

router.post(
"/login",
login
);



// ==============================
// CHANGE PASSWORD
// ==============================

router.put(
"/change-password",
authenticate,
changePassword
);



module.exports = router;