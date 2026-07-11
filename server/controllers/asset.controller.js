const db = require("../config/db");



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
// GET ALL ASSETS
// ================================


const getAssets=(req,res)=>{


const {

search,
category,
status

}=req.query;



let sql=`

SELECT

a.*,

d.department_name,

u.first_name,
u.last_name,
u.profile_image


FROM assets a

 LEFT JOIN departments d

ON a.department_id=d.id

LEFT JOIN asset_assignments aa

ON a.id=aa.asset_id

AND aa.status='Assigned'


LEFT JOIN users u

ON aa.user_id=u.id


WHERE 1=1


`;



let values=[];



if(search){


sql+=`

AND
(
a.asset_name LIKE ?
OR
a.asset_code LIKE ?
OR
a.brand LIKE ?
)

`;


const value=`%${search}%`;


values.push(
value,
value,
value
);


}




if(category){


sql+=`

AND a.category=?

`;


values.push(category);


}




if(status){


sql+=`

AND a.status=?

`;


values.push(status);


}



sql+=`

ORDER BY a.id DESC

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

assets:result

});


}


);


};







// ================================
// GET SINGLE ASSET
// ================================
const getAssetById=(req,res)=>{

const id=req.params.id;


db.query(

`
SELECT

a.*,

u.id AS assigned_user_id,
u.employee_id,
u.first_name,
u.last_name,
u.email,
u.profile_image,

d.department_name,

aa.assigned_date,
aa.remarks


FROM assets a


LEFT JOIN asset_assignments aa

ON a.id=aa.asset_id

AND aa.status='Assigned'


LEFT JOIN users u

ON aa.user_id=u.id


LEFT JOIN departments d

ON u.department_id=d.id


WHERE a.id=?

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

message:"Asset not found"

});

}



res.json({

success:true,

asset:result[0]

});


}


);


};

// const getAssetById=(req,res)=>{


// const id=req.params.id;



// db.query(

// `

// SELECT *

// FROM assets

// WHERE id=?

// `,

// [id],


// (err,result)=>{


// if(err){

// return res.status(500).json({

// success:false,

// message:"Database error"

// });

// }



// if(result.length===0){

// return res.status(404).json({

// success:false,

// message:"Asset not found"

// });

// }



// res.json({

// success:true,

// asset:result[0]

// });


// }



// );


// };






// ================================
// CREATE ASSET
// ================================


const createAsset=(req,res)=>{


// const {


// asset_code,
// asset_name,
// category,
// brand,
// model,
// serial_number,
// purchase_date,
// purchase_price,
// condition_status,
// description


// }=req.body;
const {

asset_code,
asset_name,
category,
department_id,
brand,
model,
serial_number,
purchase_date,
purchase_price,
condition_status,
description

}=req.body;


if(
!asset_code ||
!asset_name ||
!category

){


return res.status(400).json({

success:false,

message:"Required fields missing"

});


}




let image=null;


if(req.file){

image=req.file.filename;

}



// let mysqlDate = null;


// if(purchase_date){

// mysqlDate =
// new Date(purchase_date)
// .toISOString()
// .slice(0,10);

// }
let mysqlDate = null;


if(purchase_date){

const date = new Date(purchase_date);


if(isNaN(date.getTime())){

return res.status(400).json({

success:false,

message:"Invalid purchase date"

});

}


mysqlDate =
date.toISOString().slice(0,10);

}

db.query(

`


INSERT INTO assets

(

asset_code,
asset_name,
category,
department_id,
brand,
model,
serial_number,
purchase_date,
purchase_price,
condition_status,
description,
asset_image

)

VALUES(?,?,?,?,?,?,?,?,?,?,?,?)

`,

// [

// asset_code,
// asset_name,
// category,
// brand || null,
// model || null,
// serial_number || null,
// purchase_date || null,
// purchase_price || null,
// condition_status || "Good",
// description || null,
// image


// ]
[
asset_code,
asset_name,
category,
department_id,
brand || null,
model || null,
serial_number || null,
mysqlDate,
purchase_price || null,
condition_status || "Good",
description || null,
image
],



(err)=>{


if(err){

console.log(err);


return res.status(500).json({

success:false,

message:"Creating asset failed"

});


}





addActivity(

req.user.id,

"Created asset "+asset_code,

"Assets"

);




res.status(201).json({

success:true,

message:"Asset created successfully"

});


}



);


};








