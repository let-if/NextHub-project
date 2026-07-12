

import { 
  useEffect,
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


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


const result = await createRequest(form);



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


<div style={styles.backgroundShape}></div>



<div style={styles.card}>


{/* HEADER */}


<div style={styles.header}>


<div style={styles.iconBox}>

📋

</div>


<h1 style={styles.title}>

Create Work Request

</h1>



<p style={styles.subtitle}>

Submit your issue to the correct department and track the progress easily.

</p>



</div>








{/* MESSAGE */}



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


<span>

{

success

?

"✓"

:

"⚠"

}

</span>


{message}


</div>


}










<form onSubmit={handleSubmit}>





{/* TITLE */}


<div style={styles.field}>


<label style={styles.label}>

📝 Request Title

</label>


<input


type="text"


name="title"


value={form.title}


placeholder="Example: Printer is not working"


onChange={handleChange}


required


style={styles.input}


/>


</div>









{/* DESCRIPTION */}



<div style={styles.field}>


<label style={styles.label}>

📄 Description

</label>



<textarea


name="description"


rows="5"


value={form.description}


placeholder="Describe your problem clearly..."


onChange={handleChange}


required


style={styles.textarea}


/>



</div>









{/* DEPARTMENT */}



<div style={styles.field}>


<label style={styles.label}>

🏢 Department

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

loadingDepartments

?

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



</div>









{/* CATEGORY + PRIORITY */}



<div style={styles.twoColumns}>


<div style={styles.field}>


<label style={styles.label}>

📂 Category

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



</div>










<div style={styles.field}>


<label style={styles.label}>

🚦 Priority

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



</div>



</div>









{/* PRIORITY INFO */}



<div style={styles.priorityBox}>


<div>

<strong>

Priority Guide

</strong>


<p>

Urgent requests are handled first. Choose priority carefully.

</p>


</div>



<div style={styles.priorityTags}>


<span style={styles.low}>

Low

</span>



<span style={styles.medium}>

Medium

</span>



<span style={styles.high}>

High

</span>



<span style={styles.urgent}>

Urgent

</span>



</div>


</div>









{/* BUTTON */}



<button


type="submit"


disabled={loading}


style={{

...styles.button,

opacity:

loading

?

0.7

:

1

}}



>



{

loading

?

"⏳ Submitting Request..."

:

"🚀 Create Request"

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

background:

"linear-gradient(135deg,#f8fafc,#eef2ff)",

display:"flex",

justifyContent:"center",

alignItems:"center",

padding:"50px 20px",

position:"relative",

fontFamily:

"Inter, Arial, sans-serif"


},






backgroundShape:{


position:"absolute",

width:"450px",

height:"450px",

background:

"linear-gradient(135deg,#2563eb,#7c3aed)",

borderRadius:"50%",

filter:"blur(120px)",

opacity:"0.15",

top:"-120px",

right:"-120px"


},







card:{


position:"relative",

zIndex:2,

width:"100%",

maxWidth:"850px",

background:"#ffffff",

borderRadius:"30px",

padding:"45px",

boxShadow:

"0 25px 60px rgba(15,23,42,.12)"


},







header:{


textAlign:"center",

marginBottom:"35px"


},







iconBox:{


width:"85px",

height:"85px",

margin:"auto",

borderRadius:"25px",

background:

"linear-gradient(135deg,#2563eb,#1d4ed8)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"45px",

boxShadow:

"0 15px 30px rgba(37,99,235,.3)"


},







title:{


fontSize:"34px",

fontWeight:"800",

color:"#0f172a",

margin:"20px 0 10px"


},







subtitle:{


color:"#64748b",

fontSize:"16px",

lineHeight:"1.6",

maxWidth:"600px",

margin:"auto"


},







alert:{


display:"flex",

alignItems:"center",

gap:"12px",

padding:"16px 20px",

borderRadius:"15px",

marginBottom:"25px",

fontWeight:"600",

fontSize:"15px"


},







field:{


marginBottom:"22px"


},







label:{


display:"block",

marginBottom:"9px",

fontWeight:"700",

fontSize:"15px",

color:"#334155"


},







input:{


width:"100%",

padding:"15px 16px",

borderRadius:"14px",

border:

"1px solid #cbd5e1",

fontSize:"15px",

background:"#ffffff",

outline:"none",

boxSizing:"border-box",

transition:"all .2s"


},







textarea:{


width:"100%",

padding:"15px 16px",

borderRadius:"14px",

border:

"1px solid #cbd5e1",

fontSize:"15px",

resize:"vertical",

outline:"none",

boxSizing:"border-box",

fontFamily:"inherit"


},







twoColumns:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(250px,1fr))",

gap:"20px"


},







priorityBox:{


background:"#f8fafc",

border:

"1px solid #e2e8f0",

borderRadius:"18px",

padding:"20px",

display:"flex",

justifyContent:"space-between",

alignItems:"center",

gap:"20px",

flexWrap:"wrap",

marginBottom:"25px"


},







priorityTags:{


display:"flex",

gap:"8px",

flexWrap:"wrap"


},







low:{


background:"#dcfce7",

color:"#166534",

padding:"6px 14px",

borderRadius:"20px",

fontSize:"13px",

fontWeight:"700"


},







medium:{


background:"#dbeafe",

color:"#1d4ed8",

padding:"6px 14px",

borderRadius:"20px",

fontSize:"13px",

fontWeight:"700"


},







high:{


background:"#ffedd5",

color:"#c2410c",

padding:"6px 14px",

borderRadius:"20px",

fontSize:"13px",

fontWeight:"700"


},







urgent:{


background:"#fee2e2",

color:"#b91c1c",

padding:"6px 14px",

borderRadius:"20px",

fontSize:"13px",

fontWeight:"700"


},







button:{


width:"100%",

padding:"16px",

border:"none",

borderRadius:"15px",

background:

"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#ffffff",

fontSize:"17px",

fontWeight:"800",

cursor:"pointer",

boxShadow:

"0 15px 30px rgba(37,99,235,.3)",

transition:"all .3s"


}




};





export default CreateRequest;