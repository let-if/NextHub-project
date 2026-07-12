
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
minHeight:"100vh",
position:"relative",
padding:"5px",
animation:"dashboardEnter .7s ease"
},



/* ================= HEADER ================= */


header:{

display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"45px",
flexWrap:"wrap",
gap:"25px"

},



title:{

margin:0,

fontSize:"42px",

fontWeight:"950",

letterSpacing:"-1.8px",

background:
"linear-gradient(120deg,#020617,#2563eb,#38bdf8)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent"

},



subtitle:{

marginTop:"12px",

fontSize:"16px",

color:"#64748b",

fontWeight:"600",

letterSpacing:"0.2px"

},



dateBadge:{

padding:"15px 28px",

borderRadius:"50px",

background:
"linear-gradient(135deg,#2563eb,#06b6d4)",

color:"#fff",

fontWeight:"800",

fontSize:"14px",

boxShadow:
"0 15px 35px rgba(37,99,235,.35)",

display:"flex",

alignItems:"center",

gap:"10px",

animation:
"floating 3s ease-in-out infinite"

},






/* ================= KPI CARDS ================= */



summaryGrid:{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(260px,1fr))",

gap:"30px",

marginBottom:"45px"

},




summaryCard:{


position:"relative",

overflow:"hidden",


background:
"linear-gradient(145deg,rgba(255,255,255,.95),rgba(248,250,252,.85))",


backdropFilter:
"blur(20px)",


borderRadius:"30px",


padding:"30px",


display:"flex",


alignItems:"center",


gap:"22px",


border:
"1px solid rgba(255,255,255,.8)",


boxShadow:
"0 25px 60px rgba(15,23,42,.12)",


transition:
"all .4s cubic-bezier(.4,0,.2,1)",


cursor:"pointer"


},



summaryIcon:{


width:"75px",

height:"75px",


borderRadius:"25px",


display:"flex",

alignItems:"center",

justifyContent:"center",


fontSize:"38px",


background:
"linear-gradient(145deg,#ffffff,#e0f2fe)",


boxShadow:
"0 15px 30px rgba(37,99,235,.15)"

},



summaryTitle:{


margin:0,

fontSize:"15px",

fontWeight:"700",

color:"#64748b"

},



summaryValue:{


margin:"10px 0 0",

fontSize:"40px",

fontWeight:"950",

color:"#020617"

},








/* ================= ANALYTICS GRID ================= */


grid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(400px,1fr))",

gap:"35px"

},






/* ================= GLASS CARDS ================= */


card:{


position:"relative",

background:
"rgba(255,255,255,.75)",


backdropFilter:
"blur(25px)",


borderRadius:"32px",


padding:"35px",


border:
"1px solid rgba(226,232,240,.8)",


boxShadow:
"0 30px 80px rgba(15,23,42,.10)",


overflow:"hidden",


transition:
"all .45s ease"


},




cardHeader:{


display:"flex",

alignItems:"center",

gap:"18px",

marginBottom:"35px"


},




analyticsIcon:{


width:"60px",

height:"60px",

borderRadius:"22px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"32px",

background:
"linear-gradient(135deg,#eff6ff,#bae6fd)",


boxShadow:
"0 15px 35px rgba(14,165,233,.25)"


},




cardTitle:{


margin:0,

fontSize:"22px",

fontWeight:"900",

color:"#0f172a"


},







/* ================= PROGRESS ================= */



progressContainer:{


marginBottom:"28px",

padding:"5px"

},



progressHeader:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"12px",

fontSize:"15px",

fontWeight:"700",

color:"#334155"

},




progressBackground:{


height:"14px",

background:
"linear-gradient(90deg,#e2e8f0,#f8fafc)",


borderRadius:"50px",

overflow:"hidden",

boxShadow:
"inset 0 4px 8px rgba(0,0,0,.08)"


},




progressBar:{


height:"100%",

borderRadius:"50px",

transition:
"width 1.5s cubic-bezier(.16,1,.3,1)",


boxShadow:
"0 0 25px currentColor"


},




percentText:{


marginTop:"10px",

fontSize:"13px",

fontWeight:"800",

color:"#64748b",

textAlign:"right"


},






noData:{


textAlign:"center",

padding:"30px",

fontSize:"15px",

fontWeight:"600",

color:"#94a3b8"

},








/* ================= LOADING ================= */



loadingBox:{


height:"450px",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",


background:
"rgba(255,255,255,.75)",


backdropFilter:
"blur(20px)",


borderRadius:"35px",

boxShadow:
"0 30px 80px rgba(15,23,42,.12)"

},




spinner:{


width:"70px",

height:"70px",

borderRadius:"50%",


border:
"8px solid #e0f2fe",


borderTop:
"8px solid #2563eb",


animation:
"spin 1s linear infinite",

marginBottom:"30px"

},







/* ================= EMPTY ================= */



emptyBox:{


padding:"90px 50px",

background:
"rgba(255,255,255,.8)",

backdropFilter:
"blur(20px)",


borderRadius:"35px",

textAlign:"center",

border:
"1px solid #e2e8f0",


boxShadow:
"0 30px 80px rgba(15,23,42,.12)"

},



emptyIcon:{


fontSize:"100px",

marginBottom:"30px",

animation:
"floating 3s infinite"

}



};



export default Statistics;