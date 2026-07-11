
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { createRequest } from "../../services/requestService";

// // function CreateRequest() {
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     title: "",
// //     description: "",
// //     category: "Technical Support",
// //     priority: "Medium",
// //     department_id: 1,
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     setLoading(true);
// //     setMessage("");

// //     try {
// //       const result = await createRequest(form);

// //       setSuccess(true);
// //       setMessage(result.message);

// //       setTimeout(() => {
// //         navigate("/requests");
// //       }, 1500);
// //     } catch (error) {
// //       setSuccess(false);

// //       setMessage(
// //         error.response?.data?.message ||
// //         "Failed creating request."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={styles.page}>
// //       <div style={styles.card}>

// //         <div style={styles.header}>
// //           <div style={styles.icon}>📋</div>

// //           <h1 style={styles.title}>
// //             Create Work Request
// //           </h1>

// //           <p style={styles.subtitle}>
// //             Submit a new request to the appropriate department.
// //           </p>
// //         </div>

// //         {message && (
// //           <div
// //             style={{
// //               ...styles.alert,
// //               background: success ? "#dcfce7" : "#fee2e2",
// //               color: success ? "#166534" : "#b91c1c",
// //               border: success
// //                 ? "1px solid #86efac"
// //                 : "1px solid #fca5a5",
// //             }}
// //           >
// //             {message}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit}>

// //           <label style={styles.label}>
// //             Request Title
// //           </label>

// //           <input
// //             type="text"
// //             name="title"
// //             placeholder="Example: Printer not working"
// //             value={form.title}
// //             onChange={handleChange}
// //             required
// //             style={styles.input}
// //           />

// //           <label style={styles.label}>
// //             Description
// //           </label>

// //           <textarea
// //             name="description"
// //             rows="5"
// //             placeholder="Describe the issue in detail..."
// //             value={form.description}
// //             onChange={handleChange}
// //             required
// //             style={styles.textarea}
// //           />

// //           <label style={styles.label}>
// //             Category
// //           </label>

// //           <select
// //             name="category"
// //             value={form.category}
// //             onChange={handleChange}
// //             style={styles.input}
// //           >
// //             <option>Technical Support</option>
// //             <option>Equipment Request</option>
// //             <option>Software Installation</option>
// //             <option>Office Maintenance</option>
// //           </select>

// //           <label style={styles.label}>
// //             Priority
// //           </label>

// //           <select
// //             name="priority"
// //             value={form.priority}
// //             onChange={handleChange}
// //             style={styles.input}
// //           >
// //             <option>Low</option>
// //             <option>Medium</option>
// //             <option>High</option>
// //             <option>Urgent</option>
// //           </select>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             style={{
// //               ...styles.button,
// //               opacity: loading ? 0.8 : 1,
// //             }}
// //           >
// //             {loading
// //               ? "Submitting..."
// //               : "Create Request"}
// //           </button>

// //         </form>

// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   page: {
// //     minHeight: "100vh",
// //     background: "#f8fafc",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     padding: "40px",
// //     fontFamily: "Inter, Arial, sans-serif",
// //   },

// //   card: {
// //     width: "100%",
// //     maxWidth: "700px",
// //     background: "#ffffff",
// //     borderRadius: "18px",
// //     padding: "40px",
// //     boxShadow: "0 20px 45px rgba(0,0,0,.08)",
// //   },

// //   header: {
// //     textAlign: "center",
// //     marginBottom: "30px",
// //   },

// //   icon: {
// //     fontSize: "48px",
// //     marginBottom: "10px",
// //   },

// //   title: {
// //     margin: 0,
// //     color: "#0f172a",
// //     fontSize: "30px",
// //   },

// //   subtitle: {
// //     color: "#64748b",
// //     marginTop: "8px",
// //   },

// //   label: {
// //     display: "block",
// //     marginBottom: "8px",
// //     marginTop: "16px",
// //     fontWeight: "600",
// //     color: "#334155",
// //   },