// ================================
// UPDATE ASSET
// ================================


const updateAsset=(req,res)=>{


const id=req.params.id;



// const {

// asset_name,
// category,
// brand,
// model,
// serial_number,
// purchase_date,
// purchase_price,
// condition_status,
// status,
// description

// }=req.body;

let {

asset_name,
category,
brand,
model,
serial_number,
purchase_date,
purchase_price,
condition_status,
status,
description

}=req.body;



// Convert ISO date to MySQL DATE format

if(purchase_date){

purchase_date =
new Date(purchase_date)
.toISOString()
.slice(0,10);

}

// db.query(

// `

// SELECT asset_image

// FROM assets

// WHERE id=?

// `,

// [id],


// (err,result)=>{


// let image =
// result[0]?.asset_image || null;
db.query(

`
SELECT asset_image
FROM assets
WHERE id=?
`,

[id],

(err,result)=>{


if(err){

console.log("SELECT IMAGE ERROR:",err);

return res.status(500).json({

success:false,

message:err.message

});

}



let image =
result.length > 0
?
result[0].asset_image
:
null;



if(req.file){

image=req.file.filename;

}



db.query(

`

UPDATE assets

SET

asset_name=?,
category=?,
brand=?,
model=?,
serial_number=?,
purchase_date=?,
purchase_price=?,
condition_status=?,
status=?,
description=?,
asset_image=?


WHERE id=?

`,

[

asset_name,
category,
brand,
model,
serial_number,
purchase_date,
purchase_price,
condition_status,
status,
description,
image,
id

],



(err)=>{


// if(err){

// return res.status(500).json({

// success:false,

// message:"Update failed"

// });

// }

if(err){

console.log("UPDATE ASSET ERROR:", err);

return res.status(500).json({

success:false,

message:err.message

});

}


addActivity(

req.user.id,

"Updated asset ID "+id,

"Assets"

);



res.json({

success:true,

message:"Asset updated successfully"

});



}



);


}



);


};






// ================================
// DELETE ASSET
// ================================


