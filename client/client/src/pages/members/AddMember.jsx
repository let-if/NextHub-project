
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import DashboardLayout from "../../layouts/DashboardLayout";
// import API from "../../api/axios";


// function AddMember(){

// const navigate = useNavigate();


// const [form,setForm]=useState({

// first_name:"",
// last_name:"",
// email:"",
// phone:"",
// password:"",
// role_id:"3",
// department_id:"1"

// });


// const [image,setImage]=useState(null);

// const [preview,setPreview]=useState(null);


// const [message,setMessage]=useState("");

// const [loading,setLoading]=useState(false);





// const handleChange=(e)=>{

// setForm({

// ...form,

// [e.target.name]:e.target.value

// });

// };






// const handleImage=(e)=>{


// const file=e.target.files[0];


// if(file){


// setImage(file);


// setPreview(
// URL.createObjectURL(file)
// );


// }


// };






// const submit=async(e)=>{


// e.preventDefault();


// try{


// setLoading(true);


// const data=new FormData();



// data.append(
// "first_name",
// form.first_name
// );


// data.append(
// "last_name",
// form.last_name
// );


// data.append(
// "email",
// form.email
// );


// data.append(
// "phone",
// form.phone
// );


// data.append(
// "password",
// form.password
// );


// data.append(
// "role_id",
// form.role_id
// );


// data.append(
// "department_id",
// form.department_id
// );




// if(image){

// data.append(
// "profile_image",
// image
// );

// }





// const res = await API.post(

// "/members",

// data,

// {

// headers:{

// "Content-Type":"multipart/form-data"

// }

// }

// );





// setMessage(
// res.data.message
// );



// setTimeout(()=>{

// navigate("/members");

// },1500);



// }
// catch(error){


// console.log(error);


// setMessage(

// error.response?.data?.message ||

// "Error creating employee"

// );


// }
// finally{

// setLoading(false);

// }



// };







// return(


// <DashboardLayout>


// <div style={styles.page}>


// <div style={styles.card}>


// <div style={styles.header}>


// <h1>
// Add New Employee
// </h1>


// <p>
// Create a new NexusHub system member
// </p>


// </div>





// {
// message &&

// <div style={styles.message}>

// {message}

// </div>

// }








// <div style={styles.photoSection}>


// {
// preview ?

// <img

// src={preview}

// alt="preview"

// style={styles.photo}

// />


// :

// <div style={styles.avatar}>

// 👤

// </div>

// }



// <label style={styles.upload}>


// 📷 Upload Photo


// <input

// type="file"

// accept="image/*"

// onChange={handleImage}

// hidden

// />


// </label>



// </div>









// <form onSubmit={submit}>


// <div style={styles.grid}>


// <input

// name="first_name"

// placeholder="First Name"

// value={form.first_name}

// onChange={handleChange}

// style={styles.input}

// />




// <input

// name="last_name"

// placeholder="Last Name"

// value={form.last_name}

// onChange={handleChange}

// style={styles.input}

// />





// <input

// name="email"

// type="email"

// placeholder="Email Address"

// value={form.email}

// onChange={handleChange}

// style={styles.input}

// />





// <input

// name="phone"

// placeholder="Phone Number"

// value={form.phone}

// onChange={handleChange}

// style={styles.input}

// />





// <input

// name="password"

// type="password"

// placeholder="Temporary Password"

// value={form.password}

// onChange={handleChange}

// style={styles.input}

// />





// <select

// name="role_id"

// value={form.role_id}

// onChange={handleChange}

// style={styles.input}

// >


// <option value="3">
// Staff
// </option>


// <option value="2">
// Manager
// </option>


// <option value="4">
// Viewer
// </option>


// <option value="1">
// Administrator
// </option>


// </select>






// <select

// name="department_id"

// value={form.department_id}

// onChange={handleChange}

// style={styles.input}

// >


// <option value="1">
// IT
// </option>


// <option value="2">
// Human Resource
// </option>


// <option value="3">
// Finance
// </option>


// <option value="4">
// Administration
// </option>


// <option value="5">
// Maintenance
// </option>


// </select>



// </div>






// <button

// disabled={loading}

// style={styles.button}

// >


// {

// loading ?

// "Creating Employee..."

// :

// "Create Employee"

// }



// </button>






// </form>




// </div>


// </div>


// </DashboardLayout>


// );


// }









// const styles={



// page:{


// display:"flex",

// justifyContent:"center",

// padding:"20px"


// },




// card:{


// background:"#fff",

// width:"100%",

// maxWidth:"800px",

// padding:"40px",

// borderRadius:"25px",

// boxShadow:"0 20px 40px rgba(0,0,0,.08)"


// },




// header:{


// marginBottom:30


// },



// message:{


// background:"#dcfce7",

