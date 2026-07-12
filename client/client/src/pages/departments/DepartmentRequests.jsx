
import { 
  useEffect, 
  useMemo, 
  useState 
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";




function DepartmentRequests(){



const [requests,setRequests] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");







useEffect(()=>{


loadRequests();


},[]);









const loadRequests = async()=>{


try{


const response = await API.get(
"/department-requests"
);



setRequests(
response.data.requests || []
);



}

catch(error){


console.log(error);


}

finally{


setLoading(false);


}


};









const updateStatus = async(id,status)=>{


try{


await API.put(

`/department-requests/${id}/status`,

{
status,
}

);



loadRequests();



}

catch(error){


console.log(error);


alert(
"Status update failed"
);


}


};









const filteredRequests = requests.filter((req)=>{


return (

req.title
?.toLowerCase()
.includes(
search.toLowerCase()
)


||


req.request_number
?.toLowerCase()
.includes(
search.toLowerCase()
)



||


req.requester
?.toLowerCase()
.includes(
search.toLowerCase()
)


);


});









const statistics = useMemo(()=>{


return{


total:requests.length,


pending:requests.filter(
(r)=>r.status==="Pending"
).length,


progress:requests.filter(
(r)=>r.status==="In Progress"
).length,


completed:requests.filter(
(r)=>r.status==="Completed"
).length,


rejected:requests.filter(
(r)=>r.status==="Rejected"
).length,


};



},[requests]);









if(loading){


return(

<DashboardLayout>


<div style={styles.loadingContainer}>


<div style={styles.loader}></div>


<h2>

Loading Department Requests...

</h2>


<p>

Please wait while request data is prepared.

</p>


</div>


</DashboardLayout>


);


}









return(


<DashboardLayout>


<div style={styles.page}>




{/* ================= HEADER ================= */}



<div style={styles.header}>


<div>


<span style={styles.pageLabel}>

REQUEST MANAGEMENT

</span>



<h1 style={styles.title}>

📨 Department Requests

</h1>




<p style={styles.subtitle}>

Review, approve, reject and track department work requests efficiently.

</p>



</div>









<div style={styles.totalCard}>


<div style={styles.totalIcon}>

📋

</div>



<div>


<h2 style={styles.totalNumber}>

{statistics.total}

</h2>



<p style={styles.totalText}>

Total Requests

</p>


</div>



</div>




</div>









{/* ================= STATISTICS ================= */}



<div style={styles.statsGrid}>






<div style={styles.statCard}>


<div style={styles.statIcon}>

📄

</div>


<div>

<h2 style={styles.statNumber}>
{statistics.total}
</h2>


<p style={styles.statLabel}>
Total Requests
</p>


</div>


</div>









<div style={styles.statCard}>


<div style={styles.pendingIcon}>

🟡

</div>


<div>


<h2>

{statistics.pending}

</h2>


<p>

Pending

</p>


</div>


</div>









<div style={styles.statCard}>


<div style={styles.progressIcon}>

⏳

</div>


<div>


<h2>

{statistics.progress}

</h2>


<p>

In Progress

</p>


</div>


</div>









<div style={styles.statCard}>


<div style={styles.successIcon}>

✅

</div>


<div>


<h2>

{statistics.completed}

</h2>


<p>

Completed

</p>


</div>


</div>









<div style={styles.statCard}>


<div style={styles.dangerIcon}>

❌

</div>


<div>


<h2>

{statistics.rejected}

</h2>


<p>

Rejected

</p>


</div>


</div>





</div>


{/* ================= SEARCH TOOLBAR ================= */}


<div style={styles.toolbar}>


<div style={styles.searchBox}>


<div style={styles.searchIcon}>

🔍

</div>



<input

placeholder="Search request number, title or requester..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

style={styles.search}

/>



</div>



</div>









{/* ================= REQUEST TABLE CARD ================= */}



<div style={styles.card}>




<div style={styles.tableHeader}>


<div>


<h2 style={styles.tableTitle}>

Department Requests

</h2>



<p style={styles.tableSubtitle}>

Manage incoming department activities and approvals

</p>


</div>





<div style={styles.countBadge}>

{filteredRequests.length}

&nbsp; Results

</div>



</div>









<div style={styles.tableWrapper}>


<table style={styles.table}>


<thead>


<tr>


<th style={styles.th}>

Request

</th>


<th style={styles.th}>

Requester

</th>


<th style={styles.th}>

Category

</th>


<th style={styles.th}>

Priority

</th>


<th style={styles.th}>

Status

</th>


<th style={styles.th}>

Date

</th>


<th style={styles.th}>

Actions

</th>



</tr>



</thead>







<tbody>



{


filteredRequests.length===0 ?



(



<tr>


<td

colSpan="7"

style={styles.empty}

>


<div style={styles.emptyBox}>


<div style={styles.emptyIcon}>

📭

</div>



<h3>

No Requests Found

</h3>



<p>

No department requests match your search.

</p>



</div>



</td>


</tr>



)





:



filteredRequests.map((req)=>(



<tr

key={req.id}

style={styles.row}

>









<td style={styles.td}>


<div style={styles.requestNumber}>

{req.request_number}

</div>



<div style={styles.requestTitle}>

{req.title}

</div>



</td>









<td style={styles.td}>


<div style={styles.userCell}>


<div style={styles.avatar}>

{req.requester
?.charAt(0)
?.toUpperCase()}

</div>



<span>

{req.requester}

</span>



</div>



</td>









<td style={styles.td}>


<span style={styles.categoryBadge}>

{req.category}

</span>



</td>









<td style={styles.td}>


<span

style={{

...styles.badge,

...priorityStyle(
req.priority
),

}}

>


{req.priority}


</span>



</td>









<td style={styles.td}>


<span

style={{

...styles.badge,

...statusStyle(
req.status
),

}}

>


{req.status}


</span>



</td>









<td style={styles.td}>


<span style={styles.dateText}>


{

new Date(

req.created_at

).toLocaleDateString()

}



</span>



</td>









<td style={styles.td}>


<div style={styles.actions}>


<button

style={styles.view}

>

👁 View

</button>








{


req.status !== "Completed"

&&


(


<button

style={styles.approve}

onClick={()=>


updateStatus(

req.id,

"Completed"

)


}

>

✓ Approve

</button>


)


}










{


req.status !== "Rejected"

&&


(


<button

style={styles.reject}

onClick={()=>


updateStatus(

req.id,

"Rejected"

)


}

>

✕ Reject

</button>


)


}



</div>



</td>





</tr>



))



}



</tbody>



</table>



</div>




</div>





</div>


</DashboardLayout>


);

}









function priorityStyle(priority){


switch(priority){


case "Urgent":

return{

background:"#fee2e2",

color:"#b91c1c"

};



case "High":

return{

background:"#ffedd5",

color:"#c2410c"

};



case "Medium":

return{

background:"#fef3c7",

color:"#92400e"

};



default:


return{

background:"#dbeafe",

color:"#1d4ed8"

};


}


}









function statusStyle(status){


switch(status){


case "Completed":

return{

background:"#dcfce7",

color:"#15803d"

};



case "Rejected":

return{

background:"#fee2e2",

color:"#b91c1c"

};



case "In Progress":

return{

background:"#ede9fe",

color:"#6d28d9"

};



case "Assigned":

return{

background:"#dbeafe",

color:"#1d4ed8"

};



default:

return{

background:"#fef3c7",

color:"#92400e"

};



}


}
const styles = {


page:{

width:"100%",

minHeight:"100vh",

padding:"30px",

background:"#f8fafc",

fontFamily:"Inter,Arial,sans-serif"

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

display:"block",

marginBottom:"10px"


},




title:{


margin:0,

fontSize:"36px",

fontWeight:"850",

color:"#0f172a",

letterSpacing:"-0.7px"


},




subtitle:{


marginTop:"10px",

color:"#64748b",

fontSize:"16px",

lineHeight:"1.6"


},









/* ================= TOTAL CARD ================= */


totalCard:{


display:"flex",

alignItems:"center",

gap:"15px",

background:

"linear-gradient(135deg,#2563eb,#1d4ed8)",

padding:"22px 30px",

borderRadius:"22px",

color:"#ffffff",

boxShadow:

"0 18px 40px rgba(37,99,235,.25)"


},




totalIcon:{


width:"55px",

height:"55px",

borderRadius:"18px",

background:"rgba(255,255,255,.18)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"28px"


},




totalNumber:{


margin:0,

fontSize:"32px",

fontWeight:"850"


},




totalText:{


margin:"5px 0 0",

fontSize:"14px",

opacity:.9


},







/* ================= STATISTICS ================= */



statsGrid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(220px,1fr))",

gap:"22px",

marginBottom:"35px"


},





