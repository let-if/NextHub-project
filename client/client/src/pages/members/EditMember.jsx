
import {useEffect,useState} from "react";

import {useParams,useNavigate} from "react-router-dom";

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





// if(m.profile_image){


// setPreview(

// `http://localhost:5000/${m.profile_image}`

// );


// }
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

"role_id",

form.role_id

);



data.append(

"department_id",

form.department_id

);



data.append(

"status",

form.status

);





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


<h2>

Loading employee...

</h2>


</DashboardLayout>

);


}










return(


<DashboardLayout>



<div style={styles.page}>


<div style={styles.card}>


<h1>

✏ Edit Employee

</h1>



<p style={styles.subtitle}>

Update employee information and profile photo

</p>








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


Change Photo


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

placeholder="Email"

type="email"

style={styles.input}

/>





<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Phone"

style={styles.input}

/>






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


<option>

Active

</option>


<option>

Inactive

</option>


</select>





</div>







<button

style={styles.button}

disabled={saving}

>

{

saving

?

"Saving..."

:

"Save Changes"

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


maxWidth:"900px",

margin:"auto"

},






card:{


background:"white",

padding:"40px",

borderRadius:"25px",

boxShadow:"0 15px 40px rgba(0,0,0,.1)"

},





subtitle:{


color:"#64748b"

},






photoSection:{


textAlign:"center",

marginBottom:"30px"

},





photo:{


width:"130px",

height:"130px",

borderRadius:"50%",

objectFit:"cover",

border:"5px solid #2563eb"

},





avatar:{


width:"130px",

height:"130px",

borderRadius:"50%",

background:"#e2e8f0",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"50px",

margin:"auto"

},






upload:{


display:"inline-block",

marginTop:"15px",

padding:"10px 20px",

background:"#2563eb",

color:"white",

borderRadius:"10px",

cursor:"pointer"

},






grid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(250px,1fr))",

gap:"20px"

},






input:{


padding:"14px",

borderRadius:"10px",

border:"1px solid #ddd",

fontSize:"15px"

},






button:{


marginTop:"30px",

width:"100%",

padding:"15px",

background:"#2563eb",

color:"white",

border:"none",

borderRadius:"12px",

fontWeight:"700",

cursor:"pointer"

}



};




export default EditMember;