

// const db = require("../config/db");
// const bcrypt = require("bcrypt");

// const path = require("path");


// const addActivity=(user_id,action,module)=>{


// db.query(

// `
// INSERT INTO activities
// (
// user_id,
// action,
// module
// )

// VALUES(?,?,?)
// `,

// [
// user_id,
// action,
// module
// ]


// );


// };

// // ================================
// // GET ALL MEMBERS
// // ================================

// const getMembers = (req,res)=>{


// const {
//     search,
//     department,
//     role
// }=req.query;



// let sql = `

// SELECT

// u.id,
// u.employee_id,
// u.first_name,
// u.last_name,
// u.email,
// u.phone,
// u.status,
// u.profile_image,

// r.role_name,

// d.department_name


// FROM users u


// LEFT JOIN roles r
// ON u.role_id=r.id


// LEFT JOIN departments d
// ON u.department_id=d.id


// WHERE 1=1

// `;



// let values=[];



// if(search){


// sql += `

// AND (

// u.first_name LIKE ?
// OR
// u.last_name LIKE ?
// OR
// u.email LIKE ?
// OR
// u.employee_id LIKE ?

// )

// `;


// const value=`%${search}%`;


// values.push(
// value,
// value,
// value,
// value
// );


// }



// if(department){


// sql += `

// AND d.department_name=?

// `;

// values.push(department);


// }




// if(role){


// sql += `

// AND r.role_name=?

// `;

// values.push(role);


// }



// sql += ` ORDER BY u.id DESC`;




// db.query(

// sql,

// values,

// (err,results)=>{


// if(err){

// return res.status(500).json({

// success:false,

// message:"Database error"

// });

// }



// res.json({

// success:true,

// members:results

// });


// }


// );



// };







// // ================================
// // CREATE MEMBER
// // ================================


// const createMember = async(req,res)=>{


// try{


// const {

// first_name,
// last_name,
// email,
// phone,
// password,
// role_id,
// department_id

// }=req.body;




// if(
// !first_name ||
// !last_name ||
// !email ||
// !password ||
// !role_id
// ){


// return res.status(400).json({

// success:false,

// message:"Required fields missing"

// });


// }






// // Generate Employee ID


// const employeeSQL=`

// SELECT employee_id

// FROM users

// ORDER BY id DESC

// LIMIT 1

// `;



// db.query(

// employeeSQL,

// [],

// async(err,result)=>{


// if(err){

// return res.status(500).json({

// message:"Employee ID generation error"

// });

// }



// let nextNumber=1;



// if(result.length>0){


// const lastID=result[0].employee_id;


// nextNumber=
// parseInt(lastID.replace("EMP",""))
// +1;


// }




// const employee_id =
// "EMP"+String(nextNumber).padStart(3,"0");







// const hashedPassword =
// await bcrypt.hash(password,10);





// // image path

// let profile_image=null;


// if(req.file){

// profile_image =
// req.file.path.replaceAll("\\","/");

// }







// const insertSQL=`

// INSERT INTO users

// (

// employee_id,
// first_name,
// last_name,
// email,
// phone,
// password,
// role_id,
// department_id,
// profile_image

// )

// VALUES(?,?,?,?,?,?,?,?,?)

// `;




// db.query(

// insertSQL,

// [

// employee_id,

// first_name,

// last_name,

// email,

// phone || null,

// hashedPassword,

// role_id,

// department_id || null,

// profile_image

// ],


// (err)=>{


// if(err){

// console.log(err);


// return res.status(500).json({

// success:false,

// message:"Creating employee failed"

// });


// }




// res.status(201).json({

// success:true,

// message:"Employee created successfully",

// employee_id

// });



// }



// );



// }



// );



// }
// catch(error){


// res.status(500).json({

// success:false,

// message:error.message

// });


// }



// };









// // ================================
// // GET SINGLE MEMBER
// // ================================


// const getMemberById=(req,res)=>{


// const id=req.params.id;



// const sql=`

// SELECT


// u.id,
// u.employee_id,
// u.first_name,
// u.last_name,
// u.email,
// u.phone,
// u.status,
// u.profile_image,
// u.created_at,

// u.role_id,
// u.department_id,


// r.role_name,

// d.department_name


// FROM users u


