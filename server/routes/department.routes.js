const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

// const {

//     getDepartments,
//     getDepartmentById,
//     createDepartment,
//     updateDepartment,
//     deleteDepartment

// } = require("../controllers/department.controller");

// const {

// getDepartments,
// createDepartment,
// getDepartmentById,
// updateDepartment,
// deleteDepartment,
// getDepartmentMembers

// }=require("../controllers/department.controller");
const {

getDepartments,
createDepartment,
getDepartmentById,
updateDepartment,
deleteDepartment,
getDepartmentMembers,
getDepartmentProfile

}=require("../controllers/department.controller");
// ========================================
// GET ALL
// ========================================

router.get(
    "/",
    authenticate,
    getDepartments
);

router.get(
"/:id/profile",
authenticate,
getDepartmentProfile
);
// GET DEPARTMENT MEMBERS

router.get(

"/:id/members",

authenticate,

getDepartmentMembers

);
// ========================================
// GET ONE
// ========================================

router.get(
    "/:id",
    authenticate,
    getDepartmentById
);



// ========================================
// CREATE
// ========================================

router.post(
    "/",
    authenticate,
    createDepartment
);



// ========================================
// UPDATE
// ========================================

router.put(
    "/:id",
    authenticate,
    updateDepartment
);



// ========================================
// DELETE
// ========================================

router.delete(
    "/:id",
    authenticate,
    deleteDepartment
);



module.exports = router;