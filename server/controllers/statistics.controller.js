
const db = require("../config/db");



// ================================
// GET SYSTEM STATISTICS
// ================================

const getStatistics = (req,res)=>{


const statistics = {};



// ================================
// MEMBERS BY DEPARTMENT
// ================================

db.query(

`
SELECT

d.department_name,

COUNT(u.id) AS total


FROM departments d


LEFT JOIN users u

ON d.id = u.department_id


GROUP BY d.id

ORDER BY total DESC

`,

(err,departments)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,

message:"Members statistics error"

});

}



statistics.membersByDepartment = departments;






// ================================
// REQUESTS BY STATUS
// ================================


db.query(

`
SELECT

status,

COUNT(*) AS total


FROM work_requests


GROUP BY status

ORDER BY total DESC

`,

(err,requests)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,

message:"Request statistics error"

});

}



statistics.requestsByStatus = requests;







// ================================
// ASSETS BY CATEGORY
// (Resources)
// ================================


db.query(

`
SELECT

category,

COUNT(*) AS total


FROM assets


GROUP BY category

ORDER BY total DESC

`,

(err,assets)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,

message:"Asset statistics error"

});

}



statistics.resourcesByCategory = assets;








// ================================
// MEMBERS STATUS
// ================================


db.query(

`
SELECT

status,

COUNT(*) AS total


FROM users


GROUP BY status

ORDER BY total DESC

`,

(err,status)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false,

message:"User status statistics error"

});

}



statistics.membersStatus = status;





// FINAL RESPONSE

res.json({

success:true,

statistics

});



}

);


}

);


}

);


}

);


};



module.exports = {

getStatistics

};