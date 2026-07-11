const db = require("../config/db");


// =====================================
// GET DEPARTMENT REQUESTS
// =====================================

const getDepartmentRequests = (req,res)=>{


const department_id = req.user.department_id;
console.log("Logged in user:");
console.log(req.user);

console.log("Department ID:", department_id);


const sql = `

SELECT

wr.*,

CONCAT(
u.first_name,
' ',
u.last_name
) AS requester,

CONCAT(
a.first_name,
' ',
a.last_name
) AS assigned_to_name


FROM work_requests wr


LEFT JOIN users u
ON wr.requested_by=u.id

LEFT JOIN users a
ON wr.assigned_to=a.id


WHERE wr.department_id=?


ORDER BY wr.created_at DESC


`;



db.query(

sql,

[department_id],


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
requests:result

});


}


);


};




// =====================================
// UPDATE REQUEST STATUS
// =====================================


const updateRequestStatus=(req,res)=>{


const id=req.params.id;


const {
status
}=req.body;



const allowed=[

"Pending",
"Assigned",
"In Progress",
"Completed",
"Rejected"

];



if(!allowed.includes(status)){


return res.status(400).json({

success:false,
message:"Invalid status"

});


}



db.query(

`

UPDATE work_requests

SET status=?

WHERE id=?

`,

[
status,
id
],


(err)=>{


if(err){

return res.status(500).json({

success:false,
message:"Update failed"

});

}



res.json({

success:true,
message:"Request updated successfully"

});


}


);



};



module.exports={

getDepartmentRequests,

updateRequestStatus

};