// LEFT JOIN roles r

// ON u.role_id=r.id



// LEFT JOIN departments d

// ON u.department_id=d.id



// WHERE u.id=?


// `;



// db.query(

// sql,

// [id],

// (err,result)=>{


// if(err){

// console.log(err);


// return res.status(500).json({

// success:false,

// message:"Database error"

// });


// }




// if(result.length===0){


// return res.status(404).json({

// success:false,

// message:"Employee not found"

// });


// }




// res.json({

// success:true,

// member:result[0]

// });



// }


// );



// };









// // ================================
// // UPDATE MEMBER
// // ================================


// const updateMember=(req,res)=>{


// const id=req.params.id;



// let {

// first_name,
// last_name,
// email,
// phone,
// role_id,
// department_id,
// status


// }=req.body;



// role_id = role_id || null;

// department_id =
// department_id || null;


// phone =
// phone || null;




// // check existing image


// db.query(

// "SELECT profile_image FROM users WHERE id=?",

// [id],


// (err,result)=>{


// if(err){

// return res.status(500).json({

// message:"Database error"

// });

// }



// let profile_image =
// result[0]?.profile_image || null;



// if(req.file){

// profile_image =
// req.file.path.replaceAll("\\","/");

// }







// const sql=`

// UPDATE users

// SET


// first_name=?,
// last_name=?,
// email=?,
// phone=?,
// role_id=?,
// department_id=?,
// status=?,
// profile_image=?


// WHERE id=?


// `;






// db.query(

// sql,

// [

// first_name,

// last_name,

// email,

// phone,

// role_id,

// department_id,

// status,

// profile_image,

// id

// ],



// (err)=>{


// if(err){

// console.log(err);


// return res.status(500).json({

// success:false,

// message:"Update failed"

// });


// }





// res.json({

// success:true,

// message:"Employee updated successfully"

// });




// }



// );




// }



// );



// };









// // ================================
// // DELETE MEMBER
// // ================================


// const deleteMember=(req,res)=>{


// const id=req.params.id;



// db.query(

// "DELETE FROM users WHERE id=?",

// [id],


// (err)=>{


// if(err){


// return res.status(500).json({

// success:false,

// message:"Delete failed"

// });


// }



// res.json({

// success:true,

// message:"Employee deleted successfully"

// });



// }



// );



// };







// module.exports={

// getMembers,

// createMember,

// getMemberById,

// updateMember,

// deleteMember

// };

const db = require("../config/db");
const bcrypt = require("bcrypt");



// ================================
// ACTIVITY LOGGER
// ================================

const addActivity = (
    user_id,
    action,
    module
)=>{


db.query(

`
INSERT INTO activities
(
user_id,
action,
module
)

VALUES(?,?,?)

`,

[
user_id,
action,
module
]

);


};





// ================================
// GET ALL MEMBERS
// ================================


const getMembers=(req,res)=>{


const {
search,
department,
role
}=req.query;



let sql=`

SELECT

u.id,
u.employee_id,
u.first_name,
u.last_name,
u.email,
u.phone,
u.status,
u.profile_image,

r.role_name,

d.department_name


FROM users u


LEFT JOIN roles r
ON u.role_id=r.id


LEFT JOIN departments d
ON u.department_id=d.id


WHERE 1=1

`;



let values=[];



if(search){


sql+=`

AND
(
u.first_name LIKE ?
OR
u.last_name LIKE ?
OR
u.email LIKE ?
OR
u.employee_id LIKE ?
)

`;



const value=`%${search}%`;

values.push(
value,
value,
value,
value
);


}




if(department){


sql+=`

AND d.department_name=?

`;

values.push(department);


}




if(role){


sql+=`

AND r.role_name=?

`;

values.push(role);


}




sql+=`

ORDER BY u.id DESC

`;



db.query(

sql,

values,

(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:"Database error"

});

}



res.json({

success:true,

members:result

});


}


);



};









// ================================
// CREATE MEMBER
// ================================


