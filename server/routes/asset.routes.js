
const express = require("express");

const router = express.Router();

const authenticate =
require("../middleware/authMiddleware");

const uploadAsset =
require("../middleware/uploadAsset");


const {

getAssets,
getAssetById,
createAsset,
updateAsset,
deleteAsset,
assignAsset,
returnAsset,
getAssetHistory,
getEmployees

}=require("../controllers/asset.controller");





// GET ALL ASSETS

router.get(
"/",
authenticate,
getAssets
);




// CREATE ASSET

router.post(
"/",
authenticate,
uploadAsset.single("asset_image"),
createAsset
);




// GET EMPLOYEES FOR ASSIGNMENT
// MUST BE BEFORE /:id

router.get(
"/employees",
authenticate,
getEmployees
);




// GET SINGLE ASSET

router.get(
"/:id",
authenticate,
getAssetById
);




// UPDATE ASSET

router.put(
"/:id",
authenticate,
uploadAsset.single("asset_image"),
updateAsset
);




// DELETE ASSET

router.delete(
"/:id",
authenticate,
deleteAsset
);




// ASSIGN ASSET

router.post(
"/:id/assign",
authenticate,
assignAsset
);




// RETURN ASSET

router.post(
"/:id/return",
authenticate,
returnAsset
);




// HISTORY

router.get(
"/:id/history",
authenticate,
getAssetHistory
);



module.exports=router;