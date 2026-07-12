
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";

import {
  getDepartments,
  deleteDepartment,
} from "../../services/departmentService";

function Departments() {

  const [departments, setDepartments] = useState([]);

  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");



  useEffect(() => {

    loadDepartments();

  }, []);




  useEffect(() => {

    const keyword = search.toLowerCase();

    setFilteredDepartments(

      departments.filter((department) =>

        department.department_name
          ?.toLowerCase()
          .includes(keyword)

        ||

        department.description
          ?.toLowerCase()
          .includes(keyword)

      )

    );

  }, [search, departments]);






  const loadDepartments = async () => {

    try {

      setLoading(true);

      const data = await getDepartments();

      setDepartments(data.departments || []);

      setFilteredDepartments(data.departments || []);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };







  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this department?"

    );

    if (!confirmDelete) return;

    try {

      await deleteDepartment(id);

      loadDepartments();

    }

    catch (error) {

      console.log(error);

    }

  };
  
return (

<DashboardLayout>


<div style={styles.page}>




{/* ================= HEADER ================= */}


<div style={styles.header}>


<div>


<h1 style={styles.title}>

🏢 Department Management

</h1>



<p style={styles.subtitle}>

Manage organizational departments, teams and company units

</p>


</div>




<Link

to="/departments/add"

style={styles.addButton}

>

＋ Add Department

</Link>



</div>









{/* ================= STATISTICS ================= */}



<div style={styles.statGrid}>


<StatCard

icon="🏢"

title="Total Departments"

value={departments.length}

/>



<StatCard

icon="🟢"

title="Active Departments"

value={departments.length}

/>



<StatCard

icon="👥"

title="Organization Units"

value={departments.length}

/>



<StatCard

icon="📊"

title="Coverage"

value="100%"

/>



</div>









{/* ================= SEARCH ================= */}



<div style={styles.searchCard}>


<div style={styles.searchHeader}>


<span>

🔍

</span>


<input

type="text"

placeholder="Search departments..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

style={styles.searchInput}

/>



</div>


</div>









{/* ================= CONTENT ================= */}



{

loading ?


(

<div style={styles.loadingCard}>


<div style={styles.loader}></div>


<h3>

Loading Departments

</h3>


<p>

Please wait while departments are loaded...

</p>


</div>

)

:



filteredDepartments.length===0 ?


(


<div style={styles.emptyCard}>


<div style={styles.emptyIcon}>

🏢

</div>


<h2>

No Departments Found

</h2>



<p>

Create a department to organize your company structure.

</p>



<Link

to="/departments/add"

style={styles.addButton}

>

Create Department

</Link>



</div>


)

:



(


<div style={styles.departmentGrid}>


{


filteredDepartments.map((department)=>(


<div

key={department.id}

style={styles.departmentCard}

>





<div style={styles.cardHeader}>


<div style={styles.departmentIcon}>

🏢

</div>



<div>


<h2 style={styles.departmentName}>

{department.department_name}

</h2>



<span style={styles.departmentBadge}>

Department

</span>


</div>



</div>









<div style={styles.cardBody}>


<p style={styles.description}>


{

department.description ||

"No description available"

}


</p>






<div style={styles.infoRow}>


<span>

📅 Created Date

</span>



<strong>

{

department.created_at

?

department.created_at.slice(0,10)

:

"N/A"

}

</strong>



</div>







<div style={styles.divider}></div>







<div style={styles.actions}>


<Link

to={`/departments/${department.id}`}

style={styles.viewButton}

>

👁 View

</Link>






<Link

to={`/departments/edit/${department.id}`}

style={styles.editButton}

>

✏ Edit

</Link>







<button

onClick={()=>handleDelete(department.id)}

style={styles.deleteButton}

>

🗑 Delete

</button>



</div>





</div>







</div>


))


}



</div>


)

}




</div>



</DashboardLayout>


);

}



function StatCard({

icon,

title,

value

}){


return(

<div style={styles.statCard}>


<div style={styles.statIcon}>

{icon}

</div>



<div>


<p style={styles.statTitle}>

{title}

</p>



<h2 style={styles.statValue}>

{value}

</h2>


</div>



</div>

);


}







const styles={





page:{


width:"100%",

minHeight:"100vh",

padding:"30px",

background:"#f8fafc"


},






header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

flexWrap:"wrap",

gap:"20px",

marginBottom:"35px"


},






title:{


margin:0,

fontSize:"34px",

fontWeight:"800",

color:"#0f172a"


},