const createMember=async(req,res)=>{


try{


const {

first_name,
last_name,
email,
phone,
password,
role_id,
department_id

}=req.body;



if(
!first_name ||
!last_name ||
!email ||
!password ||
!role_id
){


return res.status(400).json({

success:false,

message:"Required fields missing"

});


}





// Generate Employee ID


db.query(

`
SELECT employee_id
FROM users
ORDER BY id DESC
LIMIT 1

`,

[],

async(err,result)=>{


if(err){

return res.status(500).json({

message:"Employee ID error"

});

}



let next=1;



if(result.length>0){


next =
parseInt(
result[0].employee_id.replace("EMP","")
)
+1;


}



const employee_id =
"EMP"+String(next).padStart(3,"0");





const hashedPassword =
await bcrypt.hash(password,10);



let profile_image=null;



if(req.file){

profile_image=req.file.filename;

}





db.query(

`

INSERT INTO users

(
employee_id,
first_name,
last_name,
email,
phone,
password,
role_id,
department_id,
profile_image

)

VALUES(?,?,?,?,?,?,?,?,?)

`,

[

employee_id,
first_name,
last_name,
email,
phone || null,
hashedPassword,
role_id,
department_id || null,
profile_image

],


(err)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,

message:"Creating employee failed"

});


}





addActivity(

req.user.id,

"Created employee "+employee_id,

"Members"

);



res.status(201).json({

success:true,

message:"Employee created successfully",

employee_id

});



}



);



}



);



}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};









// ================================
// GET SINGLE MEMBER
// ================================


const getMemberById=(req,res)=>{


const id=req.params.id;



db.query(

`

SELECT


u.id,
u.employee_id,
u.first_name,
u.last_name,
u.email,
u.phone,
u.status,
u.profile_image,
u.created_at,

u.role_id,
u.department_id,


r.role_name,

d.department_name


FROM users u


LEFT JOIN roles r

ON u.role_id=r.id


LEFT JOIN departments d

ON u.department_id=d.id



WHERE u.id=?


`,

[id],


(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:"Database error"

});

}



if(result.length===0){

return res.status(404).json({

success:false,

message:"Employee not found"

});

}



res.json({

success:true,

member:result[0]

});


}



);



};









// ================================
// UPDATE MEMBER
// ================================


const updateMember=(req,res)=>{


const id=req.params.id;


let {

first_name,
last_name,
email,
phone,
role_id,
department_id,
status

}=req.body;



let profile_image=null;



db.query(

`
SELECT profile_image
FROM users
WHERE id=?

`,

[id],


(err,result)=>{


if(err){

return res.status(500).json({

message:"Database error"

});

}



profile_image =
result[0]?.profile_image || null;



if(req.file){

profile_image=req.file.filename;

}





db.query(

`

UPDATE users

SET

first_name=?,
last_name=?,
email=?,
phone=?,
role_id=?,
department_id=?,
status=?,
profile_image=?


WHERE id=?


`,

[

first_name,
last_name,
email,
phone || null,
role_id || null,
department_id || null,
status,
profile_image,
id

],


(err)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,

message:"Update failed"

});

}



addActivity(

req.user.id,

"Updated employee ID "+id,

"Members"

);



res.json({

success:true,

message:"Employee updated successfully"

});


}


);



}



);



};









// ================================
// UPDATE PROFILE IMAGE
// ================================


const updateProfileImage=(req,res)=>{


const id=req.params.id;



if(!req.file){

return res.status(400).json({

success:false,

message:"No image uploaded"

});

}




db.query(

`

UPDATE users

SET profile_image=?

WHERE id=?

`,

[

req.file.filename,

id

],


(err)=>{


if(err){

return res.status(500).json({

success:false,

message:"Image update failed"

});

}




addActivity(

req.user.id,

"Updated profile image for employee "+id,

"Members"

);



res.json({

success:true,

message:"Profile image updated"

});


}



);



};









// ================================
// DELETE MEMBER
// ================================


const deleteMember=(req,res)=>{


const id=req.params.id;



db.query(

`

DELETE FROM users

WHERE id=?

`,

[id],


(err)=>{


if(err){

return res.status(500).json({

success:false,

message:"Delete failed"

});

}




addActivity(

req.user.id,

"Deleted employee ID "+id,

"Members"

);



res.json({

success:true,

message:"Employee deleted successfully"

});


}



);



};








module.exports={

getMembers,

createMember,

getMemberById,

updateMember,

updateProfileImage,

deleteMember

};
