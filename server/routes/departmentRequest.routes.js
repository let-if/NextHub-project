const express=require("express");

const router=express.Router();


const authenticate =
require("../middleware/authMiddleware");


const {

getDepartmentRequests,
updateRequestStatus

}=require("../controllers/departmentRequest.controller");




// GET REQUESTS

router.get(

"/",

authenticate,

getDepartmentRequests

);




// UPDATE STATUS

router.put(

"/:id/status",

authenticate,

updateRequestStatus

);



module.exports=router;