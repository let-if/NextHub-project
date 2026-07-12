const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {

getNotifications,

markAsRead,

markAllRead,

deleteNotification

} = require("../controllers/notification.controller");



// =====================================
// GET MY NOTIFICATIONS
// =====================================

router.get(
"/",
authenticate,
getNotifications
);



// =====================================
// MARK SINGLE NOTIFICATION AS READ
// =====================================

router.put(
"/:id/read",
authenticate,
markAsRead
);



// =====================================
// MARK ALL NOTIFICATIONS AS READ
// =====================================

router.put(
"/read-all",
authenticate,
markAllRead
);



// =====================================
// DELETE NOTIFICATION
// =====================================

router.delete(
"/:id",
authenticate,
deleteNotification
);



module.exports = router;