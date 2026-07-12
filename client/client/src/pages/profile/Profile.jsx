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


<h2 style={{
margin:0,
fontSize:"26px",
fontWeight:"800",
color:"#0f172a"
}}>
🔐 Change Password
</h2>

<p style={{
marginTop:"8px",
color:"#64748b",
fontSize:"14px"
}}>
Create a strong password to protect your account
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







const styles = {

page:{

    width:"100%",
    minHeight:"100vh",
    padding:"0",
    background:"transparent"

},

header:{

    marginBottom:"35px",
    padding:"0 5px"

},

profileCard:{

    background:"#ffffff",
    borderRadius:"32px",
    padding:"40px",
    display:"flex",
    alignItems:"center",
    gap:"45px",
    flexWrap:"wrap",
    border:"1px solid #e2e8f0",
    boxShadow:
        "0 20px 60px rgba(15,23,42,.08)",
    transition:"all .3s ease"

},

left:{

    width:"220px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"

},

avatarBox:{

    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:"22px"

},

avatar:{

    width:"190px",
    height:"190px",
    borderRadius:"50%",
    objectFit:"cover",
    border:"6px solid #ffffff",
    boxShadow:
        "0 15px 40px rgba(37,99,235,.25)",
    background:"#f8fafc"

},

placeholder:{

    width:"190px",
    height:"190px",
    borderRadius:"50%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    background:
        "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color:"#ffffff",
    fontSize:"64px",
    fontWeight:"800",
    letterSpacing:"2px",
    boxShadow:
        "0 18px 45px rgba(37,99,235,.35)"

},

upload:{

    padding:"13px 26px",
    borderRadius:"16px",
    background:
        "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color:"#ffffff",
    fontWeight:"700",
    fontSize:"14px",
    cursor:"pointer",
    boxShadow:
        "0 12px 30px rgba(37,99,235,.25)",
    transition:"all .25s ease"

},

info:{

    flex:1,
    minWidth:"320px"

},

role:{

    display:"inline-flex",
    alignItems:"center",
    justifyContent:"center",
    marginTop:"10px",
    padding:"9px 20px",
    borderRadius:"999px",
    background:"#dbeafe",
    color:"#1d4ed8",
    fontWeight:"700",
    fontSize:"13px",
    letterSpacing:".3px"

},

grid:{

    display:"grid",
    gridTemplateColumns:
        "repeat(auto-fit,minmax(240px,1fr))",
    gap:"22px",
    marginTop:"35px"

},
infoItem:{

    background:"#ffffff",
    border:"1px solid #e2e8f0",
    borderRadius:"20px",
    padding:"22px",
    display:"flex",
    flexDirection:"column",
    gap:"10px",
    transition:"all .25s ease",
    boxShadow:"0 8px 25px rgba(15,23,42,.05)"

},

passwordCard:{

    marginTop:"35px",
    background:"#ffffff",
    borderRadius:"32px",
    padding:"35px 40px",
    border:"1px solid #e2e8f0",
    boxShadow:"0 20px 60px rgba(15,23,42,.08)",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    gap:"30px",
    flexWrap:"wrap"

},

button:{

    background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
    color:"#ffffff",
    border:"none",
    borderRadius:"16px",
    padding:"15px 32px",
    fontSize:"15px",
    fontWeight:"700",
    cursor:"pointer",
    transition:"all .25s ease",
    boxShadow:"0 12px 30px rgba(37,99,235,.28)"

},

loading:{

    background:"#ffffff",
    borderRadius:"28px",
    padding:"80px 40px",
    textAlign:"center",
    fontSize:"18px",
    fontWeight:"600",
    color:"#475569",
    border:"1px solid #e2e8f0",
    boxShadow:"0 20px 60px rgba(15,23,42,.08)"

},

modalOverlay:{

    position:"fixed",
    top:0,
    left:0,
    right:0,
    bottom:0,
    background:"rgba(15,23,42,.65)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"25px",
    backdropFilter:"blur(10px)",
    zIndex:9999

},

passwordModal:{

    width:"560px",
    maxWidth:"100%",
    background:"#ffffff",
    borderRadius:"30px",
    overflow:"hidden",
    border:"1px solid #e2e8f0",
    boxShadow:"0 35px 90px rgba(15,23,42,.30)",
    animation:"fadeIn .3s ease",
    position:"relative"

},

modalHeader:{

    display:"flex",
    justifyContent:"space-between",
    alignItems:"flex-start",
    padding:"30px 35px",
    background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
    color:"#ffffff"

},

closeButton:{

    width:"44px",
    height:"44px",
    border:"none",
    borderRadius:"50%",
    background:"rgba(255,255,255,.18)",
    color:"#ffffff",
    fontSize:"28px",
    cursor:"pointer",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    transition:"all .25s ease"

},

formGroup:{

    display:"flex",
    flexDirection:"column",
    gap:"10px",
    padding:"0 35px",
    marginBottom:"24px"

},
passwordLabel:{

    fontSize:"14px",
    fontWeight:"700",
    color:"#1e293b",
    letterSpacing:".2px"

},

passwordInput:{

    width:"100%",
    padding:"16px 18px",
    borderRadius:"16px",
    border:"1px solid #dbe4f0",
    background:"#f8fafc",
    color:"#0f172a",
    fontSize:"15px",
    fontWeight:"500",
    outline:"none",
    boxSizing:"border-box",
    transition:"all .25s ease",
    boxShadow:"inset 0 1px 2px rgba(15,23,42,.04)"

},

passwordInputFocus:{

    border:"1px solid #2563eb",
    boxShadow:"0 0 0 4px rgba(37,99,235,.15)"

},

formGroupLabel:{

    fontSize:"14px",
    fontWeight:"700",
    color:"#334155",
    marginBottom:"8px"

},

formGroupInput:{

    width:"100%",
    padding:"16px 18px",
    borderRadius:"16px",
    border:"1px solid #dbe4f0",
    background:"#f8fafc",
    color:"#0f172a",
    fontSize:"15px",
    outline:"none",
    boxSizing:"border-box",
    transition:"all .25s ease"

},

passwordActions:{

    display:"flex",
    gap:"18px",
    padding:"10px 35px 35px",
    marginTop:"10px"

},

cancelButton:{

    flex:1,
    height:"54px",
    border:"1px solid #cbd5e1",
    borderRadius:"16px",
    background:"#ffffff",
    color:"#475569",
    fontWeight:"700",
    fontSize:"15px",
    cursor:"pointer",
    transition:"all .25s ease"

},

updatePasswordButton:{

    flex:1,
    height:"54px",
    border:"none",
    borderRadius:"16px",
    background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
    color:"#ffffff",
    fontWeight:"700",
    fontSize:"15px",
    cursor:"pointer",
    transition:"all .25s ease",
    boxShadow:"0 12px 30px rgba(37,99,235,.30)"

}

};




export default Profile;
