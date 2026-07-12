
const db = require("../config/db");


// Generate request number
const generateRequestNumber = () => {

    const number = Math.floor(
        100000 + Math.random() * 900000
    );

    return `REQ-${number}`;

};


const {
    notifyDepartment
} = require("./notification.controller");

// ===============================
// CREATE REQUEST
// ===============================

const createRequest = (req,res)=>{

const userId=req.user.id;

const {
title,
description,
category,
priority,
department_id
}=req.body;



if(!title){

return res.status(400).json({

success:false,
message:"Title is required"

});

}



const requestNumber=generateRequestNumber();



const sql=`

INSERT INTO work_requests
(
request_number,
title,
description,
category,
priority,
requested_by,
department_id
)

VALUES(?,?,?,?,?,?,?)

`;



db.query(

sql,

[
requestNumber,
title,
description,
category,
priority || "Medium",
userId,
department_id
],


(err,result)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,
message:"Database error"

});

}



res.status(201).json({

success:true,

message:"Request created successfully",

id:result.insertId,

request_number:requestNumber

});


});


};





// ===============================
// GET MY REQUESTS
// ===============================


const getMyRequests=(req,res)=>{


const userId=req.user.id;



const sql=`

SELECT

wr.*,

d.department_name,

CONCAT(
u.first_name,
' ',
u.last_name
) AS assigned_to_name


FROM work_requests wr


LEFT JOIN departments d

ON wr.department_id=d.id


LEFT JOIN users u

ON wr.assigned_to=u.id


WHERE wr.requested_by=?


ORDER BY wr.created_at DESC


`;



db.query(
sql,
[userId],

(err,results)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,
message:"Database error"

});

}



res.json({

success:true,

requests:results

});


});


};







// ===============================
// VIEW SINGLE REQUEST
// ===============================


const getRequestById=(req,res)=>{


const id=req.params.id;



const sql=`

SELECT

wr.*,

d.department_name,

CONCAT(
u.first_name,
' ',
u.last_name
) requester_name


FROM work_requests wr


LEFT JOIN departments d

ON wr.department_id=d.id


LEFT JOIN users u

ON wr.requested_by=u.id


WHERE wr.id=?


`;



db.query(
sql,
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
message:"Request not found"

});

}



res.json({

success:true,

request:result[0]

});


});


};







// ===============================
// EDIT REQUEST
// ===============================


const updateRequest=(req,res)=>{


const id=req.params.id;



const {
title,
description,
category,
priority,
department_id
}=req.body;



const sql=`

UPDATE work_requests

SET

title=?,
description=?,
category=?,
priority=?,
department_id=?

WHERE id=?

`;



db.query(

sql,

[
title,
description,
category,
priority,
department_id,
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


});


};







// ===============================
// DELETE REQUEST
// ===============================


const deleteRequest=(req,res)=>{


const id=req.params.id;



db.query(

"DELETE FROM work_requests WHERE id=?",

[id],

(err)=>{


if(err){

return res.status(500).json({

success:false,
message:"Delete failed"

});

}



res.json({

success:true,

message:"Request deleted successfully"

});


});


};






// ===============================
// ASSIGN REQUEST
// ===============================


const assignRequest = (req, res) => {

    const id = req.params.id;

    const { assigned_to } = req.body;

    const sql = `
        UPDATE work_requests
        SET
            assigned_to = ?,
            status = 'Assigned'
        WHERE id = ?
    `;

    db.query(
        sql,
        [assigned_to, id],
        (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Assignment failed"
                });
            }

            res.json({
                success: true,
                message: "Request assigned successfully"
            });

        }
    );

};
// db.query(

// `

// UPDATE work_requests

// SET

// assigned_to=?,
// status='Assigned'

// WHERE id=?

// `,

// [
// assigned_to,
// id
// ],


// (err)=>{


// if(err){

// return res.status(500).json({

// success:false,
// message:"Assignment failed"

// });

// }



// res.json({

// success:true,

// message:"Request assigned successfully"

// });


// });


// };






// // ===============================
// // UPDATE STATUS
// // ===============================


// const updateRequestStatus=(req,res)=>{


// const id=req.params.id;


// const {
// status
// }=req.body;



// db.query(

// `

// UPDATE work_requests

// SET status=?

// WHERE id=?

// `,

// [
// status,
// id
// ],



// (err)=>{


// if(err){

// return res.status(500).json({

// success:false,
// message:"Status update failed"

// });

// }



// res.json({

// success:true,

// message:"Status updated"

// });


// });


const updateRequestStatus = (req, res) => {

    console.log("UPDATE STATUS CALLED");
    console.log(req.params.id);
    console.log(req.body);

    const id = req.params.id;
    const { status } = req.body;

    db.query(
        `
        UPDATE work_requests
        SET status = ?
        WHERE id = ?
        `,
        [status, id],
        (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Status update failed"
                });
            }

            console.log("Rows updated:", id, status);

            res.json({
                success: true,
                message: "Status updated successfully"
            });

        }
    );

};





module.exports={


createRequest,

getMyRequests,

getRequestById,

updateRequest,

deleteRequest,

assignRequest,

updateRequestStatus


};