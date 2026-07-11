const db = require("../config/db");



// ========================================
// GET ALL DEPARTMENTS
// ========================================

const getDepartments = (req, res) => {

    const sql = `

        SELECT
            *
        FROM departments
        ORDER BY department_name ASC

    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }

        res.json({

            success: true,
            departments: results

        });

    });

};



// ========================================
// GET DEPARTMENT BY ID
// ========================================

const getDepartmentById = (req, res) => {

    const id = req.params.id;

    db.query(

        `
        SELECT *
        FROM departments
        WHERE id=?
        `,

        [id],

        (err, results) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            if (results.length === 0) {

                return res.status(404).json({

                    success: false,
                    message: "Department not found"

                });

            }

            res.json({

                success: true,
                department: results[0]

            });

        }

    );

};



// ========================================
// CREATE DEPARTMENT
// ========================================

const createDepartment = (req, res) => {

    const {

        department_name,
        description

    } = req.body;

    if (!department_name) {

        return res.status(400).json({

            success: false,
            message: "Department name is required"

        });

    }

    db.query(

        `
        INSERT INTO departments
        (
            department_name,
            description
        )
        VALUES(?,?)
        `,

        [

            department_name,
            description || null

        ],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    success: false,
                    message: "Department already exists"

                });

            }

            res.status(201).json({

                success: true,
                message: "Department created successfully"

            });

        }

    );

};



// ========================================
// UPDATE DEPARTMENT
// ========================================

const updateDepartment = (req, res) => {

    const id = req.params.id;

    const {

        department_name,
        description

    } = req.body;

    db.query(

        `
        UPDATE departments

        SET

        department_name=?,
        description=?

        WHERE id=?
        `,

        [

            department_name,
            description,
            id

        ],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    success: false,
                    message: "Update failed"

                });

            }

            res.json({

                success: true,
                message: "Department updated successfully"

            });

        }

    );

};



// ========================================
// DELETE DEPARTMENT
// ========================================

const deleteDepartment = (req, res) => {

    const id = req.params.id;

    db.query(

        `
        DELETE
        FROM departments
        WHERE id=?
        `,

        [id],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    success: false,
                    message: "Delete failed"

                });

            }

            res.json({

                success: true,
                message: "Department deleted successfully"

            });

        }

    );

};
// ========================================
// GET DEPARTMENT PROFILE
// ========================================

const getDepartmentProfile = (req, res) => {

    const departmentId = req.params.id;


    const departmentQuery = `

    SELECT

    id,
    department_name,
    description,
    created_at

    FROM departments

    WHERE id=?

    `;


    db.query(
        departmentQuery,
        [departmentId],

        (err, departmentResult)=>{


            if(err){

                console.log(err);

                return res.status(500).json({

                    success:false,
                    message:"Database error"

                });

            }



            if(departmentResult.length===0){

                return res.status(404).json({

                    success:false,
                    message:"Department not found"

                });

            }




            const department = departmentResult[0];



            // GET EMPLOYEES

            const employeesQuery = `

            SELECT

            id,
            employee_id,
            first_name,
            last_name,
            email,
            phone,
            status,
            profile_image


            FROM users


            WHERE department_id=?


            ORDER BY first_name ASC


            `;




            db.query(

                employeesQuery,

                [departmentId],

                (err,employees)=>{


                    if(err){

                        return res.status(500).json({

                            success:false,
                            message:"Employee loading failed"

                        });

                    }





                    // REQUEST STATISTICS

                    const requestQuery = `

                    SELECT

                    status,
                    COUNT(*) total


                    FROM work_requests


                    WHERE department_id=?


                    GROUP BY status


                    `;



                    db.query(

                        requestQuery,

                        [departmentId],

                        (err,requestStats)=>{


                            if(err){

                                return res.status(500).json({

                                    success:false,

                                    message:"Request statistics failed"

                                });

                            }





                            // RECENT REQUESTS

                            const recentRequestQuery = `

                            SELECT

                            wr.id,
                            wr.request_number,
                            wr.title,
                            wr.priority,
                            wr.status,
                            wr.created_at,


                            CONCAT(
                            u.first_name,
                            ' ',
                            u.last_name
                            )
                            AS requester



                            FROM work_requests wr


                            LEFT JOIN users u

                            ON wr.requested_by=u.id



                            WHERE wr.department_id=?


                            ORDER BY wr.created_at DESC


                            LIMIT 5


                            `;




                            db.query(

                                recentRequestQuery,

                                [departmentId],

                                (err,recentRequests)=>{


                                    if(err){

                                        return res.status(500).json({

                                            success:false,

                                            message:"Recent requests failed"

                                        });

                                    }







                                    // ASSETS

                                    const assetQuery = `
SELECT

a.id,
a.asset_code,
a.asset_name,
a.category,
a.status,
a.asset_image


FROM assets a


WHERE a.department_id = ?


ORDER BY a.id DESC


`;
                                    // SELECT


                                    // a.id,
                                    // a.resource_code,
                                    // a.asset_code,
                                    // a.asset_name,
                                    // a.category,
                                    // a.status



                                    // FROM assets a



                                    // LEFT JOIN asset_assignments aa


                                    // ON a.id=aa.asset_id



                                    // LEFT JOIN users u


                                    // ON aa.user_id=u.id



                                    // WHERE u.department_id=?



                                    // ORDER BY a.id DESC



                                    // `;




                                    db.query(

                                        assetQuery,

                                        [departmentId],

                                        (err,assets)=>{


                                            if(err){

                                                return res.status(500).json({

                                                    success:false,

                                                    message:"Assets loading failed"

                                                });

                                            }





                                            res.json({

                                                success:true,


                                                department,


                                                employees,


                                                requestStats,


                                                recentRequests,


                                                assets


                                            });



                                        }

                                    );



                                }

                            );




                        }

                    );



                }

            );



        }

    );

};
// ========================================
// GET DEPARTMENT MEMBERS
// ========================================

const getDepartmentMembers = (req,res)=>{


const departmentId = req.params.id;



const sql = `

SELECT

u.id,
u.employee_id,
u.first_name,
u.last_name,
u.email,
u.phone,
u.status,
u.profile_image,

r.role_name

FROM users u


LEFT JOIN roles r

ON u.role_id = r.id


WHERE u.department_id = ?


ORDER BY u.id DESC


`;



db.query(

sql,

[departmentId],

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

members:result

});



}


);



};


// module.exports={

// getDepartments,

// createDepartment,

// getDepartmentById,

// updateDepartment,

// deleteDepartment,

// getDepartmentMembers

// };
module.exports={

getDepartments,

createDepartment,

getDepartmentById,

updateDepartment,

deleteDepartment,

getDepartmentMembers,

getDepartmentProfile

};