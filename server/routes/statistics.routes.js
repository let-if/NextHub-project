// const express=require("express");

// const router=express.Router();

// const authenticate =
// require("../middleware/authMiddleware");


// const {
// getStatistics
// }=require("../controllers/statistics.controller");



// router.get(
// "/",
// authenticate,
// getStatistics
// );



// module.exports=router;
const express = require("express");

const router = express.Router();

const authenticate =
require("../middleware/authMiddleware");


const {
    getStatistics
} = require("../controllers/statistics.controller");



// GET SYSTEM STATISTICS

router.get(
    "/",
    authenticate,
    getStatistics
);



module.exports = router;