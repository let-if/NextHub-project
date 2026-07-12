
import { useEffect, useState } from "react";

import API from "../api/axios";



function Statistics(){


const [stats,setStats]=useState(null);

const [loading,setLoading]=useState(true);





useEffect(()=>{


const fetchStatistics=async()=>{


try{


const response = await API.get(
"/statistics"
);



setStats(
response.data.statistics
);



}

catch(error){


console.log(
"Statistics Error:",
error
);


}

finally{


setLoading(false);


}


};



fetchStatistics();


},[]);





if(loading){


return(

<div style={styles.loadingBox}>


<div style={styles.spinner}></div>


<h3>

Loading Analytics

</h3>


<p>

Preparing system statistics...

</p>



</div>


);


}






if(!stats){


return(

<div style={styles.emptyBox}>


<div style={styles.emptyIcon}>

📊

</div>


<h2>

No Statistics Available

</h2>


<p>

System data will appear after records are created.

</p>


</div>

);


}

return (

<div style={styles.container}>


{/* ================= HEADER ================= */}


<div style={styles.header}>


<div>


<h1 style={styles.title}>

📊 System Analytics Dashboard

</h1>



<p style={styles.subtitle}>

Real-time overview of NexusHub management activities

</p>


</div>



<div style={styles.dateBadge}>

⚡ Live Statistics

</div>


</div>









{/* ================= SUMMARY CARDS ================= */}


<div style={styles.summaryGrid}>


<SummaryCard

icon="👥"

title="Total Members"

value={

stats.membersByDepartment?.reduce(

(total,item)=>

total + Number(item.total),

0

) || 0

}

color="blue"

/>




<SummaryCard

icon="📋"

title="Total Requests"

value={

stats.requestsByStatus?.reduce(

(total,item)=>

total + Number(item.total),

0

) || 0

}

color="green"

/>





<SummaryCard

icon="💻"

title="Resources"

value={

stats.resourcesByCategory?.reduce(

(total,item)=>

total + Number(item.total),

0

) || 0

}

color="purple"

/>





<SummaryCard

icon="🔐"

title="Member Status"

value={

stats.membersStatus?.length || 0

}

color="orange"

/>



</div>









{/* ================= ANALYTICS GRID ================= */}



<div style={styles.grid}>






{/* MEMBERS DEPARTMENT */}



<AnalyticsCard

title="Members By Department"

icon="👥"

color="blue"


>


{


stats.membersByDepartment?.length > 0 ?


stats.membersByDepartment.map((item)=>(


<ProgressRow

key={item.department_name}

label={item.department_name}

value={item.total}

total={

stats.membersByDepartment.reduce(

(a,b)=>

a+Number(b.total),

0

)

}

color="#2563eb"

/>


))


:


<p style={styles.noData}>

No members available

</p>


}



</AnalyticsCard>









{/* REQUEST STATUS */}



<AnalyticsCard

title="Requests By Status"

icon="📋"

color="green"

>



{


stats.requestsByStatus?.length > 0 ?


stats.requestsByStatus.map((item)=>(


<ProgressRow


key={item.status}


label={item.status}


value={item.total}


total={

stats.requestsByStatus.reduce(

(a,b)=>

a+Number(b.total),

0

)

}


color="#16a34a"



/>


))


:


<p style={styles.noData}>

No requests available

</p>


}



</AnalyticsCard>









{/* RESOURCES */}



<AnalyticsCard

title="Resources By Category"

icon="💻"

color="purple"


>



{


stats.resourcesByCategory?.length > 0 ?


stats.resourcesByCategory.map((item)=>(


<ProgressRow


key={item.category}


label={item.category}


value={item.total}


total={

stats.resourcesByCategory.reduce(

(a,b)=>

a+Number(b.total),

0

)

}


color="#9333ea"



/>


))


:


<p style={styles.noData}>

No resources available

</p>


}




</AnalyticsCard>









{/* MEMBER STATUS */}



<AnalyticsCard

title="Members Status"

icon="🔐"

color="orange"

>



{


stats.membersStatus?.length > 0 ?


stats.membersStatus.map((item)=>(


<ProgressRow


key={item.status}


label={item.status}


value={item.total}


total={

stats.membersStatus.reduce(

(a,b)=>

a+Number(b.total),

0

)

}


color="#ea580c"



/>


))


:


<p style={styles.noData}>

No status information

</p>


}



</AnalyticsCard>







</div>






</div>

);

}



function SummaryCard({

icon,

title,

value,

color

}){


return(


<div

style={{

...styles.summaryCard,

borderTop:

`5px solid ${color}`

}}

>


<div

style={{

...styles.summaryIcon,

background:

`${color}20`

}}

>


{icon}


</div>




<div>


<p style={styles.summaryTitle}>

{title}

</p>



<h2 style={styles.summaryValue}>

{value}

</h2>


</div>



</div>


);


}









