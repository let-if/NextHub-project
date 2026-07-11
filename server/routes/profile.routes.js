
const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


const {
    getProfile,
    updateProfileImage,
    changePassword
}=require("../controllers/profile.controller");




// ===============================
// GET PROFILE
// ===============================

router.get(
    "/profile",
    authenticate,
    getProfile
);




// ===============================
// UPDATE IMAGE
// ===============================

router.put(

    "/profile/image",

    authenticate,

    upload.single("profile_image"),

    updateProfileImage

);




// ===============================
// CHANGE PASSWORD
// ===============================

router.put(

    "/profile/password",

    authenticate,

    changePassword

);



module.exports = router;