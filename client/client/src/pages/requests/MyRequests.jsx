 
import {
  useEffect,
  useState
} from "react";


import {
  getMyRequests,
  deleteRequest,
  updateRequest,
  updateRequestStatus,
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

<div style={styles.loadingContainer}>


<div style={styles.loader}></div>


<h2>

Loading Requests

</h2>


<p>

Fetching your submitted work requests...

</p>


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

Manage, track and update your submitted requests

</p>


</div>





<div style={styles.countCard}>


<span>

Total Requests

</span>


<strong>

{requests.length}

</strong>


</div>


</div>









<div style={styles.tableCard}>


<div style={styles.tableWrapper}>


<table style={styles.table}>


<thead>


<tr>


<th style={styles.th}>
Request No
</th>



<th style={styles.th}>
Request Title
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

requests.length===0 ?


<tr>


<td

colSpan="6"

style={styles.empty}

>


<div style={styles.emptyIcon}>

📭

</div>


<h3>

No Requests Found

</h3>


<p>

You have not submitted any work requests yet.

</p>


</td>


</tr>





:

requests.map((request)=>(



<tr

key={request.id}

style={styles.row}

>



<td style={styles.requestNumber}>


#{request.request_number}


</td>







<td style={styles.titleCell}>


<strong>

{request.title}

</strong>



<p>

{request.description?.substring(0,50)}

</p>


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


style={styles.statusSelect}


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









<td style={styles.department}>


<div>

🏢

</div>


<span>

{
request.department_name || "-"
}

</span>


</td>










<td>


<div style={styles.actions}>


<button

style={styles.viewButton}

onClick={()=>handleView(request.id)}

>

👁

</button>






<button

style={styles.editButton}

onClick={()=>{

setSelected(request);

setModal("edit");

}}

>

✏

</button>







<button

style={styles.deleteButton}

onClick={()=>handleDelete(request.id)}

>

🗑

</button>



</div>


</td>




</tr>



))


}



</tbody>


</table>


</div>


</div>










{

modal &&


<div style={styles.overlay}>


<div style={styles.modal}>


<button

style={styles.close}

onClick={()=>setModal(null)}

>

×


</button>









{

modal==="view" && selected &&


<div>


<h2 style={styles.modalTitle}>

Request Details

</h2>




<div style={styles.detailBox}>


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

</p>


<div style={styles.description}>

{selected.description}

</div>





<p>

<b>Status:</b>

{" "}

<span>

{selected.status}

</span>

</p>



</div>



</div>


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


try{


await updateRequest(

request.id,

form

);


close();

refresh();


}

catch(error){

console.log(error);

}


};







return(

<div>


<h2 style={styles.modalTitle}>

✏ Edit Request

</h2>




<div style={styles.formGroup}>


<label>

Request Title

</label>



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


</div>








<div style={styles.formGroup}>


<label>

Description

</label>



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


</div>









<div style={styles.formGroup}>


<label>

Priority

</label>



<select

style={styles.input}

value={form.priority}

onChange={(e)=>

setForm({

...form,

priority:e.target.value

})

}

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







<button

style={styles.saveButton}

onClick={save}

>

💾 Save Changes

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

marginBottom:"30px",

flexWrap:"wrap",

gap:"20px"


},






title:{


fontSize:"34px",

fontWeight:"750",

color:"#0f172a",

margin:0


},





subtitle:{


color:"#64748b",

fontSize:"15px"


},






countCard:{


background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"white",

padding:"15px 25px",

borderRadius:"18px",

display:"flex",

flexDirection:"column",

alignItems:"center",

minWidth:"120px"


},





tableCard:{


background:"#ffffff",

borderRadius:"25px",

padding:"25px",

boxShadow:
"0 20px 50px rgba(0,0,0,.08)"


},





tableWrapper:{


overflowX:"auto"


},





table:{


width:"100%",

borderCollapse:"collapse"


},





th:{


padding:"18px",

background:"#f8fafc",

color:"#475569",

textAlign:"left",

fontWeight:"700",

fontSize:"14px",

borderBottom:"2px solid #e2e8f0"


},





row:{


borderBottom:"1px solid #eef2f7"


},





requestNumber:{


padding:"20px",

fontWeight:"700",

color:"#2563eb",

whiteSpace:"nowrap"


},





titleCell:{


padding:"20px",

minWidth:"230px"


},





department:{


display:"flex",

alignItems:"center",

gap:"8px",

padding:"20px",

color:"#475569"


},





priority:{


padding:"7px 15px",

borderRadius:"30px",

color:"#ffffff",

fontSize:"12px",

fontWeight:"700"


},





statusSelect:{


padding:"9px 12px",

borderRadius:"10px",

border:"1px solid #cbd5e1",

background:"#ffffff"


},





actions:{


display:"flex",

gap:"8px"

},






viewButton:{


background:"#0284c7",

color:"#fff",

border:"none",

padding:"10px",

borderRadius:"10px",

cursor:"pointer"


},






editButton:{


background:"#2563eb",

color:"#fff",

border:"none",

padding:"10px",

borderRadius:"10px",

cursor:"pointer"


},





deleteButton:{


background:"#dc2626",

color:"#fff",

border:"none",

padding:"10px",

borderRadius:"10px",

cursor:"pointer"


},




loadingContainer:{


minHeight:"400px",

background:"#ffffff",

borderRadius:"25px",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

boxShadow:
"0 15px 40px rgba(0,0,0,.08)"


},






loader:{


width:"55px",

height:"55px",

borderRadius:"50%",

border:"5px solid #e2e8f0",

borderTop:"5px solid #2563eb",

animation:
"spin 1s linear infinite",

marginBottom:"20px"


},







empty:{


padding:"70px 20px",

textAlign:"center",

color:"#64748b"


},






emptyIcon:{


fontSize:"45px",

marginBottom:"15px"


},






actionsWrapper:{


display:"flex",

gap:"10px"


},






overlay:{


position:"fixed",

inset:0,

background:"rgba(15,23,42,.55)",

display:"flex",

justifyContent:"center",

alignItems:"center",

zIndex:1000,

padding:"20px"


},






modal:{


background:"#ffffff",

width:"520px",

maxWidth:"100%",

padding:"35px",

borderRadius:"25px",

position:"relative",

boxShadow:
"0 25px 70px rgba(0,0,0,.25)"


},






close:{


position:"absolute",

right:"20px",

top:"15px",

width:"35px",

height:"35px",

borderRadius:"50%",

border:"none",

background:"#f1f5f9",

fontSize:"22px",

cursor:"pointer"


},






modalTitle:{


fontSize:"25px",

color:"#0f172a",

marginBottom:"25px"


},






detailBox:{


background:"#f8fafc",

padding:"20px",

borderRadius:"15px",

lineHeight:"1.8"

},






description:{


background:"#ffffff",

padding:"15px",

borderRadius:"10px",

border:"1px solid #e2e8f0",

marginBottom:"15px"


},






formGroup:{


marginBottom:"20px",

display:"flex",

flexDirection:"column",

gap:"8px"


},






input:{


padding:"14px",

borderRadius:"12px",

border:"1px solid #cbd5e1",

fontSize:"15px",

outline:"none"


},






textarea:{


height:"130px",

padding:"14px",

borderRadius:"12px",

border:"1px solid #cbd5e1",

fontSize:"15px",

resize:"vertical"


},






saveButton:{


width:"100%",

background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#ffffff",

border:"none",

padding:"15px",

borderRadius:"12px",

fontWeight:"700",

cursor:"pointer",

fontSize:"15px"


}




};





export default MyRequests;

