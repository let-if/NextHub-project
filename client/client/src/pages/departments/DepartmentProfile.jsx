
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";


function DepartmentProfile(){


const {id}=useParams();

const navigate=useNavigate();


const [data,setData]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{

loadProfile();

},[id]);





const loadProfile=async()=>{


try{


const response =
await API.get(
`/departments/${id}/profile`
);


setData(response.data);



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};







if(loading)

return(

<DashboardLayout>

<div style={styles.loading}>

Loading department profile...

</div>

</DashboardLayout>

);







if(!data)

return(

<DashboardLayout>

<div style={styles.loading}>

Department not found

</div>

</DashboardLayout>

);





const {

department,

employees=[],

requestStats=[],

recentRequests=[],

assets=[]

}=data;






return(


<DashboardLayout>


<div style={styles.page}>


{/* HEADER */}

<div style={styles.header}>


<div>

<h1>

{department.department_name}

</h1>


<p>

Department Profile & Overview

</p>


</div>



<button

style={styles.back}

onClick={()=>navigate("/departments")}

>

← Back

</button>


</div>









{/* DEPARTMENT INFORMATION */}


<div style={styles.departmentCard}>


<div style={styles.icon}>

🏢

</div>



<div>


<h2>

{department.department_name}

</h2>



<p>

{

department.description ||

"No description available"

}

</p>



<small>

Created:

{" "}

{

department.created_at?.slice(0,10)

}

</small>


</div>


</div>









{/* STATISTICS */}


<div style={styles.stats}>


<Stat

title="Employees"

value={employees.length}

icon="👥"

/>



<Stat

title="Requests"

value={

requestStats.reduce(

(sum,item)=>sum+item.total,

0

)

}

icon="📋"

/>



<Stat

title="Assets"

value={assets.length}

icon="💻"

/>



</div>









{/* EMPLOYEE + REQUEST STATUS */}


<div style={styles.grid}>




{/* MEMBERS */}


<div style={styles.card}>


<h2>

Department Members

</h2>



{

employees.length===0 ?


<p>

No employees assigned

</p>



:


employees.map(emp=>(


<div

key={emp.id}

style={styles.employee}

>


{

emp.profile_image ?


<img

src={
`http://localhost:5000/uploads/${emp.profile_image}`
}

style={styles.avatarImage}

/>


:


<div style={styles.avatar}>

{
emp.first_name?.charAt(0)
}

{
emp.last_name?.charAt(0)
}

</div>


}





<div>


<strong>

{emp.first_name}

{" "}

{emp.last_name}

</strong>



<p>

{emp.employee_id}

</p>



<small>

Role:

{" "}

{emp.role_name || "Staff"}

</small>



<br/>


<small>

Status:

{" "}

{emp.status}

</small>



</div>



</div>


))


}



</div>









{/* REQUEST STATUS */}


<div style={styles.card}>


<h2>

Request Status

</h2>




{

requestStats.length===0 ?


<p>

No request data

</p>



:


requestStats.map(item=>(


<div

key={item.status}

style={styles.row}

>


<span>

{item.status}

</span>


<strong>

{item.total}

</strong>


</div>


))


}



</div>


</div>









{/* RECENT REQUESTS */}



<div style={styles.card}>


<h2>

Recent Requests

</h2>



{

recentRequests.length===0 ?


<p>

No requests found

</p>



:


recentRequests.map(req=>(


<div

key={req.id}

style={styles.request}

>



<div>


<strong>

{req.request_number}

</strong>



<p>

{req.title}

</p>



<small>

Requested by:

{" "}

{req.requester}

</small>


</div>



<span style={styles.status}>

{req.status}

</span>



</div>


))


}



</div>









{/* ASSETS */}


<div style={styles.card}>


<h2>

Department Assets

</h2>




{

assets.length===0 ?


<p>

No assets assigned

</p>



:


assets.map(asset=>(


<div

key={asset.id}

style={styles.asset}

>



<div>


💻


</div>




<div>


<strong>

{asset.asset_name}

</strong>


<p>

{asset.category}

</p>



</div>




<span>

{asset.status}

</span>



</div>


))


}



</div>







</div>


</DashboardLayout>


);


}









function Stat({

title,

value,

icon

}){


return(


<div style={styles.stat}>


<div style={styles.statIcon}>

{icon}

</div>



<div>


<p>

{title}

</p>



<h2>

{value}

</h2>



</div>



</div>


);


}









const styles={


page:{

width:"100%"

},



header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"30px"

},



back:{

padding:"12px 20px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

},




departmentCard:{

background:"white",

padding:"30px",

borderRadius:"22px",

display:"flex",

gap:"25px",

alignItems:"center",

boxShadow:"0 15px 35px rgba(0,0,0,.08)"

},



icon:{

fontSize:"60px"

},



stats:{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginTop:"25px"

},



stat:{

background:"white",

padding:"25px",

borderRadius:"20px",

display:"flex",

gap:"20px",

alignItems:"center",

boxShadow:"0 10px 30px rgba(0,0,0,.08)"

},



statIcon:{

fontSize:"40px"

},



grid:{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",

gap:"25px",

marginTop:"30px"

},



card:{

background:"white",

padding:"25px",

borderRadius:"22px",

marginTop:"30px",

boxShadow:"0 10px 30px rgba(0,0,0,.08)"

},




employee:{

display:"flex",

gap:"15px",

alignItems:"center",

padding:"15px 0",

borderBottom:"1px solid #eee"

},




avatar:{

width:"45px",

height:"45px",

borderRadius:"50%",

background:"#2563eb",

color:"white",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontWeight:"bold"

},




avatarImage:{

width:"45px",

height:"45px",

borderRadius:"50%",

objectFit:"cover"

},




row:{

display:"flex",

justifyContent:"space-between",

padding:"15px",

background:"#f8fafc",

borderRadius:"10px",

marginBottom:"10px"

},




request:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"15px",

borderBottom:"1px solid #eee"

},




status:{

background:"#dbeafe",

padding:"8px 15px",

borderRadius:"20px"

},




asset:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"15px",

background:"#f8fafc",

borderRadius:"12px",

marginBottom:"10px"

},




loading:{

background:"white",

padding:"50px",

borderRadius:"20px",

textAlign:"center"

}



};



export default DepartmentProfile;