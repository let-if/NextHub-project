
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";




function EditMember(){


const {id}=useParams();

const navigate=useNavigate();



const [form,setForm]=useState({

first_name:"",
last_name:"",
email:"",
phone:"",
role_id:"",
department_id:"",
status:"Active"

});



const [image,setImage]=useState(null);

const [preview,setPreview]=useState(null);


const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);







useEffect(()=>{

loadMember();

},[]);







const loadMember=async()=>{


try{


const res=await API.get(

`/members/${id}`

);


const m=res.data.member;



setForm({

first_name:m.first_name || "",

last_name:m.last_name || "",

email:m.email || "",

phone:m.phone || "",

role_id:m.role_id || "",

department_id:m.department_id || "",

status:m.status || "Active"

});





if(m.profile_image){

setPreview(

`http://localhost:5000/uploads/${m.profile_image}`

);

}



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};








const handleImage=(e)=>{


const file=e.target.files[0];


if(file){


setImage(file);


setPreview(

URL.createObjectURL(file)

);


}


};









const submit=async(e)=>{


e.preventDefault();


try{


setSaving(true);



const data=new FormData();



data.append("first_name",form.first_name);

data.append("last_name",form.last_name);

data.append("email",form.email);

data.append("phone",form.phone);

data.append("role_id",form.role_id);

data.append("department_id",form.department_id);

data.append("status",form.status);




if(image){

data.append(

"profile_image",

image

);

}





const res=await API.put(

`/members/${id}`,

data,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);




alert(

res.data.message ||

"Employee updated successfully"

);



navigate("/members");




}
catch(error){


console.log(

error.response?.data ||

error.message

);


alert(

"Update failed"

);


}
finally{


setSaving(false);


}


};




if(loading){

return(

<DashboardLayout>


<div style={styles.loadingCard}>


<div style={styles.spinner}></div>



<h2>

Loading Employee Information

</h2>



<p>

Please wait while we prepare the edit form...

</p>



</div>


</DashboardLayout>

);


}







return(


<DashboardLayout>


<div style={styles.page}>


<div style={styles.card}>


<div style={styles.header}>


<div>


<h1 style={styles.title}>

✏ Edit Employee

</h1>



<p style={styles.subtitle}>

Update employee information, department,
role and profile picture

</p>


</div>



<button

style={styles.backButton}

onClick={()=>navigate("/members")}

>

← Back

</button>



</div>







<div style={styles.photoSection}>


<div style={styles.photoWrapper}>


{

preview ?


<img

src={preview}

alt="preview"

style={styles.photo}

/>


:


<div style={styles.avatar}>

👤

</div>


}



</div>







<label style={styles.upload}>


📷 Change Profile Photo


<input

type="file"

accept="image/*"

onChange={handleImage}

hidden

/>


</label>




</div>









<form onSubmit={submit}>


<div style={styles.formSection}>


<h2>

Personal Information

</h2>



<div style={styles.grid}>



<input

name="first_name"

value={form.first_name}

onChange={handleChange}

placeholder="First Name"

style={styles.input}

/>





<input

name="last_name"

value={form.last_name}

onChange={handleChange}

placeholder="Last Name"

style={styles.input}

/>







<input

name="email"

value={form.email}

onChange={handleChange}

placeholder="Email Address"

type="email"

style={styles.input}

/>







<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Phone Number"

style={styles.input}

/>





</div>


</div>









<div style={styles.formSection}>


<h2>

Employment Information

</h2>



<div style={styles.grid}>


<select

name="role_id"

value={form.role_id}

onChange={handleChange}

style={styles.input}

>


<option value="">

Select Role

</option>


<option value="1">

Administrator

</option>


<option value="2">

Manager

</option>


<option value="3">

Staff

</option>


<option value="4">

Viewer

</option>



</select>









<select

name="department_id"

value={form.department_id}

onChange={handleChange}

style={styles.input}

>


<option value="">

Select Department

</option>


<option value="1">

IT

</option>


<option value="2">

Human Resource

</option>


<option value="3">

Finance

</option>


<option value="4">

Administration

</option>


<option value="5">

Maintenance

</option>


</select>









<select

name="status"

value={form.status}

onChange={handleChange}

style={styles.input}

>


<option value="Active">

Active

</option>



<option value="Inactive">

Inactive

</option>


</select>



</div>


</div>









<button

style={

saving

?

styles.buttonDisabled

:

styles.button

}

disabled={saving}

>


{

saving

?

"⏳ Saving Changes..."

:

"💾 Save Employee Changes"

}



</button>





</form>





</div>


</div>



</DashboardLayout>


);


}
const styles={




page:{


maxWidth:"1000px",

margin:"0 auto",

padding:"25px"


},






loadingCard:{


minHeight:"400px",

background:"#ffffff",

borderRadius:"25px",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

boxShadow:
"0 15px 45px rgba(0,0,0,.08)"


},






spinner:{


width:"55px",

height:"55px",

borderRadius:"50%",

border:"5px solid #e2e8f0",

borderTop:"5px solid #2563eb",

animation:"spin 1s linear infinite",

marginBottom:"20px"


},






card:{


background:"#ffffff",

borderRadius:"28px",

padding:"40px",

boxShadow:
"0 20px 50px rgba(15,23,42,.12)"


},






header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

gap:"20px",

marginBottom:"35px",

flexWrap:"wrap"


},






