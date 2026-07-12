
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";

import {
  getDepartments,
  deleteDepartment,
} from "../../services/departmentService";


function Departments() {


  const [departments,setDepartments] = useState([]);

  const [filteredDepartments,setFilteredDepartments] = useState([]);

  const [loading,setLoading] = useState(true);

  const [search,setSearch] = useState("");





  useEffect(()=>{

    loadDepartments();

  },[]);






  useEffect(()=>{


    const keyword = search.toLowerCase();


    setFilteredDepartments(

      departments.filter((department)=>

        department.department_name
        ?.toLowerCase()
        .includes(keyword)

        ||

        department.description
        ?.toLowerCase()
        .includes(keyword)

      )

    );


  },[search,departments]);








  const loadDepartments = async()=>{


    try{


      setLoading(true);


      const data = await getDepartments();


      setDepartments(data.departments || []);


      setFilteredDepartments(data.departments || []);



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

      "Are you sure you want to delete this department?"

    );


    if(!confirmDelete) return;



    try{


      await deleteDepartment(id);


      loadDepartments();



    }

    catch(error){


      console.log(error);


    }


  };









return (

<DashboardLayout>


<div style={styles.page}>


{/* ================= PREMIUM HEADER ================= */}


<div style={styles.header}>


<div>


<div style={styles.pageLabel}>

ADMINISTRATION

</div>



<h1 style={styles.title}>

🏢 Department Management

</h1>




<p style={styles.subtitle}>

Create, organize and monitor company departments and organizational units

</p>



</div>







<Link

to="/departments/add"

style={styles.addButton}

>

<span style={styles.addIcon}>

＋

</span>

Add Department

</Link>




</div>










{/* ================= STATISTICS ================= */}



<div style={styles.statGrid}>


<StatCard

icon="🏢"

title="Total Departments"

value={departments.length}

description="Registered departments"

/>






<StatCard

icon="✓"

title="Active Departments"

value={departments.length}

description="Currently operating"

/>







<StatCard

icon="👥"

title="Organization Units"

value={departments.length}

description="Business sections"

/>







<StatCard

icon="📈"

title="Coverage"

value="100%"

description="Organization structure"

/>




</div>




// ================= SEARCH SECTION =================


<div style={styles.searchCard}>


<div style={styles.searchContainer}>


<div style={styles.searchIcon}>

🔍

</div>



<input

type="text"

placeholder="Search departments by name or description..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

style={styles.searchInput}

/>



</div>


</div>











// ================= CONTENT =================



{

loading ?


(


<div style={styles.loadingCard}>


<div style={styles.loader}></div>



<h2 style={styles.loadingTitle}>

Loading Departments

</h2>



<p style={styles.loadingText}>

Please wait while department information is being retrieved...

</p>



</div>


)



:





filteredDepartments.length === 0 ?



(



<div style={styles.emptyCard}>


<div style={styles.emptyIcon}>

🏢

</div>



<h2 style={styles.emptyTitle}>

No Departments Found

</h2>



<p style={styles.emptyText}>

There are no departments available. Create your first department to organize your company structure.

</p>





<Link

to="/departments/add"

style={styles.addButton}

>

＋ Create Department

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




{/* CARD HEADER */}



<div style={styles.cardHeader}>


<div style={styles.departmentIcon}>

🏢

</div>




<div style={styles.departmentHeading}>


<h2 style={styles.departmentName}>

{department.department_name}

</h2>



<span style={styles.departmentBadge}>

Department Unit

</span>


</div>



</div>









{/* CARD BODY */}



<div style={styles.cardBody}>


<p style={styles.description}>


{

department.description

?

department.description

:

"No description available"

}


</p>









<div style={styles.infoBox}>


<div style={styles.infoItem}>


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



</div>









<div style={styles.divider}></div>








{/* ACTION BUTTONS */}



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

value,

description

}){


return(


<div style={styles.statCard}>


<div style={styles.statIcon}>

{icon}

</div>




<div style={styles.statContent}>


<p style={styles.statTitle}>

{title}

</p>



<h2 style={styles.statValue}>

{value}

</h2>



<span style={styles.statDescription}>

{description}

</span>


</div>



</div>


);


}





const styles = {


page:{


width:"100%",

minHeight:"100vh",

padding:"35px",

background:"#f8fafc",

fontFamily:"Inter, Arial, sans-serif"


},






/* ================= HEADER ================= */


header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

gap:"25px",

flexWrap:"wrap",

marginBottom:"35px"


},



pageLabel:{


fontSize:"12px",

fontWeight:"800",

letterSpacing:"1.5px",

color:"#2563eb",

marginBottom:"10px"


},



title:{


margin:0,

fontSize:"36px",

fontWeight:"850",

color:"#0f172a",

letterSpacing:"-0.8px"


},




subtitle:{


marginTop:"10px",

fontSize:"16px",

color:"#64748b",

lineHeight:"1.6"


},





addButton:{


display:"inline-flex",

alignItems:"center",

gap:"8px",

background:

"linear-gradient(135deg,#2563eb,#1e40af)",

color:"#ffffff",

padding:"15px 28px",

borderRadius:"14px",

fontSize:"15px",

fontWeight:"700",

textDecoration:"none",

boxShadow:

"0 15px 30px rgba(37,99,235,.25)",

transition:"all .3s ease"


},



addIcon:{


fontSize:"22px",

fontWeight:"600"


},







/* ================= STATISTICS ================= */



statGrid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(240px,1fr))",

gap:"24px",

marginBottom:"35px"


},




