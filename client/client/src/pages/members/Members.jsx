

import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getMembers } from "../../services/memberService";

import API from "../../api/axios";

import { Link } from "react-router-dom";


function Members() {


const [members,setMembers] = useState([]);

const [loading,setLoading] = useState(true);



const [filters,setFilters] = useState({

search:"",
department:"",
role:""

});





useEffect(()=>{

loadMembers();

},[filters]);





const loadMembers = async()=>{


try{


setLoading(true);


const data = await getMembers(filters);


setMembers(data.members || []);



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};







const handleDelete = async(id)=>{


const confirmDelete = window.confirm(

"Are you sure you want to delete this employee?"

);



if(!confirmDelete)

return;



try{


await API.delete(`/members/${id}`);


loadMembers();


}
catch(error){

console.log(error);

}



};









return(


<DashboardLayout>


<div style={styles.page}>


{/* PAGE HEADER */}

<div style={styles.header}>


<div>

<h1 style={styles.title}>
Members Management
</h1>


<p style={styles.subtitle}>
Manage employees, roles, departments and account status
</p>


</div>





<Link

to="/members/add"

style={styles.addButton}

>

<span style={styles.addIcon}>
+
</span>

Add Employee

</Link>



</div>





{/* FILTER AREA */}

<div style={styles.filterCard}>


<div style={styles.searchWrapper}>


<span style={styles.searchIcon}>
🔍
</span>


<input

placeholder="Search employee..."

value={filters.search}

onChange={(e)=>

setFilters({

...filters,

search:e.target.value

})

}

style={styles.input}

/>


</div>
<select

value={filters.department}

onChange={(e)=>

setFilters({

...filters,

department:e.target.value

})

}

style={styles.input}

>


<option value="">

All Departments

</option>


<option>

IT

</option>


<option>

Human Resource

</option>


<option>

Finance

</option>


<option>

Administration

</option>


<option>

Maintenance

</option>


</select>





<select

value={filters.role}

onChange={(e)=>

setFilters({

...filters,

role:e.target.value

})

}

style={styles.input}

>


<option value="">

All Roles

</option>


<option>

Administrator

</option>


<option>

Manager

</option>


<option>

Staff

</option>


<option>

Viewer

</option>



</select>



</div>






{

loading ?


<div style={styles.loading}>


<div style={styles.spinner}></div>


Loading employees...


</div>



:


<div style={styles.tableCard}>


<table style={styles.table}>


<thead>


<tr>


<th style={styles.th}>
Photo
</th>



<th style={styles.th}>
Employee ID
</th>




<th style={styles.th}>
Employee
</th>




<th style={styles.th}>
Department
</th>




<th style={styles.th}>
Role
</th>




<th style={styles.th}>
Status
</th>




<th style={styles.th}>
Actions
</th>




</tr>


</thead>



<tbody>
  {

members.map(member=>{


const image = member.profile_image

?

`http://localhost:5000/${member.profile_image}`

:

null;



return(


<tr key={member.id} style={styles.row}>


<td style={styles.photoCell}>


{

image ?


<img

src={image}

alt="profile"

style={styles.photo}

/>


:


<div style={styles.avatar}>

{

member.first_name?.charAt(0)

}

{

member.last_name?.charAt(0)

}


</div>


}



</td>






<td>


<span style={styles.employeeId}>

{member.employee_id}

</span>


</td>







<td>


<div style={styles.employeeInfo}>


<div style={styles.name}>


{member.first_name}

{" "}

{member.last_name}


</div>



<div style={styles.email}>


{member.email || "No email"}


</div>



</div>


</td>







<td>


<span style={styles.department}>


{member.department_name || "N/A"}


</span>


</td>








<td>


<span style={styles.role}>


{member.role_name}


</span>


</td>







<td>


<span


style={

member.status==="Active"

?

styles.active

:

styles.inactive

}


>


<span style={styles.statusDot}></span>


{member.status}


</span>


</td>








<td>


<div style={styles.actions}>


<Link

to={`/members/${member.id}`}

style={styles.view}

title="View employee"

>

👁 View

</Link>





<Link

to={`/members/edit/${member.id}`}

style={styles.edit}

title="Edit employee"

>

✏ Edit

</Link>






<button

style={styles.delete}

onClick={()=>handleDelete(member.id)}

title="Delete employee"

>

🗑 Delete

</button>





</div>


</td>





</tr>


)


})


}


</tbody>


</table>



</div>


}



</div>


</DashboardLayout>


);


}

const styles={



page:{

width:"100%",

padding:"15px",

boxSizing:"border-box"

},






/* HEADER */

header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"35px",

gap:"20px",

flexWrap:"wrap"

},





title:{

margin:0,

fontSize:"32px",

fontWeight:"800",

color:"#0f172a",

letterSpacing:"-0.5px"

},




subtitle:{

marginTop:"8px",

fontSize:"15px",

color:"#64748b"

},






addButton:{

display:"flex",

alignItems:"center",

gap:"10px",

background:"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#ffffff",

padding:"14px 24px",

borderRadius:"14px",

textDecoration:"none",

fontWeight:"700",

fontSize:"15px",

boxShadow:"0 12px 25px rgba(37,99,235,.25)",

transition:"0.3s",

whiteSpace:"nowrap"

},




addIcon:{

fontSize:"24px",

fontWeight:"800"

},






/* FILTER */

filterCard:{

background:"#ffffff",

padding:"22px",

borderRadius:"20px",

display:"flex",

alignItems:"center",

gap:"18px",

marginBottom:"30px",

boxShadow:"0 10px 30px rgba(15,23,42,.08)",

flexWrap:"wrap"

},






searchWrapper:{

display:"flex",

alignItems:"center",

gap:"10px",

height:"45px",

padding:"0 15px",

border:"1px solid #e2e8f0",

borderRadius:"12px",

background:"#ffffff"

},






searchIcon:{

fontSize:"16px"

},






input:{

height:"45px",

minWidth:"220px",

border:"1px solid #e2e8f0",

borderRadius:"12px",

padding:"0 15px",

fontSize:"14px",

outline:"none",

color:"#334155"

},







/* TABLE CONTAINER */


tableCard:{

background:"#ffffff",

padding:"25px",

borderRadius:"22px",

boxShadow:"0 15px 40px rgba(15,23,42,.08)",

overflowX:"auto"

},





table:{

width:"100%",

borderCollapse:"collapse",

tableLayout:"auto"

},






th:{

padding:"16px",

textAlign:"left",

fontSize:"12px",

fontWeight:"800",

textTransform:"uppercase",

color:"#64748b",

borderBottom:"2px solid #f1f5f9",

letterSpacing:"0.5px"

},





row:{

height:"85px",

borderBottom:"1px solid #f1f5f9"

},







/* IMAGE */


photoCell:{

padding:"12px 16px"

},





photo:{

width:"58px",

height:"58px",

borderRadius:"50%",

objectFit:"cover",

border:"4px solid #dbeafe",

boxShadow:"0 5px 15px rgba(37,99,235,.15)"

},





avatar:{

width:"58px",

height:"58px",

borderRadius:"50%",

background:"linear-gradient(135deg,#2563eb,#1e40af)",

color:"#ffffff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"20px",

fontWeight:"800",

textTransform:"uppercase"

},







/* EMPLOYEE INFO */


employeeInfo:{

display:"flex",

flexDirection:"column",

gap:"5px"

},




name:{

fontSize:"16px",

fontWeight:"700",

color:"#111827"

},




email:{

fontSize:"13px",

color:"#64748b"

},








/* EMPLOYEE ID */


employeeId:{

display:"inline-flex",

padding:"7px 13px",

background:"#eff6ff",

color:"#2563eb",

borderRadius:"10px",

fontSize:"13px",

fontWeight:"800"

},









/* DEPARTMENT */


department:{

fontSize:"14px",

fontWeight:"600",

color:"#475569"

},









/* ROLE BADGE */


role:{

display:"inline-flex",

alignItems:"center",

justifyContent:"center",

padding:"8px 15px",

background:"#dbeafe",

color:"#1d4ed8",

borderRadius:"30px",

fontSize:"13px",

fontWeight:"700",

whiteSpace:"nowrap"

},







/* STATUS */


active:{

display:"inline-flex",

alignItems:"center",

gap:"7px",

padding:"8px 15px",

background:"#dcfce7",

color:"#15803d",

borderRadius:"30px",

fontSize:"13px",

fontWeight:"700"

},





inactive:{

display:"inline-flex",

alignItems:"center",

gap:"7px",

padding:"8px 15px",

background:"#fee2e2",

color:"#dc2626",

borderRadius:"30px",

fontSize:"13px",

fontWeight:"700"

},






statusDot:{

width:"8px",

height:"8px",

borderRadius:"50%",

background:"currentColor"

},








/* ACTIONS */


actions:{

display:"flex",

alignItems:"center",

gap:"10px",

whiteSpace:"nowrap"

},






view:{

background:"#dbeafe",

color:"#2563eb",

padding:"9px 14px",

borderRadius:"10px",

textDecoration:"none",

fontSize:"13px",

fontWeight:"700"

},






edit:{

background:"#fef3c7",

color:"#b45309",

padding:"9px 14px",

borderRadius:"10px",

textDecoration:"none",

fontSize:"13px",

fontWeight:"700"

},






delete:{

background:"#fee2e2",

color:"#dc2626",

border:"none",

padding:"9px 14px",

borderRadius:"10px",

fontSize:"13px",

fontWeight:"700",

cursor:"pointer"

},








/* LOADING */


loading:{

background:"#ffffff",

padding:"60px",

borderRadius:"20px",

textAlign:"center",

fontSize:"18px",

color:"#64748b",

boxShadow:"0 10px 25px rgba(15,23,42,.06)"

},






spinner:{

width:"40px",

height:"40px",

border:"4px solid #e2e8f0",

borderTop:"4px solid #2563eb",

borderRadius:"50%",

margin:"0 auto 20px"

}



};
export default Members;