subtitle:{


marginTop:"8px",

fontSize:"16px",

color:"#64748b"


},






addButton:{


background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#ffffff",

textDecoration:"none",

padding:"14px 25px",

borderRadius:"14px",

fontWeight:"700",

fontSize:"15px",

boxShadow:
"0 10px 25px rgba(37,99,235,.25)",

display:"inline-block"


},








statGrid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(230px,1fr))",

gap:"22px",

marginBottom:"30px"


},






statCard:{


background:"#ffffff",

borderRadius:"22px",

padding:"25px",

display:"flex",

alignItems:"center",

gap:"18px",

boxShadow:
"0 15px 35px rgba(15,23,42,.08)",

border:
"1px solid #f1f5f9"


},






statIcon:{


width:"65px",

height:"65px",

borderRadius:"18px",

background:"#eff6ff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"32px"


},






statTitle:{


margin:0,

fontSize:"14px",

color:"#64748b",

fontWeight:"600"


},






statValue:{


margin:"8px 0 0",

fontSize:"30px",

color:"#0f172a",

fontWeight:"800"


},








searchCard:{


background:"#ffffff",

padding:"22px",

borderRadius:"20px",

marginBottom:"30px",

boxShadow:
"0 10px 30px rgba(15,23,42,.08)"


},






searchHeader:{


display:"flex",

alignItems:"center",

gap:"12px"


},






searchInput:{


width:"100%",

padding:"15px 18px",

borderRadius:"14px",

border:"1px solid #cbd5e1",

fontSize:"15px",

outline:"none"


},







loadingCard:{


background:"#ffffff",

padding:"70px",

borderRadius:"25px",

textAlign:"center",

boxShadow:
"0 15px 35px rgba(0,0,0,.08)"


},






loader:{


width:"50px",

height:"50px",

borderRadius:"50%",

border:
"5px solid #e2e8f0",

borderTop:
"5px solid #2563eb",

margin:"auto",

animation:
"spin 1s linear infinite"


},






emptyCard:{


background:"#ffffff",

padding:"80px 30px",

borderRadius:"25px",

textAlign:"center",

boxShadow:
"0 15px 35px rgba(0,0,0,.08)"


},






emptyIcon:{


fontSize:"70px",

marginBottom:"15px"


},






departmentGrid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(330px,1fr))",

gap:"25px"


},






departmentCard:{


background:"#ffffff",

borderRadius:"24px",

padding:"25px",

boxShadow:
"0 15px 35px rgba(15,23,42,.08)",

border:
"1px solid #f1f5f9",

transition:"0.3s"


},






cardHeader:{


display:"flex",

alignItems:"center",

gap:"18px",

marginBottom:"25px"


},






departmentIcon:{


width:"65px",

height:"65px",

borderRadius:"18px",

background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"32px",

color:"#ffffff"


},






departmentName:{


margin:0,

fontSize:"22px",

fontWeight:"750",

color:"#0f172a"


},






departmentBadge:{


display:"inline-block",

marginTop:"8px",

padding:"5px 14px",

borderRadius:"20px",

background:"#dbeafe",

color:"#1d4ed8",

fontSize:"12px",

fontWeight:"700"


},




cardBody:{


display:"flex",

flexDirection:"column",

gap:"15px"


},






description:{


color:"#475569",

lineHeight:"1.7",

fontSize:"15px",

minHeight:"55px",

margin:0


},






infoRow:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"14px 0",

color:"#64748b",

fontSize:"14px"


},






divider:{


height:"1px",

background:"#e2e8f0",

margin:"5px 0"


},






actions:{


display:"flex",

gap:"10px",

marginTop:"10px",

flexWrap:"wrap"


},






viewButton:{


flex:1,

background:"#0ea5e9",

color:"#ffffff",

textDecoration:"none",

textAlign:"center",

padding:"12px",

borderRadius:"12px",

fontWeight:"700",

fontSize:"14px"


},






editButton:{


flex:1,

background:"#2563eb",

color:"#ffffff",

textDecoration:"none",

textAlign:"center",

padding:"12px",

borderRadius:"12px",

fontWeight:"700",

fontSize:"14px"


},






deleteButton:{


flex:1,

background:"#dc2626",

color:"#ffffff",

border:"none",

padding:"12px",

borderRadius:"12px",

fontWeight:"700",

fontSize:"14px",

cursor:"pointer"


},






};





export default Departments;