const deleteAsset=(req,res)=>{


const id=req.params.id;



db.query(

`

DELETE FROM assets

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

"Deleted asset ID "+id,

"Assets"

);



res.json({

success:true,

message:"Asset deleted successfully"

});


}



);


};

const addAssetLog = (
    asset_id,
    user_id,
    action,
    description
)=>{


db.query(

`
INSERT INTO asset_logs
(
asset_id,
user_id,
action,
description
)

VALUES(?,?,?,?)

`,

[
asset_id,
user_id,
action,
description
]


);


};
const assignAsset = (req,res)=>{


const asset_id = req.params.id;


const {
    user_id,
    remarks
} = req.body;



if(!user_id){

return res.status(400).json({

success:false,

message:"Employee is required"

});

}





// Check asset availability

db.query(

`
SELECT status

FROM assets

WHERE id=?

`,

[asset_id],


(err,asset)=>{


if(err){

return res.status(500).json({

success:false,

message:"Database error"

});

}




if(asset.length===0){

return res.status(404).json({

success:false,

message:"Asset not found"

});

}





if(asset[0].status==="Assigned"){


return res.status(400).json({

success:false,

message:"Asset is already assigned"

});


}






const assigned_date =
new Date()
.toISOString()
.slice(0,10);





// Create assignment

db.query(

`

INSERT INTO asset_assignments

(
asset_id,
user_id,
assigned_date,
remarks,
status
)

VALUES(?,?,?,?,?)

`,

[

asset_id,
user_id,
assigned_date,
remarks || null,
"Assigned"

],



(err)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,

message:"Assignment failed"

});

}






// Update asset status

db.query(

`

UPDATE assets

SET status='Assigned'

WHERE id=?

`,

[asset_id]

);







// Asset history

addAssetLog(

asset_id,

req.user.id,

"Assigned",

"Asset assigned to employee ID "+user_id

);






// Activity

addActivity(

req.user.id,

"Assigned asset ID "+asset_id,

"Assets"

);






res.json({

success:true,

message:"Asset assigned successfully"

});




}



);





}



);



};
// const assignAsset=(req,res)=>{


// const asset_id=req.params.id;


// const {

// user_id,
// remarks

// }=req.body;



// const assigned_date =
// new Date()
// .toISOString()
// .slice(0,10);



// db.query(

// `

// INSERT INTO asset_assignments

// (
// asset_id,
// user_id,
// assigned_date,
// remarks
// )

// VALUES(?,?,?,?)

// `,

// [
// asset_id,
// user_id,
// assigned_date,
// remarks || null
// ],



// (err)=>{


// if(err){

// return res.status(500).json({

// success:false,
// message:"Assignment failed"

// });

// }




// db.query(

// `

// UPDATE assets

// SET status='Assigned'

// WHERE id=?

// `,

// [asset_id]

// );





// addAssetLog(

// asset_id,

// req.user.id,

// "Assigned",

// "Asset assigned to employee ID "+user_id

// );





// addActivity(

// req.user.id,

// "Assigned asset ID "+asset_id,

// "Assets"

// );




// res.json({

// success:true,

// message:"Asset assigned successfully"

// });



// }



// );



// };
const returnAsset = (req,res)=>{


const asset_id=req.params.id;



const returned_date =
new Date()
.toISOString()
.slice(0,10);





// Check active assignment

db.query(

`

SELECT id

FROM asset_assignments

WHERE asset_id=?

AND status='Assigned'

`,

[asset_id],


(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:"Database error"

});

}





if(result.length===0){

return res.status(400).json({

success:false,

message:"This asset is not currently assigned"

});

}








// Update assignment

db.query(

`

UPDATE asset_assignments

SET

returned_date=?,

status='Returned'


WHERE asset_id=?

AND status='Assigned'

`,

[

returned_date,

asset_id

],



(err)=>{


if(err){

return res.status(500).json({

success:false,

message:"Return failed"

});

}





// Change asset status

db.query(

`

UPDATE assets

SET status='Available'

WHERE id=?

`,

[asset_id]

);








// History log

addAssetLog(

asset_id,

req.user.id,

"Returned",

"Asset returned by employee"

);







// Activity log

addActivity(

req.user.id,

"Returned asset ID "+asset_id,

"Assets"

);







res.json({

success:true,

message:"Asset returned successfully"

});



}



);



}



);



};
// const returnAsset=(req,res)=>{


// const asset_id=req.params.id;



// const returned_date =
// new Date()
// .toISOString()
// .slice(0,10);




// db.query(

// `

// UPDATE asset_assignments

// SET

// returned_date=?,

// status='Returned'


// WHERE asset_id=?

// AND status='Assigned'


// `,

// [
// returned_date,
// asset_id
// ],



// (err)=>{


// if(err){

// return res.status(500).json({

// success:false,

// message:"Return failed"

// });

// }





// db.query(

// `

// UPDATE assets

// SET status='Available'

// WHERE id=?

// `,

// [asset_id]

// );





// addAssetLog(

// asset_id,

// req.user.id,

// "Returned",

// "Asset returned"

// );





// res.json({

// success:true,

// message:"Asset returned successfully"

// });



// }


// );


// };
const getAssetHistory=(req,res)=>{


const id=req.params.id;



db.query(

`

SELECT

al.*,

u.first_name,

u.last_name


FROM asset_logs al


LEFT JOIN users u

ON al.user_id=u.id


WHERE al.asset_id=?


ORDER BY al.id DESC


`,

[id],


(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:"Database error"

});

}



res.json({

success:true,

history:result

});


}



);


};

// ================================
// GET EMPLOYEES FOR ASSIGNMENT
// ================================

const getEmployees=(req,res)=>{


db.query(

`

SELECT

u.id,

u.employee_id,

u.first_name,

u.last_name,

u.profile_image,

d.department_name


FROM users u


LEFT JOIN departments d

ON u.department_id=d.id


WHERE u.status='Active'


ORDER BY u.first_name ASC


`,


(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:"Database error"

});

}



res.json({

success:true,

employees:result

});


}


);


};


module.exports={


getAssets,

getAssetById,

createAsset,

updateAsset,

deleteAsset,

assignAsset,

returnAsset,

getAssetHistory,

getEmployees


};