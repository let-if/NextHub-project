const db = require("../config/db");


// Generate request number
const generateRequestNumber = () => {

    const number = Math.floor(
        100000 + Math.random() * 900000
    );

    return `REQ-${number}`;

};




// CREATE REQUEST
const createRequest = (req,res)=>{


const userId = req.user.id;


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



const requestNumber =
generateRequestNumber();



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

VALUES (?,?,?,?,?,?,?)

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

request_id:result.insertId,

request_number:requestNumber


});

}


);



};





// GET MY REQUESTS

// const getMyRequests=(req,res)=>{


// const userId=req.user.id;



// const sql=`

// SELECT

// wr.*,

// u.first_name,

// u.last_name


// FROM work_requests wr

// JOIN users u

// ON wr.requested_by=u.id


// WHERE wr.requested_by=?


// ORDER BY wr.created_at DESC


// `;



// db.query(
// sql,
// [userId],

// (err,results)=>{


// if(err){

// return res.status(500).json({

// success:false,
// message:"Database error"

// });

// }



// res.json({

// success:true,

// requests:results

// });


// }


// );



// };
const getMyRequests = (req, res) => {
  const userId = req.user.id;

  const sql = `
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
      ON wr.department_id = d.id

    LEFT JOIN users u
      ON wr.assigned_to = u.id

    WHERE wr.requested_by = ?

    ORDER BY wr.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    res.json({
      success: true,
      requests: results,
    });
  });
};






// GET ALL REQUESTS

const getAllRequests=(req,res)=>{


const sql=`

SELECT

wr.*,

CONCAT(
u.first_name,
' ',
u.last_name
) AS requester


FROM work_requests wr

JOIN users u

ON wr.requested_by=u.id


ORDER BY wr.created_at DESC


`;



db.query(sql,(err,results)=>{


if(err){

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





// UPDATE STATUS

const updateRequestStatus=(req,res)=>{


const requestId=req.params.id;

const userId=req.user.id;


const {
status
}=req.body;



db.query(

"SELECT status FROM work_requests WHERE id=?",

[requestId],

(err,result)=>{


if(err || result.length===0){

return res.status(404).json({

success:false,
message:"Request not found"

});

}



const oldStatus=result[0].status;



db.query(

`

UPDATE work_requests

SET status=?

WHERE id=?

`,

[
status,
requestId
],


(err)=>{


if(err){

return res.status(500).json({

success:false,
message:"Update failed"

});

}




// save history


db.query(

`

INSERT INTO request_history

(
request_id,
changed_by,
old_status,
new_status
)

VALUES(?,?,?,?)

`,

[
requestId,
userId,
oldStatus,
status
]

);



res.json({

success:true,

message:"Status updated"

});


}



);



}


);



};






module.exports={

createRequest,

getMyRequests,

getAllRequests,

updateRequestStatus

};