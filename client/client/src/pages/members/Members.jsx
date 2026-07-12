
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


{/* =========================
PAGE HERO HEADER
========================= */}


<div style={styles.hero}>


<div style={styles.heroContent}>


<div style={styles.iconBox}>

👥

</div>



<div>


<h1 style={styles.title}>

Members Management

</h1>


<p style={styles.subtitle}>

Manage employees, departments, roles and account permissions from one place.

</p>


</div>


</div>







<Link

to="/members/add"

style={styles.addButton}

>


<div style={styles.addCircle}>

+

</div>


Add New Employee


</Link>



</div>







{/* =========================
FILTER SECTION
========================= */}



<div style={styles.filterCard}>


<div style={styles.filterHeader}>


<div>


<h3 style={styles.filterTitle}>

Employee Directory

</h3>


<p style={styles.filterSubtitle}>

Search and organize your workforce

</p>


</div>



</div>








<div style={styles.filterRow}>




<div style={styles.searchBox}>


<span style={styles.searchIcon}>

🔍

</span>



<input


placeholder="Search by name, email or employee ID..."


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


style={styles.select}



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


style={styles.select}


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






</div>







{/* TABLE WILL CONTINUE IN PART 2 */}


{/* =========================
EMPLOYEE TABLE SECTION
========================= */}



