
import { 
  useEffect, 
  useState 
} from "react";


import {
  getMyRequests,
  deleteRequest,
  updateRequest,
  updateRequestStatus,
  assignRequest,
  getRequestById
} from "../../services/requestService";



function MyRequests(){


const [requests,setRequests]=useState([]);

const [loading,setLoading]=useState(true);


const [selected,setSelected]=useState(null);


const [modal,setModal]=useState(null);



const loadRequests=async()=>{


try{


setLoading(true);


const result =
await getMyRequests();


setRequests(
result.requests || []
);



}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};





useEffect(()=>{

loadRequests();

},[]);







// =============================
// DELETE
// =============================


const handleDelete=async(id)=>{


const confirm =
window.confirm(
"Are you sure you want to delete this request?"
);


if(!confirm)return;



try{


await deleteRequest(id);


loadRequests();



}
catch(error){

console.log(error);

}


};







// =============================
// VIEW
// =============================


const handleView=async(id)=>{


try{


const result =
await getRequestById(id);


setSelected(
result.request
);


setModal("view");


}

catch(error){

console.log(error);

}


};









// =============================
// STATUS
// =============================


const changeStatus=async(
id,
status
)=>{


try{


await updateRequestStatus(
id,
status
);


loadRequests();


}

catch(error){

console.log(error);

}


};









if(loading){


return(

<div style={styles.loading}>

Loading requests...

</div>

);

}







return(

<div style={styles.page}>


<div style={styles.header}>


<div>

<h1 style={styles.title}>
📋 My Work Requests
</h1>


<p style={styles.subtitle}>
Manage and track your submitted requests
</p>


</div>


<div style={styles.badge}>
{requests.length} Requests
</div>


</div>







<div style={styles.card}>


<table style={styles.table}>


<thead>
<tr>

<th style={styles.th}>
Request No
</th>

<th style={styles.th}>
Title
</th>

<th style={styles.th}>
Priority
</th>

<th style={styles.th}>
Status
</th>

<th style={styles.th}>
Department
</th>

<th style={styles.th}>
Actions
</th>

</tr>
</thead>




<tbody>


{
requests.length===0?

<tr>

<td
colSpan="6"
style={styles.empty}
>

No requests found

</td>

</tr>


:


requests.map((request)=>(


<tr key={request.id}>


<td style={styles.code}>

{request.request_number}

</td>



<td>

<strong>
{request.title}
</strong>

</td>




<td>

<span
style={{
...styles.priority,
background:
priorityColor(
request.priority
)
}}
>

{request.priority}

</span>

</td>





<td>


<select

value={request.status}

onChange={(e)=>
changeStatus(
request.id,
e.target.value
)
}

style={styles.select}

>


<option>
Pending
</option>

<option>
Assigned
</option>

<option>
In Progress
</option>

<option>
Completed
</option>

<option>
Rejected
</option>


</select>


</td>






<td>

{
request.department_name || "-"
}

</td>






<td>


<div style={styles.actions}>


<button

onClick={()=>
handleView(request.id)
}

style={styles.view}

>

👁 View

</button>




<button

onClick={()=>{

setSelected(request);

setModal("edit");

}}

style={styles.edit}

>

✏ Edit

</button>






<button

onClick={()=>
handleDelete(request.id)
}

style={styles.delete}

>

🗑 Delete

</button>



</div>



</td>





</tr>


))

}


</tbody>


</table>


</div>








{
modal &&

<div style={styles.overlay}>


<div style={styles.modal}>


<button

style={styles.close}

onClick={()=>setModal(null)}

>

✕

</button>






{
modal==="view" && selected &&

<>


<h2>
Request Details
</h2>


<p>
<b>Request No:</b>
{" "}
{selected.request_number}
</p>


<p>
<b>Title:</b>
{" "}
{selected.title}
</p>


<p>
<b>Description:</b>
{" "}
{selected.description}
</p>


<p>
<b>Status:</b>
{" "}
{selected.status}
</p>


</>

}









{
modal==="edit" && selected &&

<EditForm

request={selected}

close={()=>setModal(null)}

refresh={loadRequests}

/>

}




</div>


</div>


}



</div>

);


}











// EDIT FORM COMPONENT


function EditForm({
request,
close,
refresh
}){


const [form,setForm]=useState({

title:request.title,

description:request.description,

category:request.category,

priority:request.priority,

department_id:request.department_id


});





const save=async()=>{


await updateRequest(

request.id,

form

);


close();

refresh();


};





return(

<div>


<h2>
Edit Request
</h2>


<input

style={styles.input}

value={form.title}

onChange={(e)=>

setForm({

...form,

title:e.target.value

})

}

/>



<textarea

style={styles.textarea}

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

/>





<button

style={styles.save}

onClick={save}

>

Save Changes

</button>


</div>

);


}








function priorityColor(priority){


switch(priority){

case "Urgent":
return "#dc2626";

case "High":
return "#ea580c";

case "Medium":
return "#2563eb";

case "Low":
return "#16a34a";

default:
return "#64748b";


}


}










const styles={


page:{

padding:"35px",

background:"#f8fafc",

minHeight:"100vh"

},


header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"30px"

},



title:{

fontSize:"34px",

color:"#0f172a"

},



subtitle:{

color:"#64748b"

},



badge:{

background:"#2563eb",

color:"#fff",

padding:"12px 22px",

borderRadius:"30px",

fontWeight:"700"

},



card:{

background:"#fff",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 15px 35px rgba(0,0,0,.08)"

},




table:{

width:"100%",

borderCollapse:"collapse"

},



actions:{

display:"flex",

gap:"8px"

},



view:{

background:"#0ea5e9",

color:"#fff",

border:"none",

padding:"8px 12px",

borderRadius:"8px"

},


edit:{

background:"#2563eb",

color:"#fff",

border:"none",

padding:"8px 12px",

borderRadius:"8px"

},



delete:{

background:"#dc2626",

color:"#fff",

border:"none",

padding:"8px 12px",

borderRadius:"8px"

},



priority:{

color:"#fff",

padding:"6px 12px",

borderRadius:"20px",

fontSize:"12px"

},



select:{

padding:"8px",

borderRadius:"8px"

},



// code:{

// color:"#2563eb",

// fontWeight:"700"

// },
code:{
  color:"#2563eb",
  fontWeight:"700",
  paddingLeft:"40px"
},



overlay:{

position:"fixed",

inset:0,

background:"rgba(0,0,0,.4)",

display:"flex",

justifyContent:"center",

alignItems:"center"

},



modal:{

background:"#fff",

width:"500px",

padding:"30px",

borderRadius:"20px",

position:"relative"

},



close:{

position:"absolute",

right:"20px",

top:"15px",

border:"none",

fontSize:"22px"

},



input:{

width:"100%",

padding:"12px",

marginBottom:"15px"

},



textarea:{

width:"100%",

height:"120px",

padding:"12px",

marginBottom:"15px"

},



save:{

background:"#2563eb",

color:"#fff",

border:"none",

padding:"12px 25px",

borderRadius:"10px"

},



empty:{

padding:"50px",

textAlign:"center"

},



loading:{

padding:"50px",

textAlign:"center"

},
th:{
  padding:"18px",
  textAlign:"left",
  fontWeight:"700",
  color:"#475569",
  borderBottom:"2px solid #e2e8f0",
  position:"relative",
  left:"-8px"
},

td:{
  padding:"18px 18px 18px 40px",
  color:"#334155",
  fontSize:"15px",
  borderBottom:"1px solid #eef2f7"
},



};



export default MyRequests; 
