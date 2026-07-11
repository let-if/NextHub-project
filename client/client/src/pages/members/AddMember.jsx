
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";


function AddMember(){

const navigate = useNavigate();


const [form,setForm]=useState({

first_name:"",
last_name:"",
email:"",
phone:"",
password:"",
role_id:"3",
department_id:"1"

});


const [image,setImage]=useState(null);

const [preview,setPreview]=useState(null);


const [message,setMessage]=useState("");

const [loading,setLoading]=useState(false);





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


setLoading(true);


const data=new FormData();



data.append(
"first_name",
form.first_name
);


data.append(
"last_name",
form.last_name
);


data.append(
"email",
form.email
);


data.append(
"phone",
form.phone
);


data.append(
"password",
form.password
);


data.append(
"role_id",
form.role_id
);


data.append(
"department_id",
form.department_id
);




if(image){

data.append(
"profile_image",
image
);

}





const res = await API.post(

"/members",

data,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);





setMessage(
res.data.message
);



setTimeout(()=>{

navigate("/members");

},1500);



}
catch(error){


console.log(error);


setMessage(

error.response?.data?.message ||

"Error creating employee"

);


}
finally{

setLoading(false);

}



};







return(


<DashboardLayout>


<div style={styles.page}>


<div style={styles.card}>


<div style={styles.header}>


<h1>
Add New Employee
</h1>


<p>
Create a new NexusHub system member
</p>


</div>





{
message &&

<div style={styles.message}>

{message}

</div>

}








<div style={styles.photoSection}>


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



<label style={styles.upload}>


📷 Upload Photo


<input

type="file"

accept="image/*"

onChange={handleImage}

hidden

/>


</label>



</div>









<form onSubmit={submit}>


<div style={styles.grid}>


<input

name="first_name"

placeholder="First Name"

value={form.first_name}

onChange={handleChange}

style={styles.input}

/>




<input

name="last_name"

placeholder="Last Name"

value={form.last_name}

onChange={handleChange}

style={styles.input}

/>





<input

name="email"

type="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}

style={styles.input}

/>





<input

name="phone"

placeholder="Phone Number"

value={form.phone}

onChange={handleChange}

style={styles.input}

/>





<input

name="password"

type="password"

placeholder="Temporary Password"

value={form.password}

onChange={handleChange}

style={styles.input}

/>





<select

name="role_id"

value={form.role_id}

onChange={handleChange}

style={styles.input}

>


<option value="3">
Staff
</option>


<option value="2">
Manager
</option>


<option value="4">
Viewer
</option>


<option value="1">
Administrator
</option>


</select>






<select

name="department_id"

value={form.department_id}

onChange={handleChange}

style={styles.input}

>


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



</div>






<button

disabled={loading}

style={styles.button}

>


{

loading ?

"Creating Employee..."

:

"Create Employee"

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


display:"flex",

justifyContent:"center",

padding:"20px"


},




card:{


background:"#fff",

width:"100%",

maxWidth:"800px",

padding:"40px",

borderRadius:"25px",

boxShadow:"0 20px 40px rgba(0,0,0,.08)"


},




header:{


marginBottom:30


},



message:{


background:"#dcfce7",

color:"#166534",

padding:"15px",

borderRadius:"10px",

marginBottom:20


},





photoSection:{


textAlign:"center",

marginBottom:30


},





photo:{


width:140,

height:140,

borderRadius:"50%",

objectFit:"cover",

border:"5px solid #2563eb"


},





avatar:{


width:140,

height:140,

borderRadius:"50%",

background:"#e2e8f0",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:50,

margin:"auto"


},





upload:{


display:"inline-block",

marginTop:15,

background:"#2563eb",

color:"white",

padding:"10px 20px",

borderRadius:10,

cursor:"pointer"


},






grid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",

gap:20


},






input:{


padding:"14px",

borderRadius:10,

border:"1px solid #cbd5e1",

fontSize:15


},






button:{


marginTop:30,

width:"100%",

padding:"15px",

background:"#2563eb",

color:"white",

border:"none",

borderRadius:12,

fontSize:16,

fontWeight:"600",

cursor:"pointer"


}



};



export default AddMember;