// //   input: {
// //     width: "100%",
// //     padding: "14px",
// //     borderRadius: "10px",
// //     border: "1px solid #cbd5e1",
// //     outline: "none",
// //     fontSize: "15px",
// //     boxSizing: "border-box",
// //   },

// //   textarea: {
// //     width: "100%",
// //     padding: "14px",
// //     borderRadius: "10px",
// //     border: "1px solid #cbd5e1",
// //     outline: "none",
// //     resize: "vertical",
// //     fontSize: "15px",
// //     boxSizing: "border-box",
// //   },

// //   button: {
// //     width: "100%",
// //     marginTop: "30px",
// //     padding: "15px",
// //     border: "none",
// //     borderRadius: "10px",
// //     background: "#2563eb",
// //     color: "#ffffff",
// //     fontSize: "16px",
// //     fontWeight: "600",
// //     cursor: "pointer",
// //   },

// //   alert: {
// //     padding: "14px",
// //     borderRadius: "10px",
// //     marginBottom: "20px",
// //   },
// // };

// // export default CreateRequest;
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   createRequest,
//   getDepartments
// } from "../../services/requestService";


// function CreateRequest() {


// const navigate = useNavigate();


// const [departments,setDepartments]=useState([]);

// const [loadingDepartments,setLoadingDepartments]=useState(true);



// const [form,setForm]=useState({

// title:"",

// description:"",

// category:"Technical Support",

// priority:"Medium",

// department_id:""

// });



// const [loading,setLoading]=useState(false);

// const [message,setMessage]=useState("");

// const [success,setSuccess]=useState(false);





// // LOAD DEPARTMENTS

// useEffect(()=>{

// loadDepartments();

// },[]);





// const loadDepartments=async()=>{


// try{


// const result=await getDepartments();


// setDepartments(
// result.departments
// );


// }
// catch(error){

// console.log(error);

// }
// finally{

// setLoadingDepartments(false);

// }


// };







// const handleChange=(e)=>{


// setForm({

// ...form,

// [e.target.name]:e.target.value

// });


// };







// const handleSubmit=async(e)=>{


// e.preventDefault();


// if(!form.department_id){


// setSuccess(false);

// setMessage(
// "Please select a department"
// );


// return;

// }



// setLoading(true);

// setMessage("");



// try{


// const result=await createRequest(form);



// setSuccess(true);

// setMessage(result.message);



// setTimeout(()=>{

// navigate("/requests");

// },1500);



// }
// catch(error){


// setSuccess(false);


// setMessage(

// error.response?.data?.message ||

// "Failed creating request"

// );


// }
// finally{

// setLoading(false);

// }


// };








// return(


// <div style={styles.page}>


// <div style={styles.card}>


// <div style={styles.header}>


// <div style={styles.icon}>

// 📋

// </div>


// <h1 style={styles.title}>

// Create Work Request

// </h1>


// <p style={styles.subtitle}>

// Send your request to the correct department

// </p>


// </div>






// {
// message &&

// <div

// style={{

// ...styles.alert,

// background:success
// ?"#dcfce7"
// :"#fee2e2",

// color:success
// ?"#166534"
// :"#b91c1c"

// }}

// >

// {message}

// </div>

// }







// <form onSubmit={handleSubmit}>


// <label style={styles.label}>

// Request Title

// </label>



// <input

// type="text"

// name="title"

// placeholder="Example: Printer not working"

// value={form.title}

// onChange={handleChange}

// required

// style={styles.input}

// />







// <label style={styles.label}>

// Description

// </label>



// <textarea

// name="description"

// rows="5"

// placeholder="Describe the problem..."

// value={form.description}

// onChange={handleChange}

// required

// style={styles.textarea}

// />







// <label style={styles.label}>

// Department

// </label>



// <select

// name="department_id"

// value={form.department_id}

// onChange={handleChange}

// style={styles.input}

// required

// >


// <option value="">