statCard:{


background:"#ffffff",

borderRadius:"22px",

padding:"24px",

display:"flex",

alignItems:"center",

gap:"18px",

border:

"1px solid #e2e8f0",

boxShadow:

"0 15px 35px rgba(15,23,42,.07)",

transition:"all .3s ease"


},










statIcon:{


width:"62px",

height:"62px",

borderRadius:"18px",

background:"#eff6ff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px"


},



pendingIcon:{


width:"62px",

height:"62px",

borderRadius:"18px",

background:"#fef3c7",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px"


},



progressIcon:{


width:"62px",

height:"62px",

borderRadius:"18px",

background:"#ede9fe",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px"


},




successIcon:{


width:"62px",

height:"62px",

borderRadius:"18px",

background:"#dcfce7",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px"


},



dangerIcon:{


width:"62px",

height:"62px",

borderRadius:"18px",

background:"#fee2e2",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px"


},









/* ================= SEARCH ================= */



toolbar:{


marginBottom:"30px"


},




// searchBox:{


// background:"#ffffff",

// padding:"18px",

// borderRadius:"20px",

// display:"flex",

// alignItems:"center",

// gap:"15px",

// boxShadow:

// "0 12px 35px rgba(15,23,42,.06)",

// border:

// "1px solid #e2e8f0"


