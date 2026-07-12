const db = require("../config/db");


// =====================================
// CREATE NOTIFICATION
// =====================================

const createNotification = ({

user_id,

request_id,

title,

message

})=>{


return new Promise((resolve,reject)=>{


const sql = `

INSERT INTO notifications
(

user_id,

request_id,

title,

message

)

VALUES(?,?,?,?)

`;


db.query(

sql,

[
user_id,
request_id,
title,
message
],

(err,result)=>{


if(err){

return reject(err);

}


resolve(result);


}

);


});


};




// =====================================
// CREATE NOTIFICATIONS FOR DEPARTMENT
// =====================================

const notifyDepartment = (

department_id,

request_id,

requester,

requestTitle

)=>{


return new Promise((resolve,reject)=>{


const sql = `

SELECT

id,

first_name,

last_name

FROM users

WHERE department_id=?

AND status='Active'

`;


db.query(

sql,

[department_id],

async(err,users)=>{


if(err){

return reject(err);

}


try{


for(const user of users){


await createNotification({


user_id:user.id,


request_id,


title:"New Work Request",


message:

`${requester} submitted "${requestTitle}"`


});


}


resolve();


}
catch(error){

reject(error);

}


}


);


});


};
// =====================================
// GET MY NOTIFICATIONS
// =====================================

const getNotifications = (req,res)=>{

const userId = req.user.id;

const sql = `

SELECT

id,
request_id,
title,
message,
is_read,
created_at

FROM notifications

WHERE user_id=?

ORDER BY created_at DESC

`;

db.query(

sql,

[userId],

(err,result)=>{

if(err){

console.log(err);

return res.status(500).json({

success:false,
message:"Database error"

});

}

res.json({

success:true,
notifications:result

});

}

);

};




// =====================================
// MARK AS READ
// =====================================

const markAsRead = (req,res)=>{

const id = req.params.id;

const sql = `

UPDATE notifications

SET is_read=1

WHERE id=?

`;

db.query(

sql,

[id],

(err)=>{

if(err){

console.log(err);

return res.status(500).json({

success:false,
message:"Failed to update notification"

});

}

res.json({

success:true,
message:"Notification marked as read"

});

}

);

};




// =====================================
// MARK ALL AS READ
// =====================================

const markAllRead = (req,res)=>{

const userId = req.user.id;

const sql = `

UPDATE notifications

SET is_read=1

WHERE user_id=?

AND is_read=0

`;

db.query(

sql,

[userId],

(err)=>{

if(err){

console.log(err);

return res.status(500).json({

success:false,
message:"Failed to update notifications"

});

}

res.json({

success:true,
message:"All notifications marked as read"

});

}

);

};




// =====================================
// DELETE NOTIFICATION
// =====================================

const deleteNotification = (req,res)=>{

const id = req.params.id;

const sql = `

DELETE FROM notifications

WHERE id=?

`;

db.query(

sql,

[id],

(err)=>{

if(err){

console.log(err);

return res.status(500).json({

success:false,
message:"Delete failed"

});

}

res.json({

success:true,
message:"Notification deleted"

});

}

);

};




// =====================================
// EXPORTS
// =====================================

module.exports={

createNotification,

notifyDepartment,

getNotifications,

markAsRead,

markAllRead,

deleteNotification

};