import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getDepartmentById,
  updateDepartment
} from "../../services/departmentService";



function EditDepartment(){

const {id}=useParams();

const navigate=useNavigate();


const [form,setForm]=useState({

department_name:"",
description:""

});


const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);

const [message,setMessage]=useState("");

const [success,setSuccess]=useState(false);





useEffect(()=>{

loadDepartment();

},[]);





const loadDepartment=async()=>{


try{


const data =
await getDepartmentById(id);



setForm({

department_name:
data.department.department_name,

description:
data.department.description || ""

});



}
catch(error){

console.log(error);

setMessage(
"Failed loading department."
);


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







const handleSubmit=async(e)=>{


e.preventDefault();



try{


setSaving(true);



const result =
await updateDepartment(
id,
form
);



setSuccess(true);

setMessage(
result.message ||
"Department updated successfully"
);



setTimeout(()=>{

navigate("/departments");

},1200);



}
catch(error){


setSuccess(false);


setMessage(

error.response?.data?.message ||

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

<div style={styles.loading}>

Loading department...

</div>

</DashboardLayout>

);

}





return(

<DashboardLayout>


<div style={styles.page}>


<div style={styles.header}>


<div>

<h1 style={styles.title}>

Edit Department

</h1>


<p style={styles.subtitle}>

Update department information

</p>


</div>



<Link

to="/departments"

style={styles.backButton}

>

← Back

</Link>


</div>





<div style={styles.card}>


<div style={styles.icon}>

🏢

</div>


<h2 style={styles.cardTitle}>

Department Information

</h2>


<p style={styles.cardSubtitle}>

Modify details and save changes.

</p>




{
message &&

<div

style={{

...styles.alert,

background:
success
?
"#dcfce7"
:
"#fee2e2",


color:
success
?
"#166534"
:
"#b91c1c"

}}

>

{message}

</div>

}






<form onSubmit={handleSubmit}>



<label style={styles.label}>

Department Name

</label>



<input

type="text"

name="department_name"

value={form.department_name}

onChange={handleChange}

style={styles.input}

required

/>





<label style={styles.label}>

Description

</label>


<textarea

name="description"

rows="6"

value={form.description}

onChange={handleChange}

style={styles.textarea}

/>



<div style={styles.buttonGroup}>


<button

type="button"

style={styles.cancelButton}

onClick={()=>navigate("/departments")}

>

Cancel

</button>





<button

type="submit"

disabled={saving}

style={{

...styles.saveButton,

opacity:saving ? 0.7 : 1

}}

>


{

saving

?

"Updating..."

:

"Update Department"

}


</button>


</div>




</form>


</div>


</div>


</DashboardLayout>


);


}






const styles={



page:{

width:"100%",

padding:"10px 0 30px"

},





header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"30px",

flexWrap:"wrap",

gap:"20px"

},




title:{

margin:0,

fontSize:"34px",

fontWeight:"700",

color:"#0f172a"

},




subtitle:{

marginTop:"8px",

color:"#64748b"

},




backButton:{

background:"#e2e8f0",

color:"#0f172a",

padding:"12px 22px",

borderRadius:"12px",

textDecoration:"none",

fontWeight:"600"

},




card:{

maxWidth:"760px",

margin:"0 auto",

background:"#fff",

padding:"40px",

borderRadius:"24px",

boxShadow:"0 18px 45px rgba(15,23,42,.08)"

},




icon:{

width:"90px",

height:"90px",

borderRadius:"20px",

background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontSize:"42px",

marginBottom:"20px"

},




cardTitle:{

fontSize:"28px",

margin:0,

color:"#0f172a"

},




cardSubtitle:{

color:"#64748b",

marginBottom:"30px"

},




label:{

display:"block",

marginTop:"18px",

marginBottom:"8px",

fontWeight:"600",

color:"#334155"

},




input:{

width:"100%",

padding:"14px 16px",

borderRadius:"12px",

border:"1px solid #cbd5e1",

fontSize:"15px",

outline:"none",

boxSizing:"border-box"

},




textarea:{

width:"100%",

padding:"14px 16px",

borderRadius:"12px",

border:"1px solid #cbd5e1",

fontSize:"15px",

resize:"vertical",

outline:"none",

boxSizing:"border-box"

},




alert:{

padding:"14px",

borderRadius:"12px",

marginBottom:"20px",

fontWeight:"600"

},




buttonGroup:{

display:"flex",

justifyContent:"flex-end",

gap:"15px",

marginTop:"35px"

},




cancelButton:{

padding:"14px 24px",

border:"none",

borderRadius:"12px",

background:"#e2e8f0",

cursor:"pointer",

fontWeight:"600"

},




saveButton:{

padding:"14px 26px",

border:"none",

borderRadius:"12px",

background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#fff",

cursor:"pointer",

fontWeight:"600",

boxShadow:
"0 12px 25px rgba(37,99,235,.3)"

},




loading:{

background:"#fff",

padding:"50px",

borderRadius:"20px",

textAlign:"center",

fontSize:"18px"

}



};




export default EditDepartment;