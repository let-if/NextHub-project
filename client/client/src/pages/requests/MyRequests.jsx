 
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

minHeight:"100vh",

padding:"40px",

background:
"radial-gradient(circle at top right,#dbeafe 0%,transparent 35%),linear-gradient(135deg,#f8fafc,#eef2ff)",

animation:"pageLoad .7s ease"

},




/* HEADER */


header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"50px",

flexWrap:"wrap",

gap:"25px"

},



title:{

fontSize:"46px",

fontWeight:"950",

letterSpacing:"-2px",

margin:0,


background:
"linear-gradient(90deg,#020617,#2563eb,#06b6d4)",


WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent"

},



subtitle:{

marginTop:"12px",

fontSize:"16px",

fontWeight:"600",

color:"#64748b"

},




countCard:{

position:"relative",

overflow:"hidden",

background:
"linear-gradient(135deg,#020617,#2563eb)",


color:"#fff",

padding:"25px 40px",

borderRadius:"35px",

minWidth:"190px",

display:"flex",

flexDirection:"column",

alignItems:"center",

boxShadow:
"0 30px 80px rgba(37,99,235,.45)",


animation:
"float 4s infinite"

},







/* TABLE CONTAINER */


tableCard:{

background:
"rgba(255,255,255,.65)",


backdropFilter:
"blur(30px)",


borderRadius:"40px",

padding:"35px",

border:
"1px solid rgba(255,255,255,.8)",


boxShadow:
"0 40px 100px rgba(15,23,42,.15)"

},




tableWrapper:{

overflowX:"auto",

borderRadius:"30px"

},




table:{

width:"100%",

borderCollapse:"separate",

borderSpacing:"0 18px"

},




th:{

padding:"18px 25px",

fontSize:"13px",

fontWeight:"900",

color:"#475569",

textTransform:"uppercase",

letterSpacing:"1px"

},




row:{

background:"#ffffff",

borderRadius:"25px",

transition:
"all .35s ease",

boxShadow:
"0 10px 30px rgba(15,23,42,.06)"

},




requestNumber:{

padding:"25px",

fontWeight:"950",

color:"#2563eb",

fontSize:"16px"

},




titleCell:{

padding:"25px",

minWidth:"280px"

},




department:{

padding:"25px",

display:"flex",

alignItems:"center",

gap:"12px",

fontWeight:"700",

color:"#475569"

},







/* PRIORITY */


priority:{

padding:"10px 22px",

borderRadius:"50px",

color:"#fff",

fontWeight:"900",

fontSize:"12px",

boxShadow:
"0 10px 25px rgba(0,0,0,.15)"

},





statusSelect:{

padding:"12px 18px",

borderRadius:"18px",

border:"1px solid #cbd5e1",

fontWeight:"800",

background:"#fff",

cursor:"pointer",

boxShadow:
"0 5px 15px rgba(0,0,0,.05)"

},







/* ACTIONS */


actions:{

display:"flex",

gap:"12px"

},




viewButton:{

width:"46px",

height:"46px",

borderRadius:"16px",

border:"none",

cursor:"pointer",

fontSize:"20px",

background:
"linear-gradient(135deg,#06b6d4,#0284c7)",

color:"#fff",

boxShadow:
"0 15px 35px rgba(6,182,212,.4)"

},




editButton:{

width:"46px",

height:"46px",

borderRadius:"16px",

border:"none",

cursor:"pointer",

fontSize:"20px",

background:
"linear-gradient(135deg,#6366f1,#2563eb)",

color:"#fff",

boxShadow:
"0 15px 35px rgba(37,99,235,.4)"

},





deleteButton:{

width:"46px",

height:"46px",

borderRadius:"16px",

border:"none",

cursor:"pointer",

fontSize:"20px",

background:
"linear-gradient(135deg,#fb7185,#dc2626)",

color:"#fff",

boxShadow:
"0 15px 35px rgba(220,38,38,.4)"

},







/* LOADING */


loadingContainer:{

height:"450px",

borderRadius:"40px",

background:
"rgba(255,255,255,.7)",

backdropFilter:
"blur(30px)",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

boxShadow:
"0 40px 90px rgba(15,23,42,.15)"

},




loader:{

width:"80px",

height:"80px",

borderRadius:"50%",

border:"8px solid #dbeafe",

borderTop:"8px solid #2563eb",

animation:
"spin 1s linear infinite"

},






/* EMPTY */


empty:{

padding:"100px",

textAlign:"center",

color:"#64748b"

},



emptyIcon:{

fontSize:"90px",

marginBottom:"25px"

},








/* MODAL */


overlay:{

position:"fixed",

inset:0,

background:
"rgba(2,6,23,.75)",

backdropFilter:
"blur(12px)",

display:"flex",

alignItems:"center",

justifyContent:"center",

zIndex:9999

},




modal:{

width:"600px",

maxWidth:"95%",

background:
"rgba(255,255,255,.95)",

backdropFilter:
"blur(40px)",


borderRadius:"40px",

padding:"45px",

boxShadow:
"0 60px 150px rgba(0,0,0,.4)",

position:"relative"

},




close:{

position:"absolute",

right:"25px",

top:"25px",

width:"45px",

height:"45px",

borderRadius:"50%",

border:"none",

background:"#f1f5f9",

fontSize:"28px",

cursor:"pointer"

},




modalTitle:{

fontSize:"32px",

fontWeight:"950",

color:"#020617"

},




detailBox:{

marginTop:"25px",

background:
"linear-gradient(145deg,#f8fafc,#ffffff)",

padding:"30px",

borderRadius:"25px",

lineHeight:"2"

},




description:{

background:"#fff",

padding:"20px",

borderRadius:"18px",

border:
"1px solid #e2e8f0"

},






/* FORM */


formGroup:{

display:"flex",

flexDirection:"column",

gap:"10px",

marginBottom:"25px"

},




input:{

padding:"16px",

borderRadius:"18px",

border:"1px solid #cbd5e1",

fontSize:"16px"

},



textarea:{

height:"150px",

padding:"16px",

borderRadius:"18px",

border:"1px solid #cbd5e1"

},




saveButton:{

width:"100%",

padding:"18px",

borderRadius:"20px",

border:"none",

background:
"linear-gradient(135deg,#2563eb,#06b6d4)",


color:"#fff",

fontWeight:"950",

fontSize:"17px",

boxShadow:
"0 20px 50px rgba(37,99,235,.4)"

}


};



export default MyRequests;