title:{


fontSize:"32px",

fontWeight:"750",

color:"#0f172a",

margin:"0 0 8px"


},






subtitle:{


color:"#64748b",

fontSize:"15px",

margin:0


},






backButton:{


background:"#475569",

color:"#ffffff",

border:"none",

padding:"12px 22px",

borderRadius:"12px",

cursor:"pointer",

fontWeight:"600",

fontSize:"15px"


},






photoSection:{


display:"flex",

flexDirection:"column",

alignItems:"center",

marginBottom:"40px"


},






photoWrapper:{


position:"relative",

marginBottom:"18px"


},






photo:{


width:"150px",

height:"150px",

borderRadius:"50%",

objectFit:"cover",

border:"6px solid #2563eb",

boxShadow:
"0 10px 30px rgba(37,99,235,.25)"


},






avatar:{


width:"150px",

height:"150px",

borderRadius:"50%",

background:
"linear-gradient(135deg,#1e293b,#475569)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"55px",

color:"#ffffff",

border:"6px solid white",

boxShadow:
"0 10px 30px rgba(0,0,0,.2)"


},






upload:{


background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#ffffff",

padding:"12px 25px",

borderRadius:"12px",

cursor:"pointer",

fontWeight:"600",

fontSize:"14px",

boxShadow:
"0 8px 20px rgba(37,99,235,.25)"


},







formSection:{


background:"#f8fafc",

padding:"25px",

borderRadius:"20px",

marginBottom:"25px",

border:"1px solid #e2e8f0"


},






grid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",

gap:"20px"


},






input:{


width:"100%",

boxSizing:"border-box",

padding:"15px",

borderRadius:"12px",

border:"1px solid #cbd5e1",

background:"#ffffff",

fontSize:"15px",

outline:"none"


},






button:{


width:"100%",

padding:"16px",

marginTop:"15px",

background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#ffffff",

border:"none",

borderRadius:"14px",

fontSize:"16px",

fontWeight:"700",

cursor:"pointer",

boxShadow:
"0 10px 25px rgba(37,99,235,.25)"


},






buttonDisabled:{


width:"100%",

padding:"16px",

marginTop:"15px",

background:"#94a3b8",

color:"#ffffff",

border:"none",

borderRadius:"14px",

fontSize:"16px",

fontWeight:"700",

cursor:"not-allowed"


}





};





export default EditMember;