function AnalyticsCard({

title,

icon,

children

}){


return(


<div style={styles.card}>


<div style={styles.cardHeader}>


<div style={styles.analyticsIcon}>

{icon}

</div>



<h3 style={styles.cardTitle}>

{title}

</h3>



</div>



<div>


{children}

</div>



</div>


);


}









function ProgressRow({

label,

value,

total,

color

}){


const percentage = total

?

Math.round(

(value / total) * 100

)

:

0;



return(


<div style={styles.progressContainer}>


<div style={styles.progressHeader}>


<span>

{label}

</span>



<strong>

{value}

</strong>


</div>







<div style={styles.progressBackground}>


<div

style={{

...styles.progressBar,

width:`${percentage}%`,

background:color

}}

/>


</div>






<div style={styles.percentText}>


{percentage}%


</div>



</div>


);


}

const styles = {


container:{


width:"100%",


minHeight:"100vh"


},







header:{


display:"flex",


justifyContent:"space-between",


alignItems:"center",


marginBottom:"35px",


flexWrap:"wrap",


gap:"20px"


},







title:{


margin:0,


fontSize:"34px",


fontWeight:"800",


color:"#0f172a"


},







subtitle:{


marginTop:"8px",


fontSize:"15px",


color:"#64748b"


},







dateBadge:{


background:"#dbeafe",


color:"#1d4ed8",


padding:"12px 22px",


borderRadius:"30px",


fontWeight:"700",


fontSize:"14px"


},







/* ================= SUMMARY ================= */


summaryGrid:{


display:"grid",


gridTemplateColumns:


"repeat(auto-fit,minmax(230px,1fr))",


gap:"22px",


marginBottom:"35px"


},







summaryCard:{


background:"#ffffff",


borderRadius:"22px",


padding:"22px",


display:"flex",


alignItems:"center",


gap:"18px",


boxShadow:

"0 15px 35px rgba(15,23,42,.08)",


transition:"transform .25s ease"


},







summaryIcon:{


width:"60px",


height:"60px",


borderRadius:"18px",


display:"flex",


alignItems:"center",


justifyContent:"center",


fontSize:"30px"


},







summaryTitle:{


margin:0,


fontSize:"14px",


color:"#64748b"


},







summaryValue:{


margin:"6px 0 0",


fontSize:"30px",


fontWeight:"800",


color:"#0f172a"


},









/* ================= ANALYTICS CARDS ================= */


grid:{


display:"grid",


gridTemplateColumns:


"repeat(auto-fit,minmax(350px,1fr))",


gap:"25px"


},









card:{


background:"#ffffff",


borderRadius:"24px",


padding:"28px",


boxShadow:

"0 15px 40px rgba(15,23,42,.08)",


border:

"1px solid #e2e8f0"


},







cardHeader:{


display:"flex",


alignItems:"center",


gap:"15px",


marginBottom:"25px"


},







analyticsIcon:{


width:"48px",


height:"48px",


borderRadius:"15px",


background:"#eff6ff",


display:"flex",


alignItems:"center",


justifyContent:"center",


fontSize:"25px"


},







cardTitle:{


margin:0,


fontSize:"19px",


fontWeight:"700",


color:"#0f172a"


},







/* ================= PROGRESS ================= */



progressContainer:{


marginBottom:"22px"


},







progressHeader:{


display:"flex",


justifyContent:"space-between",


alignItems:"center",


marginBottom:"10px",


fontSize:"14px",


color:"#334155"


},







progressBackground:{


height:"10px",


background:"#e2e8f0",


borderRadius:"20px",


overflow:"hidden"


},







progressBar:{


height:"100%",


borderRadius:"20px",


transition:"width .5s ease"


},







percentText:{


marginTop:"6px",


fontSize:"12px",


color:"#64748b",


textAlign:"right"


},







noData:{


color:"#94a3b8",


fontSize:"14px",


padding:"20px 0"


},







/* ================= LOADING ================= */



loadingBox:{


height:"350px",


display:"flex",


flexDirection:"column",


alignItems:"center",


justifyContent:"center",


color:"#475569"


},







spinner:{


width:"45px",


height:"45px",


borderRadius:"50%",


border:

"5px solid #e2e8f0",


borderTop:

"5px solid #2563eb",


marginBottom:"20px",


animation:

"spin 1s linear infinite"


},







/* ================= EMPTY ================= */



emptyBox:{


background:"#ffffff",


padding:"60px 30px",


borderRadius:"25px",


textAlign:"center",


boxShadow:

"0 15px 35px rgba(15,23,42,.08)",


color:"#64748b"


},







emptyIcon:{


fontSize:"70px",


marginBottom:"20px"


}




};





export default Statistics;