// Select Department

// </option>



// {

// loadingDepartments ?


// <option>

// Loading departments...

// </option>


// :


// departments.map((department)=>(


// <option

// key={department.id}

// value={department.id}

// >


// {department.department_name}


// </option>


// ))


// }


// </select>








// <label style={styles.label}>

// Category

// </label>



// <select

// name="category"

// value={form.category}

// onChange={handleChange}

// style={styles.input}

// >


// <option>
// Technical Support
// </option>

// <option>
// Equipment Request
// </option>

// <option>
// Software Installation
// </option>

// <option>
// Office Maintenance
// </option>


// </select>








// <label style={styles.label}>

// Priority

// </label>



// <select

// name="priority"

// value={form.priority}

// onChange={handleChange}

// style={styles.input}

// >


// <option>
// Low
// </option>

// <option>
// Medium
// </option>

// <option>
// High
// </option>

// <option>
// Urgent
// </option>


// </select>








// <button

// type="submit"

// disabled={loading}

// style={{

// ...styles.button,

// opacity:loading?0.7:1

// }}

// >


// {

// loading

// ?

// "Submitting..."

// :

// "Create Request"

// }


// </button>





// </form>



// </div>


// </div>


// );


// }









// const styles={



// page:{


// minHeight:"100vh",

// background:"#f1f5f9",

// display:"flex",

// justifyContent:"center",

// alignItems:"center",

// padding:"40px",

// fontFamily:"Inter, Arial"

// },





// card:{


// width:"100%",

// maxWidth:"720px",

// background:"#fff",

// padding:"40px",

// borderRadius:"22px",

// boxShadow:"0 20px 50px rgba(0,0,0,.08)"


// },





// header:{


// textAlign:"center",

// marginBottom:"30px"


// },




// icon:{


// fontSize:"50px"


// },




// title:{


// fontSize:"30px",

// margin:"10px 0",

// color:"#0f172a"


// },





// subtitle:{


// color:"#64748b"


// },





// label:{


// display:"block",

// marginTop:"18px",

// marginBottom:"8px",

// fontWeight:"600",

// color:"#334155"


// },






// input:{


// width:"100%",

// padding:"14px",

// borderRadius:"12px",

// border:"1px solid #cbd5e1",

// fontSize:"15px",

// boxSizing:"border-box",

// outline:"none"


// },





// textarea:{


// width:"100%",

// padding:"14px",

// borderRadius:"12px",

// border:"1px solid #cbd5e1",

// fontSize:"15px",

// boxSizing:"border-box",

// resize:"vertical"


// },





// button:{


// width:"100%",

// marginTop:"30px",

// padding:"15px",

// border:"none",

// borderRadius:"12px",

// background:"#2563eb",

// color:"white",

// fontSize:"16px",

// fontWeight:"700",

// cursor:"pointer"


// },





// alert:{


// padding:"15px",

// borderRadius:"12px",

// marginBottom:"20px",

// fontWeight:"600"


// }


// };




// export default CreateRequest;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createRequest
} from "../../services/requestService";

import {
  getDepartments
} from "../../services/departmentService";