// color:"#166534",

// padding:"15px",

// borderRadius:"10px",

// marginBottom:20


// },





// photoSection:{


// textAlign:"center",

// marginBottom:30


// },





// photo:{


// width:140,

// height:140,

// borderRadius:"50%",

// objectFit:"cover",

// border:"5px solid #2563eb"


// },





// avatar:{


// width:140,

// height:140,

// borderRadius:"50%",

// background:"#e2e8f0",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontSize:50,

// margin:"auto"


// },





// upload:{


// display:"inline-block",

// marginTop:15,

// background:"#2563eb",

// color:"white",

// padding:"10px 20px",

// borderRadius:10,

// cursor:"pointer"


// },






// grid:{


// display:"grid",

// gridTemplateColumns:
// "repeat(auto-fit,minmax(250px,1fr))",

// gap:20


// },






// input:{


// padding:"14px",

// borderRadius:10,

// border:"1px solid #cbd5e1",

// fontSize:15


// },






// button:{


// marginTop:30,

// width:"100%",

// padding:"15px",

// background:"#2563eb",

// color:"white",

// border:"none",

// borderRadius:12,

// fontSize:16,

// fontWeight:"600",

// cursor:"pointer"


// }



// };



// export default AddMember;
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





<div style={styles.container}>


{/* =========================
PAGE HEADER
========================= */}



<div style={styles.header}>


<div>


<h1 style={styles.title}>

Create New Employee

</h1>


<p style={styles.subtitle}>

Add a new member to the NexusHub organization system

</p>



</div>





<div style={styles.headerIcon}>

👤+

</div>



</div>








{

message &&


<div style={styles.message}>


<div style={styles.messageIcon}>

✓

</div>


{message}



</div>



}









{/* =========================
PROFILE SECTION
========================= */}



<div style={styles.profileCard}>


<h3 style={styles.sectionTitle}>

Profile Photo

</h3>



<p style={styles.sectionText}>

Upload employee profile picture for identification

</p>







<div style={styles.photoArea}>


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






<label style={styles.uploadButton}>


<span>

📷

</span>


Upload Photo



<input


type="file"


accept="image/*"


onChange={handleImage}


hidden


/>



</label>






</div>




</div>







{/* FORM CONTINUES IN PART 2 */}







{/* =========================
EMPLOYEE INFORMATION FORM
========================= */}



<form onSubmit={submit}>


<div style={styles.formCard}>


<div style={styles.sectionHeader}>


<div>


<h3 style={styles.sectionTitle}>

Employee Information

</h3>


<p style={styles.sectionText}>

Enter employee account and organizational details

</p>


</div>


</div>









<div style={styles.grid}>






<div style={styles.field}>


<label style={styles.label}>

First Name

</label>



<input


name="first_name"


placeholder="Enter first name"


value={form.first_name}


onChange={handleChange}


style={styles.input}


/>



</div>









<div style={styles.field}>


<label style={styles.label}>

Last Name

</label>



<input


name="last_name"


placeholder="Enter last name"


value={form.last_name}


onChange={handleChange}


style={styles.input}


/>



</div>









<div style={styles.field}>


<label style={styles.label}>

Email Address

</label>



<input


name="email"


type="email"


placeholder="employee@email.com"


value={form.email}


onChange={handleChange}


style={styles.input}


/>



</div>









<div style={styles.field}>


<label style={styles.label}>

Phone Number

</label>



<input


name="phone"


placeholder="+251 9XXXXXXXX"


value={form.phone}


onChange={handleChange}


style={styles.input}


/>



</div>









<div style={styles.field}>


<label style={styles.label}>

Temporary Password

</label>



<input


name="password"


type="password"


placeholder="Create password"


value={form.password}


onChange={handleChange}


style={styles.input}


/>



</div>









<div style={styles.field}>


<label style={styles.label}>

System Role

</label>



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



</div>









<div style={styles.field}>


<label style={styles.label}>

Department

</label>



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







</div>









<button


disabled={loading}


style={styles.submitButton}



>



