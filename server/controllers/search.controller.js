const db = require("../config/db");


// ================================
// GLOBAL SEARCH
// ================================

const globalSearch = (req,res)=>{


const {q}=req.query;



if(!q || q.trim()===""){

return res.json({

success:true,

members:[],
requests:[],
resources:[]

});

}



const search=`%${q}%`;





// SEARCH MEMBERS

const membersSQL=`

SELECT

u.id,

u.employee_id,

u.first_name,

u.last_name,

u.email,

u.phone,

d.department_name


FROM users u


LEFT JOIN departments d

ON u.department_id=d.id


WHERE

u.first_name LIKE ?

OR

u.last_name LIKE ?

OR

u.email LIKE ?

OR

u.phone LIKE ?

OR

u.employee_id LIKE ?


LIMIT 5


`;





// SEARCH REQUESTS


const requestsSQL=`

SELECT


wr.id,

wr.request_number,

wr.title,

wr.status,

wr.priority,


CONCAT(

u.first_name,

' ',

u.last_name

) AS requester


FROM work_requests wr


LEFT JOIN users u

ON wr.requested_by=u.id



WHERE


wr.request_number LIKE ?

OR

wr.title LIKE ?

OR

CONCAT(
u.first_name,
' ',
u.last_name
)

LIKE ?


LIMIT 5


`;






// SEARCH RESOURCES


const resourcesSQL=`

SELECT


id,

asset_code,

asset_name,

category,

status


FROM assets


WHERE


asset_name LIKE ?

OR

asset_code LIKE ?


LIMIT 5


`;






db.query(

membersSQL,

[
search,
search,
search,
search,
search
],


(err,members)=>{


if(err){

return res.status(500).json({

success:false

});

}




db.query(

requestsSQL,

[
search,
search,
search

],



(err,requests)=>{


if(err){

return res.status(500).json({

success:false

});

}





db.query(

resourcesSQL,

[
search,
search
],


(err,resources)=>{


if(err){

return res.status(500).json({

success:false

});

}





res.json({

success:true,

members,

requests,

resources


});



}



);



}



);



}



);



};



module.exports={

globalSearch

};