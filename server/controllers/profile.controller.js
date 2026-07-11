
const bcrypt = require("bcrypt");
const db = require("../config/db");

// ======================================
// GET PROFILE
// ======================================

const getProfile = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      users.id,
      users.employee_id,
      users.first_name,
      users.last_name,
      users.email,
      users.phone,
      users.status,
      users.profile_image,
      users.created_at,
      users.last_login,
      roles.role_name,
      departments.department_name
    FROM users
    LEFT JOIN roles
      ON users.role_id = roles.id
    LEFT JOIN departments
      ON users.department_id = departments.id
    WHERE users.id = ?
    LIMIT 1
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: results[0],
    });
  });
};

// ======================================
// UPDATE PROFILE IMAGE
// ======================================

// const updateProfileImage = (req, res) => {
//   const userId = req.user.id;

//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: "No image uploaded",
//     });
//   }

//   db.query(
//     "UPDATE users SET profile_image=? WHERE id=?",
//     [req.file.filename, userId],
//     (err) => {
//       if (err) {
//         console.error(err);

//         return res.status(500).json({
//           success: false,
//           message: "Database error",
//         });
//       }

//       res.json({
//         success: true,
//         message: "Profile image updated successfully",
//       });
//     }
//   );
// };
const updateProfileImage = (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image uploaded",
    });
  }

  db.query(
    "UPDATE users SET profile_image=? WHERE id=?",
    [req.file.filename, userId],
    (err) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      res.json({
        success: true,
        message: "Profile image updated successfully",
        filename: req.file.filename,
      });
    }
  );
};
// ======================================
// CHANGE PASSWORD
// ======================================

const changePassword = async (req,res)=>{


    const userId = req.user.id;


    const {
        currentPassword,
        newPassword,
        confirmPassword
    } = req.body;



    if(
        !currentPassword ||
        !newPassword ||
        !confirmPassword
    ){

        return res.status(400).json({

            success:false,

            message:"All fields are required"

        });

    }




    if(newPassword !== confirmPassword){

        return res.status(400).json({

            success:false,

            message:"Passwords do not match"

        });

    }




    db.query(

        `
        SELECT password

        FROM users

        WHERE id=?

        LIMIT 1
        `,

        [userId],


        async(err,results)=>{


            if(err){

                console.log(err);

                return res.status(500).json({

                    success:false,

                    message:"Database error"

                });

            }




            if(results.length===0){

                return res.status(404).json({

                    success:false,

                    message:"User not found"

                });

            }




            const passwordMatch =
            await bcrypt.compare(

                currentPassword,

                results[0].password

            );




            if(!passwordMatch){


                return res.status(401).json({

                    success:false,

                    message:"Current password incorrect"

                });

            }





            const hashedPassword =
            await bcrypt.hash(

                newPassword,

                10

            );





            db.query(

                `
                UPDATE users

                SET password=?

                WHERE id=?

                `,

                [
                    hashedPassword,
                    userId
                ],


                (err)=>{


                    if(err){

                        console.log(err);

                        return res.status(500).json({

                            success:false,

                            message:"Password update failed"

                        });

                    }




                    res.json({

                        success:true,

                        message:"Password changed successfully"

                    });



                }

            );



        }

    );



};

module.exports = {

    getProfile,

    updateProfileImage,

    changePassword

};