{


loading ?



<div style={styles.loadingButton}>


<span style={styles.smallLoader}></span>


Creating Employee...


</div>





:


<div style={styles.buttonContent}>


<span>

✓

</span>


Create Employee


</div>



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



/* =========================
PAGE
========================= */


page:{


width:"100%",


minHeight:"100%",


padding:"25px",


boxSizing:"border-box",


background:"#f8fafc"



},







container:{


width:"100%",


maxWidth:"1000px",


margin:"0 auto"



},







/* =========================
HEADER
========================= */


header:{


display:"flex",


justifyContent:"space-between",


alignItems:"center",


background:"linear-gradient(135deg,#ffffff,#f8fbff)",


padding:"30px",


borderRadius:"25px",


marginBottom:"25px",


boxShadow:"0 15px 40px rgba(15,23,42,.08)",


border:"1px solid #e2e8f0"



},






title:{


margin:0,


fontSize:"32px",


fontWeight:"900",


color:"#0f172a",


letterSpacing:"-.8px"



},






subtitle:{


marginTop:"8px",


marginBottom:0,


fontSize:"15px",


color:"#64748b"



},






headerIcon:{


width:"70px",


height:"70px",


display:"flex",


alignItems:"center",


justifyContent:"center",


borderRadius:"20px",


fontSize:"32px",


background:"linear-gradient(135deg,#2563eb,#1e40af)",


boxShadow:"0 15px 30px rgba(37,99,235,.3)"



},







/* =========================
MESSAGE
========================= */


message:{


display:"flex",


alignItems:"center",


gap:"12px",


background:"#dcfce7",


color:"#166534",


padding:"16px 20px",


borderRadius:"15px",


marginBottom:"25px",


fontWeight:"700",


boxShadow:"0 10px 25px rgba(22,101,52,.1)"



},






messageIcon:{


width:"30px",


height:"30px",


display:"flex",


alignItems:"center",


justifyContent:"center",


borderRadius:"50%",


background:"#22c55e",


color:"#ffffff"



},







/* =========================
PROFILE CARD
========================= */


profileCard:{


background:"#ffffff",


padding:"30px",


borderRadius:"25px",


marginBottom:"25px",


boxShadow:"0 15px 35px rgba(15,23,42,.08)",


border:"1px solid #e2e8f0"



},







sectionTitle:{


margin:0,


fontSize:"20px",


fontWeight:"850",


color:"#0f172a"



},






sectionText:{


marginTop:"6px",


marginBottom:"20px",


fontSize:"14px",


color:"#64748b"



},







photoArea:{


display:"flex",


flexDirection:"column",


alignItems:"center",


justifyContent:"center"



},







photo:{


width:"150px",


height:"150px",


borderRadius:"50%",


objectFit:"cover",


border:"6px solid #dbeafe",


boxShadow:"0 15px 30px rgba(37,99,235,.25)"



},






avatar:{


width:"150px",


height:"150px",


borderRadius:"50%",


display:"flex",


alignItems:"center",


justifyContent:"center",


fontSize:"55px",


background:"linear-gradient(135deg,#e2e8f0,#cbd5e1)",


boxShadow:"0 15px 30px rgba(15,23,42,.15)"



},







uploadButton:{


display:"flex",


alignItems:"center",


gap:"10px",


marginTop:"20px",


padding:"12px 25px",


borderRadius:"14px",


background:"linear-gradient(135deg,#2563eb,#1d4ed8)",


color:"#ffffff",


fontWeight:"800",


cursor:"pointer",


boxShadow:"0 12px 25px rgba(37,99,235,.25)"



},







/* =========================
FORM CARD
========================= */


formCard:{


background:"#ffffff",


padding:"30px",


borderRadius:"25px",


boxShadow:"0 15px 35px rgba(15,23,42,.08)",


border:"1px solid #e2e8f0"



},







sectionHeader:{


marginBottom:"25px"



},







grid:{


display:"grid",


gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",


gap:"22px"



},







field:{


display:"flex",


flexDirection:"column",


gap:"8px"



},







label:{


fontSize:"14px",


fontWeight:"800",


color:"#334155"



},






input:{


height:"50px",


padding:"0 16px",


borderRadius:"14px",


border:"1px solid #cbd5e1",


outline:"none",


fontSize:"14px",


color:"#334155",


background:"#ffffff",


transition:"all .2s"



},



submitButton:{

marginTop:"35px",

width:"100%",

height:"56px",

border:"none",

borderRadius:"16px",

background:"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#ffffff",

fontSize:"16px",

fontWeight:"800",

cursor:"pointer",

display:"flex",

alignItems:"center",

justifyContent:"center",

boxShadow:"0 18px 35px rgba(37,99,235,.25)",

transition:"all .25s ease"

},







buttonContent:{

display:"flex",

alignItems:"center",

justifyContent:"center",

gap:"10px",

fontWeight:"800"

},








loadingButton:{

display:"flex",

alignItems:"center",

justifyContent:"center",

gap:"12px",

fontWeight:"800"

},








smallLoader:{

width:"18px",

height:"18px",

borderRadius:"50%",

border:"3px solid rgba(255,255,255,.35)",

borderTop:"3px solid #ffffff"

},
smallLoader:{

width:"18px",

height:"18px",

borderRadius:"50%",

border:"3px solid rgba(255,255,255,.35)",

borderTop:"3px solid #ffffff",

animation:"spin 0.8s linear infinite"

}

};




export default AddMember;