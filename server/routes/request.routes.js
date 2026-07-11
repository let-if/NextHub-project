
const express = require("express");

const router = express.Router();


const authenticate = require("../middleware/authMiddleware");


const {

createRequest,

getMyRequests,

getRequestById,

updateRequest,

deleteRequest,

assignRequest,

updateRequestStatus


} = require("../controllers/request.controller");




// ============================
// CREATE REQUEST
// ============================

router.post(
"/",
authenticate,
createRequest
);




// ============================
// GET MY REQUESTS
// ============================

router.get(
"/my",
authenticate,
getMyRequests
);




// ============================
// GET ALL REQUESTS
// ============================

router.get(
"/",
authenticate,
getMyRequests
);




// ============================
// VIEW SINGLE REQUEST
// ============================

router.get(
"/:id",
authenticate,
getRequestById
);




// ============================
// EDIT REQUEST
// ============================

router.put(
"/:id",
authenticate,
updateRequest
);




// ============================
// DELETE REQUEST
// ============================

router.delete(
"/:id",
authenticate,
deleteRequest
);




// ============================
// ASSIGN REQUEST
// ============================

router.put(
"/:id/assign",
authenticate,
assignRequest
);




// ============================
// UPDATE STATUS
// ============================

router.put(
"/:id/status",
authenticate,
updateRequestStatus
);



module.exports = router;