// },
searchBox:{

background:"#ffffff",

padding:"20px",

borderRadius:"25px",

display:"flex",

alignItems:"center",

gap:"15px",

boxShadow:
"0 15px 40px rgba(15,23,42,.08)",

border:
"1px solid #e2e8f0",

transition:"all .3s ease"

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




search:{


flex:1,

border:"none",

outline:"none",

fontSize:"15px",

padding:"12px",

background:"transparent"


},









/* ================= TABLE CARD ================= */


// card:{


// background:"#ffffff",

// borderRadius:"25px",

// overflow:"hidden",

// boxShadow:

// "0 18px 45px rgba(15,23,42,.08)",

// border:

// "1px solid #e2e8f0"


// },
card:{

background:"linear-gradient(145deg,#ffffff,#f8fafc)",

borderRadius:"30px",

overflow:"hidden",

boxShadow:
"0 25px 60px rgba(15,23,42,.10)",

border:
"1px solid rgba(226,232,240,.8)",

transition:"all .35s ease"

},



// tableHeader:{


// padding:"25px 30px",

// display:"flex",

// justifyContent:"space-between",

// alignItems:"center",

// borderBottom:

// "1px solid #e2e8f0"


// },
tableHeader:{

padding:"30px 35px",

display:"flex",

justifyContent:"space-between",

alignItems:"center",

background:
"linear-gradient(135deg,#ffffff,#f8fafc)",

borderBottom:
"1px solid #e2e8f0"

},



tableTitle:{


margin:0,

fontSize:"22px",

fontWeight:"800",

color:"#0f172a"


},




tableSubtitle:{


margin:"6px 0 0",

color:"#64748b",

fontSize:"14px"


},




countBadge:{


background:"#2563eb",

color:"#fff",

padding:"9px 16px",

borderRadius:"30px",

fontSize:"13px",

fontWeight:"700"


},









tableWrapper:{


overflowX:"auto"


},




// table:{


// width:"100%",

// borderCollapse:"collapse",

// minWidth:"1100px"


// },

table:{

width:"100%",

borderCollapse:"separate",

borderSpacing:"0 14px",

minWidth:"1150px",

padding:"0 20px"

},


// th:{


// padding:"17px 22px",

// background:"#f8fafc",

// textAlign:"left",

// fontSize:"12px",

// fontWeight:"800",

// color:"#64748b",

// textTransform:"uppercase",

// letterSpacing:".6px",

// borderBottom:

// "1px solid #e2e8f0"


// },

th:{

padding:"18px 25px",

background:"#0f172a",

color:"#ffffff",

textAlign:"left",

fontSize:"12px",

fontWeight:"800",

textTransform:"uppercase",

letterSpacing:"1px",

},



// td:{


// padding:"18px 22px",

// borderBottom:

// "1px solid #f1f5f9",

// fontSize:"14px",

// color:"#334155",

// verticalAlign:"middle"


// },
td:{

padding:"20px 25px",

background:"#ffffff",

fontSize:"14px",

color:"#334155",

verticalAlign:"middle",

borderTop:
"1px solid #f1f5f9",

borderBottom:
"1px solid #f1f5f9",

transition:"all .3s ease"

},



// row:{


// transition:"background .2s"


// },

row:{

transition:"all .35s ease",

cursor:"pointer",

},
rowHover:{

transform:"translateY(-5px)",

boxShadow:
"0 15px 35px rgba(37,99,235,.15)"

},





/* ================= REQUEST CELL ================= */


// requestNumber:{


// fontWeight:"800",

// color:"#0f172a",

// fontSize:"15px"


// },
requestNumber:{

fontWeight:"900",

color:"#0f172a",

fontSize:"16px",

letterSpacing:".3px"

},


// requestTitle:{


// display:"block",

// marginTop:"5px",

// color:"#64748b",

// fontSize:"13px"


// },

requestTitle:{

marginTop:"7px",

color:"#64748b",

fontSize:"13px",

fontWeight:"500",

maxWidth:"260px",

lineHeight:"1.5"

},


userCell:{


display:"flex",

alignItems:"center",

gap:"10px"


},




// avatar:{


// width:"38px",

// height:"38px",

// borderRadius:"50%",

// background:"#dbeafe",

// color:"#1d4ed8",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontWeight:"800"


// },
avatar:{

width:"45px",

height:"45px",

borderRadius:"50%",

background:
"linear-gradient(135deg,#2563eb,#60a5fa)",

color:"#fff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontWeight:"900",

fontSize:"16px",

boxShadow:
"0 8px 20px rgba(37,99,235,.35)"

},



// categoryBadge:{


// padding:"7px 12px",

// borderRadius:"20px",

// background:"#f1f5f9",

// color:"#475569",

// fontSize:"12px",

// fontWeight:"700"


// },
categoryBadge:{

padding:"8px 15px",

borderRadius:"50px",

background:
"linear-gradient(135deg,#f1f5f9,#e2e8f0)",

color:"#475569",

fontSize:"12px",

fontWeight:"800",

boxShadow:
"0 5px 15px rgba(15,23,42,.05)"

},







/* ================= BADGES ================= */



// badge:{


// display:"inline-flex",

// padding:"7px 14px",

// borderRadius:"30px",

// fontSize:"12px",

// fontWeight:"750",

// whiteSpace:"nowrap"


// },
badge:{

display:"inline-flex",

alignItems:"center",

justifyContent:"center",

padding:"8px 16px",

borderRadius:"50px",

fontSize:"12px",

fontWeight:"900",

letterSpacing:".4px",

boxShadow:
"0 5px 15px rgba(0,0,0,.08)"

},







/* ================= ACTIONS ================= */


// actions:{


// display:"flex",

// gap:"8px",

// flexWrap:"wrap"


// },

actions:{

display:"flex",

gap:"10px",

alignItems:"center",

},



// view:{


// padding:"9px 14px",

// borderRadius:"12px",

// border:"1px solid #cbd5e1",

// background:"#fff",

// color:"#334155",

// fontWeight:"700",

// cursor:"pointer"


// },

view:{

padding:"10px 16px",

borderRadius:"14px",

border:
"1px solid #cbd5e1",

background:"#ffffff",

color:"#334155",

fontWeight:"800",

cursor:"pointer",

transition:"all .3s ease",

boxShadow:
"0 5px 15px rgba(15,23,42,.05)"

},


// approve:{


// padding:"9px 14px",

// border:"none",

// borderRadius:"12px",

// background:"#16a34a",

// color:"#fff",

// fontWeight:"700",

// cursor:"pointer"


// },

approve:{

padding:"10px 18px",

border:"none",

borderRadius:"14px",

background:
"linear-gradient(135deg,#16a34a,#22c55e)",

color:"#ffffff",

fontWeight:"800",

cursor:"pointer",

boxShadow:
"0 10px 25px rgba(22,163,74,.3)",

transition:"all .3s ease"

},


// reject:{


// padding:"9px 14px",

// border:"none",

// borderRadius:"12px",

// background:"#dc2626",

// color:"#fff",

// fontWeight:"700",

// cursor:"pointer"


// },

reject:{

padding:"10px 18px",

border:"none",

borderRadius:"14px",

background:
"linear-gradient(135deg,#dc2626,#ef4444)",

color:"#ffffff",

fontWeight:"800",

cursor:"pointer",

boxShadow:
"0 10px 25px rgba(220,38,38,.3)",

transition:"all .3s ease"

},







/* ================= EMPTY ================= */


empty:{


textAlign:"center",

padding:"70px 20px"


},




emptyBox:{


display:"flex",

flexDirection:"column",

alignItems:"center"


},




emptyIcon:{


fontSize:"70px",

marginBottom:"15px"


},









/* ================= LOADING ================= */


loadingContainer:{


background:"#ffffff",

padding:"90px 30px",

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
statNumber:{


margin:0,

fontSize:"30px",

fontWeight:"850",

color:"#0f172a"


},



statLabel:{


margin:"6px 0 0",

fontSize:"14px",

fontWeight:"600",

color:"#64748b"


},



dateText:{


fontSize:"13px",

color:"#64748b",

fontWeight:"600"


},



loadingText:{


marginTop:"10px",

color:"#64748b",

fontSize:"15px"


}



};


export default DepartmentRequests;