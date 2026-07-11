import {useEffect,useState} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

// import {
// getProfile,
// updateProfileImage
// } from "../../services/profileService";
import {
getProfile,
updateProfileImage,
changePassword
} from "../../services/profileService";




function Profile(){


const [profile,setProfile]=useState(null);

const [loading,setLoading]=useState(true);
const [preview,setPreview]=useState(null);

const [showPassword,setShowPassword]=useState(false);


const [passwordData,setPasswordData]=useState({

    currentPassword:"",
    newPassword:"",
    confirmPassword:""

});


const [message,setMessage]=useState("");


useEffect(()=>{

loadProfile();

},[]);


const loadProfile = async () => {
  try {

    const data = await getProfile();

    console.log("PROFILE DATA:", data);

    setProfile(data.user);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};


// const loadProfile=async()=>{


// try{


// const data =
// await getProfile();


// setProfile(
// data.user
// );



// }
// catch(error){

// console.log(error);

// }
// finally{

// setLoading(false);

// }


// };







// const handleImage=async(e)=>{


// const file=e.target.files[0];


// if(!file)
// return;



// try{


// await updateProfileImage(file);


// loadProfile();



// }
// catch(error){

// console.log(error);

// }



// };


const handleImage=async(e)=>{


const file=e.target.files[0];


if(!file)
return;



// show image immediately

setPreview(
URL.createObjectURL(file)
);



try{


await updateProfileImage(file);


await loadProfile();



setMessage(
"Profile image updated successfully"
);



}
catch(error){

console.log(error);

setMessage(
"Image upload failed"
);


}



};
const handlePasswordChange = async()=>{


try{


const response =
await changePassword(
passwordData
);



setMessage(
response.message
);



setPasswordData({

currentPassword:"",
newPassword:"",
confirmPassword:""

});



setShowPassword(false);



}
catch(error){


setMessage(

error.response?.data?.message ||
"Password change failed"

);


}



};





// if(loading)
// if (!profile) {
//   return (
//     <DashboardLayout>
//       <div style={styles.loading}>
//         Unable to load profile.
//       </div>
//     </DashboardLayout>
//   );
// }
// return(

// <DashboardLayout>

// <div style={styles.loading}>

// Loading profile...

// </div>

// </DashboardLayout>

// );
if (loading) {
  return (
    <DashboardLayout>
      <div style={styles.loading}>
        Loading profile...
      </div>
    </DashboardLayout>
  );
}

if (!profile) {
  return (
    <DashboardLayout>
      <div style={styles.loading}>
        Unable to load profile.
      </div>
    </DashboardLayout>
  );
}







return(


<DashboardLayout>


<div style={styles.page}>


<div style={styles.header}>


<h1>

My Profile

</h1>


<p>

Manage your personal information

</p>


</div>








<div style={styles.profileCard}>


<div style={styles.left}>


<div style={styles.avatarBox}>


{

profile.profile_image ?


<img

src={

preview ?

preview

:

`http://localhost:5000/uploads/${profile.profile_image}`

}

style={styles.avatar}

/>


:


<div style={styles.placeholder}>

{
profile.first_name?.charAt(0)
}

{
profile.last_name?.charAt(0)
}

</div>


}




<label style={styles.upload}>


Change Photo


<input

type="file"

hidden

accept="image/*"

onChange={handleImage}

/>


</label>


</div>




</div>









<div style={styles.info}>


<h2>

{profile.first_name}

{" "}

{profile.last_name}

</h2>



<span style={styles.role}>

{profile.role_name}

</span>






<div style={styles.grid}>


<Info

label="Employee ID"

value={profile.employee_id}

/>


<Info

label="Email"

value={profile.email}

/>


<Info

label="Phone"

value={profile.phone}

/>


<Info

label="Department"

value={
profile.department_name
}

/>


<Info

label="Status"

value={profile.status}

/>


<Info

label="Joined"

value={
profile.created_at?.slice(0,10)
}

/>


</div>



</div>


</div>







<div style={styles.passwordCard}>


<h2>

Security

</h2>


<p>

Update your password regularly to keep your account secure.

</p>


{/* <button style={styles.button}>

Change Password

</button> */}
<button

style={styles.button}

onClick={()=>setShowPassword(true)}

>

Change Password

</button>


</div>

{
showPassword &&

<div style={styles.modalOverlay}>


<div style={styles.passwordModal}>


<div style={styles.modalHeader}>

<div>

<h2>
Change Password
</h2>

<p>
Update your account password securely
</p>

</div>


<button

style={styles.closeButton}

onClick={()=>setShowPassword(false)}

>
×
</button>


</div>





<div style={styles.formGroup}>


<label>
Current Password
</label>


<input

type="password"

placeholder="Enter current password"

value={passwordData.currentPassword}

onChange={(e)=>

setPasswordData({

...passwordData,

currentPassword:e.target.value

})

}

/>


</div>







<div style={styles.formGroup}>


<label>
New Password
</label>


<input

type="password"

placeholder="Enter new password"

value={passwordData.newPassword}

onChange={(e)=>

setPasswordData({

...passwordData,

newPassword:e.target.value

})

}

/>


</div>







<div style={styles.formGroup}>


<label>
Confirm New Password
</label>


<input

type="password"

placeholder="Confirm new password"

value={passwordData.confirmPassword}

onChange={(e)=>

setPasswordData({

...passwordData,

confirmPassword:e.target.value

})

}

/>


</div>







<div style={styles.passwordActions}>


<button

style={styles.cancelButton}

onClick={()=>setShowPassword(false)}

>

Cancel

</button>




<button

style={styles.updatePasswordButton}

onClick={handlePasswordChange}

>

Update Password

</button>



</div>



</div>


</div>

}




</div>


</DashboardLayout>


);


}






function Info({

label,

value

}){


return(

<div style={styles.infoItem}>


<span>

{label}

</span>


<strong>

{value || "N/A"}

</strong>


</div>

);

}









const styles={


page:{

width:"100%"

},



header:{

marginBottom:"30px"

},


profileCard:{

background:"white",

borderRadius:"25px",

padding:"35px",

display:"flex",

gap:"40px",

boxShadow:"0 15px 40px rgba(0,0,0,.08)",

flexWrap:"wrap"

},



avatarBox:{

display:"flex",

flexDirection:"column",

alignItems:"center",

gap:"20px"

},



avatar:{

width:"180px",

height:"180px",

borderRadius:"50%",

objectFit:"cover",

border:"5px solid #2563eb"

},



placeholder:{

width:"180px",

height:"180px",

borderRadius:"50%",

background:"#2563eb",

color:"white",

fontSize:"60px",

fontWeight:"700",

display:"flex",

alignItems:"center",

justifyContent:"center"

},



upload:{

background:"#2563eb",

color:"white",

padding:"12px 20px",

borderRadius:"12px",

cursor:"pointer"

},




info:{

flex:1

},



role:{

display:"inline-block",

background:"#dbeafe",

color:"#1d4ed8",

padding:"8px 18px",

borderRadius:"20px",

fontWeight:"600"

},



grid:{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",

gap:"20px",

marginTop:"30px"

},



infoItem:{

background:"#f8fafc",

padding:"18px",

borderRadius:"15px",

display:"flex",

flexDirection:"column",

gap:"8px"

},




passwordCard:{

marginTop:"30px",

background:"white",

padding:"30px",

borderRadius:"25px",

boxShadow:"0 10px 30px rgba(0,0,0,.08)"

},



button:{

background:"#2563eb",

color:"white",

border:"none",

padding:"12px 25px",

borderRadius:"10px",

cursor:"pointer"

},



loading:{

background:"white",

padding:"50px",

borderRadius:"20px",

textAlign:"center"

},
modalOverlay:{

position:"fixed",

top:0,

left:0,

right:0,

bottom:0,

background:"rgba(15,23,42,0.55)",

display:"flex",

alignItems:"center",

justifyContent:"center",

zIndex:9999,

backdropFilter:"blur(5px)"

},



passwordModal:{

width:"450px",

background:"#ffffff",

borderRadius:"24px",

padding:"35px",

boxShadow:"0 25px 60px rgba(0,0,0,.25)"

},



modalHeader:{

display:"flex",

justifyContent:"space-between",

alignItems:"flex-start",

marginBottom:"30px"

},



closeButton:{

border:"none",

background:"#f1f5f9",

width:"35px",

height:"35px",

borderRadius:"50%",

fontSize:"24px",

cursor:"pointer",

color:"#475569"

},



formGroup:{

display:"flex",

flexDirection:"column",

gap:"8px",

marginBottom:"20px"

},



formGroupLabel:{

fontSize:"14px",

fontWeight:"600",

color:"#334155"

},



formGroupInput:{

padding:"14px 16px",

border:"1px solid #cbd5e1",

borderRadius:"12px",

fontSize:"15px",

outline:"none"

},



passwordActions:{

display:"flex",

justifyContent:"flex-end",

gap:"15px",

marginTop:"30px"

},



cancelButton:{

padding:"12px 25px",

borderRadius:"12px",

border:"none",

background:"#e2e8f0",

color:"#334155",

fontWeight:"600",

cursor:"pointer"

},



updatePasswordButton:{

padding:"12px 25px",

borderRadius:"12px",

border:"none",

background:"#2563eb",

color:"white",

fontWeight:"600",

cursor:"pointer"

}



};



export default Profile;
