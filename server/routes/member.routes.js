
const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");


const {

getMembers,
createMember,
getMemberById,
updateMember,
deleteMember,
updateProfileImage

} = require("../controllers/member.controller");




// GET ALL MEMBERS

router.get(
"/",
authenticate,
getMembers
);




// CREATE MEMBER

router.post(
"/",
authenticate,
upload.single("profile_image"),
createMember
);




// GET SINGLE MEMBER

router.get(
"/:id",
authenticate,
getMemberById
);




// UPDATE MEMBER

router.put(
"/:id",
authenticate,
upload.single("profile_image"),
updateMember
);




// UPLOAD PROFILE PHOTO ONLY

router.post(
"/:id/photo",
authenticate,
upload.single("profile_image"),
updateProfileImage
);




// DELETE MEMBER

router.delete(
"/:id",
authenticate,
deleteMember
);



module.exports = router;