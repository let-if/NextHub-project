const express=require("express");

const router=express.Router();


const authenticate=require("../middleware/authMiddleware");


const {

createRequest,
getMyRequests,
getAllRequests,
updateRequestStatus


}=require("../controllers/request.controller");





router.post(
"/",
authenticate,
createRequest
);



router.get(
"/my",
authenticate,
getMyRequests
);



router.get(
"/",
authenticate,
getAllRequests
);



router.put(
"/:id/status",
authenticate,
updateRequestStatus
);



module.exports=router;