function CreateRequest(){

const navigate = useNavigate();


const [departments,setDepartments]=useState([]);

const [loadingDepartments,setLoadingDepartments]=useState(true);


const [form,setForm]=useState({

title:"",
description:"",
category:"Technical Support",
priority:"Medium",
department_id:""

});


const [loading,setLoading]=useState(false);

const [message,setMessage]=useState("");

const [success,setSuccess]=useState(false);




// LOAD DEPARTMENTS

useEffect(()=>{

loadDepartments();

},[]);



const loadDepartments=async()=>{


try{


const result = await getDepartments();


setDepartments(
result.departments || []
);


}
catch(error){

console.log(
"Department loading error",
error
);

}
finally{

setLoadingDepartments(false);

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



if(!form.department_id){


setSuccess(false);

setMessage(
"Please select a department before submitting"
);


return;

}




setLoading(true);

setMessage("");



try{


const result =
await createRequest(form);



setSuccess(true);

setMessage(
result.message
);




setTimeout(()=>{


navigate("/requests");


},1500);



}
catch(error){


console.log(error);


setSuccess(false);


setMessage(

error.response?.data?.message ||

"Failed creating request"

);


}
finally{

setLoading(false);

}



};







return(


<div style={styles.page}>


<div style={styles.card}>


<div style={styles.header}>


<div style={styles.icon}>
📋
</div>


<h1 style={styles.title}>
Create Work Request
</h1>


<p style={styles.subtitle}>
Submit your request to the correct department
</p>


</div>





{
message &&

<div

style={{

...styles.alert,

background:success
?"#dcfce7"
:"#fee2e2",

color:success
?"#166534"
:"#b91c1c"

}}

>

{message}

</div>

}





<form onSubmit={handleSubmit}>



<label style={styles.label}>
Request Title
</label>


<input

type="text"

name="title"

value={form.title}

placeholder="Example: Printer problem"

onChange={handleChange}

required

style={styles.input}

/>





<label style={styles.label}>
Description
</label>


<textarea

name="description"

rows="5"

value={form.description}

placeholder="Explain your problem..."

onChange={handleChange}

required

style={styles.textarea}

/>








<label style={styles.label}>
Department
</label>



<select

name="department_id"

value={form.department_id}

onChange={handleChange}

required

style={styles.input}

>


<option value="">
Select Department
</option>



{

loadingDepartments ?

<option>
Loading departments...
</option>


:

departments.map((dept)=>(


<option

key={dept.id}

value={dept.id}

>

{dept.department_name}

</option>


))


}



</select>









<label style={styles.label}>
Category
</label>



<select

name="category"

value={form.category}

onChange={handleChange}

style={styles.input}

>


<option>
Technical Support
</option>


<option>
Equipment Request
</option>


<option>
Software Installation
</option>


<option>
Office Maintenance
</option>


</select>








<label style={styles.label}>
Priority
</label>



<select

name="priority"

value={form.priority}

onChange={handleChange}

style={styles.input}

>


<option>
Low
</option>


<option>
Medium
</option>


<option>
High
</option>


<option>
Urgent
</option>


</select>







<button

type="submit"

disabled={loading}

style={{

...styles.button,

opacity:loading?0.7:1

}}

>


{
loading
?
"Submitting..."
:
"Create Request"
}


</button>





</form>


</div>


</div>


);


}







const styles={


page:{


minHeight:"100vh",

background:"#f8fafc",

display:"flex",

justifyContent:"center",

alignItems:"center",

padding:"40px",

fontFamily:"Inter, Arial"

},



card:{


width:"100%",

maxWidth:"720px",

background:"#ffffff",

padding:"40px",

borderRadius:"24px",

boxShadow:"0 20px 50px rgba(0,0,0,.08)"


},



header:{


textAlign:"center",

marginBottom:"30px"


},



icon:{


fontSize:"55px"

},



title:{


fontSize:"32px",

margin:"10px 0",

color:"#0f172a"

},



subtitle:{


color:"#64748b"

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

padding:"14px",

borderRadius:"12px",

border:"1px solid #cbd5e1",

fontSize:"15px",

boxSizing:"border-box",

background:"#fff"

},



textarea:{


width:"100%",

padding:"14px",

borderRadius:"12px",

border:"1px solid #cbd5e1",

fontSize:"15px",

resize:"vertical",

boxSizing:"border-box"

},



button:{


width:"100%",

marginTop:"30px",

padding:"15px",

border:"none",

borderRadius:"12px",

background:"#2563eb",

color:"#fff",

fontSize:"16px",

fontWeight:"700",

cursor:"pointer"

},



alert:{


padding:"15px",

borderRadius:"12px",

marginBottom:"20px",

fontWeight:"600"

}


};



export default CreateRequest;