{

loading ?



<div style={styles.loadingCard}>


<div style={styles.loader}></div>


<h3>

Loading Employees...

</h3>


<p>

Please wait while we fetch employee records.

</p>



</div>





:




<div style={styles.tableCard}>


<div style={styles.tableHeader}>


<div>


<h3 style={styles.tableTitle}>

Employees List

</h3>


<p style={styles.tableSubtitle}>

Total employees: {members.length}

</p>


</div>



<div style={styles.totalBadge}>

{members.length} Members

</div>



</div>









<div style={styles.tableWrapper}>


<table style={styles.table}>


<thead>


<tr>


<th style={styles.th}>

Profile

</th>


<th style={styles.th}>

Employee ID

</th>


<th style={styles.th}>

Employee Information

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


members.length === 0 ?




<tr>


<td

colSpan="7"

style={styles.emptyCell}

>



<div style={styles.emptyState}>


<div style={styles.emptyIcon}>

👤

</div>


<h3>

No Employees Found

</h3>


<p>

Try changing your search filters.

</p>


</div>



</td>


</tr>






:






members.map(member=>{


const image = member.profile_image

?

`http://localhost:5000/uploads/${member.profile_image}`

:

null;



return(



<tr

key={member.id}

style={styles.row}

>






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


#{member.employee_id}


</span>


</td>









<td>


<div style={styles.employeeInfo}>


<div style={styles.employeeName}>


{member.first_name}

{" "}

{member.last_name}



</div>




<div style={styles.employeeEmail}>


{member.email || "No email available"}



</div>




</div>


</td>









<td>


<div style={styles.departmentBadge}>


<span>

🏢

</span>


{member.department_name || "N/A"}



</div>


</td>









<td>


<span style={styles.roleBadge}>


{member.role_name}



</span>


</td>









<td>


<span



style={

member.status==="Active"

?

styles.activeStatus

:

styles.inactiveStatus

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


style={styles.viewButton}


title="View employee"


>


👁

</Link>








<Link


to={`/members/edit/${member.id}`}


style={styles.editButton}


title="Edit employee"


>


✏

</Link>








<button


style={styles.deleteButton}


onClick={()=>handleDelete(member.id)}


title="Delete employee"


>


🗑

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





</div>



}





</div>


</DashboardLayout>


);


}


const styles={


/* =========================
PAGE CONTAINER
========================= */


page:{

width:"100%",

padding:"25px",

boxSizing:"border-box",

background:"#f8fafc",

minHeight:"100%"

},







/* =========================
HERO HEADER
========================= */


hero:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

background:"linear-gradient(135deg,#ffffff,#f8fbff)",

padding:"28px",

borderRadius:"24px",

marginBottom:"28px",

boxShadow:"0 15px 40px rgba(15,23,42,0.08)",

border:"1px solid #e5e7eb",

gap:"20px",

flexWrap:"wrap"

},





heroContent:{

display:"flex",

alignItems:"center",

gap:"18px"

},





iconBox:{

width:"65px",

height:"65px",

borderRadius:"18px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px",

background:"linear-gradient(135deg,#2563eb,#1d4ed8)",

boxShadow:"0 10px 25px rgba(37,99,235,.35)"

},






title:{

margin:0,

fontSize:"32px",

fontWeight:"900",

letterSpacing:"-0.8px",

color:"#0f172a"

},





subtitle:{

marginTop:"8px",

marginBottom:0,

fontSize:"15px",

color:"#64748b"

},







addButton:{

display:"flex",

alignItems:"center",

gap:"12px",

padding:"14px 25px",

borderRadius:"16px",

background:"linear-gradient(135deg,#2563eb,#1e40af)",

color:"#ffffff",

fontSize:"15px",

fontWeight:"800",

textDecoration:"none",

boxShadow:"0 15px 30px rgba(37,99,235,.3)",

transition:"all .3s"

},






addCircle:{

width:"28px",

height:"28px",

borderRadius:"50%",

display:"flex",

alignItems:"center",

justifyContent:"center",

background:"rgba(255,255,255,.2)",

fontSize:"22px",

fontWeight:"900"

},









/* =========================
FILTER CARD
========================= */


filterCard:{

background:"#ffffff",

padding:"25px",

borderRadius:"22px",

marginBottom:"30px",

boxShadow:"0 15px 35px rgba(15,23,42,.06)",

border:"1px solid #e2e8f0"

},





filterHeader:{

marginBottom:"20px"

},





filterTitle:{

margin:0,

fontSize:"20px",

fontWeight:"800",

color:"#0f172a"

},





filterSubtitle:{

margin:"6px 0 0",

fontSize:"14px",

color:"#64748b"

},






filterRow:{

display:"flex",

gap:"15px",

alignItems:"center",

flexWrap:"wrap"

},






searchBox:{

display:"flex",

alignItems:"center",

gap:"10px",

height:"48px",

padding:"0 16px",

borderRadius:"14px",

border:"1px solid #cbd5e1",

background:"#ffffff",

flex:"1",

minWidth:"280px"

},






searchIcon:{

fontSize:"17px"

},







input:{

border:"none",

outline:"none",

width:"100%",

fontSize:"14px",

color:"#334155"

},






select:{

height:"48px",

minWidth:"200px",

padding:"0 15px",

borderRadius:"14px",

border:"1px solid #cbd5e1",

fontSize:"14px",

background:"#ffffff",

color:"#334155",

outline:"none"

},







/* =========================
TABLE CARD
========================= */


tableCard:{

background:"#ffffff",

borderRadius:"24px",

padding:"25px",

boxShadow:"0 20px 45px rgba(15,23,42,.08)",

border:"1px solid #e2e8f0"

},






tableHeader:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"22px"

},






tableTitle:{

margin:0,

fontSize:"21px",

fontWeight:"850",

color:"#0f172a"

},






tableSubtitle:{

margin:"5px 0 0",

color:"#64748b",

fontSize:"14px"

},






totalBadge:{

background:"#eff6ff",

color:"#2563eb",

padding:"10px 18px",

borderRadius:"30px",

fontWeight:"800",

fontSize:"13px"

},






tableWrapper:{

overflowX:"auto"

},






table:{

width:"100%",

borderCollapse:"separate",

borderSpacing:"0 12px"

},






th:{

padding:"15px",

textAlign:"left",

fontSize:"12px",

textTransform:"uppercase",

letterSpacing:"0.6px",

color:"#64748b",

fontWeight:"800"

},





row:{

background:"#ffffff",

boxShadow:"0 5px 20px rgba(15,23,42,.05)",

transition:"all .25s"

},




photoCell:{

padding:"14px 16px",

width:"90px"

},






photo:{

width:"60px",

height:"60px",

borderRadius:"50%",

objectFit:"cover",

border:"4px solid #dbeafe",

boxShadow:"0 8px 20px rgba(37,99,235,.2)"

},







avatar:{

width:"60px",

height:"60px",

borderRadius:"50%",

display:"flex",

alignItems:"center",

justifyContent:"center",

background:"linear-gradient(135deg,#2563eb,#1e3a8a)",

color:"#ffffff",

fontSize:"20px",

fontWeight:"900",

textTransform:"uppercase",

boxShadow:"0 10px 25px rgba(37,99,235,.3)"

},







/* =========================
EMPLOYEE INFO
========================= */


employeeInfo:{

display:"flex",

flexDirection:"column",

gap:"6px"

},






employeeName:{

fontSize:"16px",

fontWeight:"800",

color:"#111827"

},






employeeEmail:{

fontSize:"13px",

color:"#64748b"

},







employeeId:{

display:"inline-flex",

alignItems:"center",

padding:"8px 14px",

borderRadius:"12px",

background:"#eff6ff",

color:"#2563eb",

fontSize:"13px",

fontWeight:"800"

},







/* =========================
DEPARTMENT BADGE
========================= */


departmentBadge:{

display:"inline-flex",

alignItems:"center",

gap:"7px",

background:"#f1f5f9",

padding:"8px 14px",

borderRadius:"12px",

fontSize:"13px",

fontWeight:"700",

color:"#334155"

},








/* =========================
ROLE
========================= */


roleBadge:{

display:"inline-flex",

padding:"8px 16px",

borderRadius:"30px",

background:"linear-gradient(135deg,#dbeafe,#bfdbfe)",

color:"#1d4ed8",

fontSize:"13px",

fontWeight:"800"

},







/* =========================
STATUS
========================= */


activeStatus:{

display:"inline-flex",

alignItems:"center",

gap:"8px",

padding:"8px 16px",

borderRadius:"30px",

background:"#dcfce7",

color:"#15803d",

fontSize:"13px",

fontWeight:"800"

},






inactiveStatus:{

display:"inline-flex",

alignItems:"center",

gap:"8px",

padding:"8px 16px",

borderRadius:"30px",

background:"#fee2e2",

color:"#dc2626",

fontSize:"13px",

fontWeight:"800"

},






statusDot:{

width:"8px",

height:"8px",

borderRadius:"50%",

background:"currentColor"

},







/* =========================
ACTION BUTTONS
========================= */


actions:{

display:"flex",

alignItems:"center",

gap:"10px"

},







viewButton:{

width:"38px",

height:"38px",

display:"flex",

alignItems:"center",

justifyContent:"center",

borderRadius:"12px",

background:"#dbeafe",

color:"#2563eb",

textDecoration:"none",

fontSize:"18px"

},






editButton:{

width:"38px",

height:"38px",

display:"flex",

alignItems:"center",

justifyContent:"center",

borderRadius:"12px",

background:"#fef3c7",

color:"#b45309",

textDecoration:"none",

fontSize:"18px"

},







deleteButton:{

width:"38px",

height:"38px",

display:"flex",

alignItems:"center",

justifyContent:"center",

borderRadius:"12px",

border:"none",

cursor:"pointer",

background:"#fee2e2",

color:"#dc2626",

fontSize:"18px"

},







/* =========================
EMPTY STATE
========================= */


emptyCell:{

padding:"50px",

textAlign:"center"

},






emptyState:{

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

color:"#64748b"

},






emptyIcon:{

fontSize:"45px",

marginBottom:"10px"

},







/* =========================
LOADING
========================= */


loadingCard:{

background:"#ffffff",

padding:"70px",

borderRadius:"24px",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

boxShadow:"0 15px 35px rgba(15,23,42,.08)"

},






loader:{

width:"45px",

height:"45px",

borderRadius:"50%",

border:"5px solid #e2e8f0",

borderTop:"5px solid #2563eb",

marginBottom:"20px",

animation:"spin 1s linear infinite"

}




};



export default Members;