statCard:{


background:"#ffffff",

borderRadius:"22px",

padding:"25px",

display:"flex",

alignItems:"center",

gap:"20px",

border:

"1px solid #e2e8f0",

boxShadow:

"0 15px 40px rgba(15,23,42,.06)",

transition:"transform .3s ease"


},





statIcon:{


width:"68px",

height:"68px",

borderRadius:"20px",

background:

"linear-gradient(135deg,#eff6ff,#dbeafe)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"32px"


},





statContent:{


display:"flex",

flexDirection:"column"


},





statTitle:{


margin:0,

fontSize:"14px",

fontWeight:"700",

color:"#64748b"


},





statValue:{


margin:"8px 0 5px",

fontSize:"32px",

fontWeight:"850",

color:"#0f172a"


},





statDescription:{


fontSize:"13px",

color:"#94a3b8"


},







/* ================= SEARCH ================= */


searchCard:{


background:"#ffffff",

borderRadius:"22px",

padding:"22px",

marginBottom:"35px",

border:

"1px solid #e2e8f0",

boxShadow:

"0 12px 35px rgba(15,23,42,.06)"


},




searchContainer:{


display:"flex",

alignItems:"center",

gap:"15px"


},




searchIcon:{


width:"45px",

height:"45px",

borderRadius:"14px",

background:"#eff6ff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"20px"


},




searchInput:{


flex:1,

padding:"15px 18px",

borderRadius:"14px",

border:"1px solid #cbd5e1",

fontSize:"15px",

outline:"none",

background:"#f8fafc"


},







/* ================= LOADING ================= */


loadingCard:{


background:"#ffffff",

padding:"80px 30px",

borderRadius:"25px",

textAlign:"center",

boxShadow:

"0 15px 40px rgba(15,23,42,.08)"


},




loader:{


width:"55px",

height:"55px",

borderRadius:"50%",

border:

"5px solid #e2e8f0",

borderTop:

"5px solid #2563eb",

margin:"0 auto 25px",

animation:

"spin 1s linear infinite"


},




loadingTitle:{


margin:0,

fontSize:"22px",

color:"#0f172a"


},




loadingText:{


color:"#64748b",

marginTop:"10px"


},







/* ================= EMPTY ================= */


emptyCard:{


background:"#ffffff",

padding:"90px 30px",

borderRadius:"25px",

textAlign:"center",

boxShadow:

"0 15px 40px rgba(15,23,42,.08)"


},




emptyIcon:{


fontSize:"75px",

marginBottom:"20px"


},



emptyTitle:{


fontSize:"26px",

color:"#0f172a"


},




emptyText:{


maxWidth:"500px",

margin:"15px auto 30px",

color:"#64748b",

lineHeight:"1.7"


},








/* ================= DEPARTMENT CARDS ================= */


departmentGrid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(340px,1fr))",

gap:"28px"


},





departmentCard:{


background:"#ffffff",

borderRadius:"25px",

padding:"28px",

border:

"1px solid #e2e8f0",

boxShadow:

"0 15px 45px rgba(15,23,42,.07)",

transition:"all .3s ease"


},





cardHeader:{


display:"flex",

alignItems:"center",

gap:"18px",

marginBottom:"25px"


},





departmentIcon:{


width:"70px",

height:"70px",

borderRadius:"22px",

background:

"linear-gradient(135deg,#2563eb,#1d4ed8)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"34px",

color:"#ffffff"


},





departmentHeading:{


flex:1


},





departmentName:{


margin:0,

fontSize:"23px",

fontWeight:"800",

color:"#0f172a"


},





departmentBadge:{


display:"inline-block",

marginTop:"8px",

padding:"6px 14px",

borderRadius:"30px",

background:"#dbeafe",

color:"#1d4ed8",

fontSize:"12px",

fontWeight:"700"


},




cardBody:{


display:"flex",

flexDirection:"column",

gap:"18px"


},





description:{


margin:0,

color:"#475569",

fontSize:"15px",

lineHeight:"1.7",

minHeight:"55px"


},




infoBox:{


background:"#f8fafc",

padding:"14px",

borderRadius:"14px"


},




infoItem:{


display:"flex",

justifyContent:"space-between",

fontSize:"14px",

color:"#64748b"


},




divider:{


height:"1px",

background:"#e2e8f0"


},







/* ================= BUTTONS ================= */


actions:{


display:"flex",

gap:"12px",

flexWrap:"wrap"


},




viewButton:{


flex:1,

textAlign:"center",

padding:"12px",

borderRadius:"12px",

background:"#0284c7",

color:"#fff",

textDecoration:"none",

fontWeight:"700"


},




editButton:{


flex:1,

textAlign:"center",

padding:"12px",

borderRadius:"12px",

background:"#2563eb",

color:"#fff",

textDecoration:"none",

fontWeight:"700"


},




deleteButton:{


flex:1,

padding:"12px",

borderRadius:"12px",

background:"#dc2626",

color:"#fff",

border:"none",

fontWeight:"700",

cursor:"pointer"


}


};
export default Departments;
