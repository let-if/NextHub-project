import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { getAssets, deleteAsset } from "../../services/assetService";


function Assets() {


const [assets,setAssets] = useState([]);

const [loading,setLoading] = useState(true);


const [filters,setFilters] = useState({

search:"",
category:"",
status:""

});





useEffect(()=>{

loadAssets();

},[filters]);





const loadAssets = async()=>{


try{


setLoading(true);


const data = await getAssets(filters);


setAssets(data.assets || []);



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};






const handleDelete = async(id)=>{


const confirmDelete =
window.confirm(
"Are you sure you want to delete this asset?"
);



if(!confirmDelete)
return;



try{


await deleteAsset(id);


loadAssets();



}
catch(error){

console.log(error);

}



};






return(


<DashboardLayout>


<div style={styles.page}>


{/* HEADER */}


<div style={styles.header}>


<div>

<h1 style={styles.title}>

Asset Management

</h1>


<p style={styles.subtitle}>

Manage company assets, equipment and assignments

</p>


</div>



<Link

to="/assets/add"

style={styles.addButton}

>

➕ Add Asset

</Link>


</div>





{/* STATISTICS */}


<div style={styles.cards}>


<StatCard
title="Total Assets"
value={assets.length}
icon="📦"
/>


<StatCard
title="Available"
value={
assets.filter(
a=>a.status==="Available"
).length
}
icon="🟢"
/>



<StatCard
title="Assigned"
value={
assets.filter(
a=>a.status==="Assigned"
).length
}
icon="👤"
/>



<StatCard
title="Maintenance"
value={
assets.filter(
a=>a.status==="Maintenance"
).length
}
icon="🛠️"
/>


</div>






{/* FILTERS */}


<div style={styles.filterCard}>


<input

placeholder="🔍 Search asset..."

value={filters.search}

onChange={(e)=>

setFilters({

...filters,

search:e.target.value

})

}

style={styles.input}

/>





<select

style={styles.input}

value={filters.category}

onChange={(e)=>

setFilters({

...filters,

category:e.target.value

})

}

>


<option value="">

All Categories

</option>

<option>Laptop</option>

<option>Printer</option>

<option>Phone</option>

<option>Vehicle</option>

</select>






<select

style={styles.input}

value={filters.status}

onChange={(e)=>

setFilters({

...filters,

status:e.target.value

})

}

>


<option value="">

All Status

</option>

<option>Available</option>

<option>Assigned</option>

<option>Maintenance</option>

<option>Disposed</option>


</select>



</div>







{

loading ?


<div style={styles.loading}>

Loading assets...

</div>



:


assets.length===0 ?


<div style={styles.empty}>

<div style={styles.emptyIcon}>
📦
</div>

<h2>
No Assets Found
</h2>

<p>
Start by adding your first company asset
</p>


<Link

to="/assets/add"

style={styles.addButton}

>

Add Asset

</Link>


</div>



:


<div style={styles.grid}>


{


assets.map(asset=>{


const image =
asset.asset_image
?
`http://localhost:5000/uploads/assets/${asset.asset_image}`
:
null;




return(


<div

key={asset.id}

style={styles.assetCard}

>




<div style={styles.imageBox}>


{

image ?


<img

src={image}

alt={asset.asset_name}

style={styles.assetImage}

/>


:


<div style={styles.placeholder}>

💻

</div>


}



</div>







<div style={styles.assetBody}>


<h2 style={styles.assetName}>

{asset.asset_name}

</h2>



<p style={styles.code}>

{asset.asset_code}

</p>



<div style={styles.info}>

<span>

🏷 {asset.category}

</span>


<span>

🏢 {asset.brand || "N/A"}

</span>


</div>






<div style={styles.statusRow}>


<span

style={
asset.status==="Assigned"
?
styles.assigned
:
asset.status==="Maintenance"
?
styles.maintenance
:
styles.available
}

>

{asset.status}

</span>



</div>






<div style={styles.actions}>


<Link

to={`/assets/${asset.id}`}

style={styles.view}

>

👁

</Link>



<Link

to={`/assets/edit/${asset.id}`}

style={styles.edit}

>

✏

</Link>



<button

onClick={()=>handleDelete(asset.id)}

style={styles.delete}

>

🗑

</button>



</div>




</div>




</div>


)


})


}



</div>


}





</div>


</DashboardLayout>


);


}








function StatCard({

title,

value,

icon

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

const styles = {


/* ================= PAGE ================= */


page:{


width:"100%",

minHeight:"100vh",

padding:"24px",

background:
"linear-gradient(135deg,#f8fafc,#eef2ff)",


boxSizing:"border-box"


},







/* ================= HEADER ================= */


header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

gap:"25px",

flexWrap:"wrap",

marginBottom:"45px"


},





pageLabel:{


fontSize:"13px",

fontWeight:"800",

letterSpacing:"1.5px",

textTransform:"uppercase",

color:"#4f46e5",

marginBottom:"12px"


},





title:{


margin:0,

fontSize:"42px",

fontWeight:"900",

letterSpacing:"-1.5px",

color:"#0f172a"


},





subtitle:{


marginTop:"12px",

maxWidth:"720px",

fontSize:"16px",

lineHeight:"1.8",

color:"#64748b"


},






addButton:{


display:"inline-flex",

alignItems:"center",

justifyContent:"center",

gap:"10px",

padding:"16px 32px",

borderRadius:"18px",

background:
"linear-gradient(135deg,#4f46e5,#2563eb)",


color:"#ffffff",

fontWeight:"800",

fontSize:"15px",

textDecoration:"none",

boxShadow:
"0 20px 40px rgba(79,70,229,.35)",


transition:"all .3s ease"


},





buttonIcon:{


fontSize:"24px",

fontWeight:"900"


},










/* ================= STAT CARDS ================= */


cards:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(260px,1fr))",


gap:"28px",

marginBottom:"45px"


},





statCard:{


background:
"rgba(255,255,255,.85)",


backdropFilter:
"blur(15px)",


borderRadius:"30px",

padding:"30px",


display:"flex",

alignItems:"center",

gap:"22px",


border:
"1px solid rgba(226,232,240,.8)",


boxShadow:
"0 25px 60px rgba(15,23,42,.10)",


transition:
"all .35s ease"


},





statIcon:{


width:"75px",

height:"75px",

borderRadius:"24px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"38px",

background:
"linear-gradient(135deg,#eef2ff,#dbeafe)",


boxShadow:
"0 15px 30px rgba(79,70,229,.20)"


},





statContent:{


flex:1


},





statTitle:{


margin:0,

fontSize:"14px",

fontWeight:"700",

color:"#64748b",

textTransform:"uppercase",

letterSpacing:"0.5px"


},





statValue:{


margin:"8px 0",

fontSize:"36px",

fontWeight:"900",

color:"#0f172a"


},





statDescription:{


fontSize:"14px",

fontWeight:"500",

color:"#94a3b8"


},

/* ================= FILTER SECTION ================= */


filterCard:{


background:
"rgba(255,255,255,.90)",


backdropFilter:
"blur(18px)",


borderRadius:"30px",


padding:"32px",


marginBottom:"45px",


border:
"1px solid rgba(226,232,240,.9)",


boxShadow:
"0 25px 60px rgba(15,23,42,.08)",


transition:
"all .3s ease"


},





filterHeader:{


marginBottom:"25px"


},





filterHeader_h3:{


margin:0,

fontSize:"22px",

fontWeight:"850",

color:"#0f172a",

letterSpacing:"-.3px"


},





filterGrid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",


gap:"20px"


},





input:{


width:"100%",

padding:"16px 18px",

borderRadius:"16px",

border:
"1px solid #cbd5e1",


background:
"#ffffff",


fontSize:"15px",

fontWeight:"600",

color:"#0f172a",

outline:"none",

boxSizing:"border-box",

transition:
"all .3s ease"


},











/* ================= ASSET GRID ================= */



grid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",


gap:"32px"


},







/* ================= ASSET CARD ================= */


assetCard:{


background:
"rgba(255,255,255,.95)",


backdropFilter:
"blur(20px)",


borderRadius:"32px",


overflow:"hidden",


border:
"1px solid rgba(226,232,240,.8)",


boxShadow:
"0 25px 70px rgba(15,23,42,.12)",


transition:
"all .35s ease",


position:"relative"


},





imageBox:{


height:"250px",

background:
"linear-gradient(135deg,#e0e7ff,#f8fafc)",


display:"flex",

alignItems:"center",

justifyContent:"center",

overflow:"hidden",

position:"relative"


},





assetImage:{


width:"100%",

height:"100%",

objectFit:"cover",

transition:
"transform .5s ease"


},





placeholder:{


fontSize:"90px",

opacity:"0.7"


},




/* ================= ASSET BODY ================= */


assetBody:{


padding:"32px"


},





assetTop:{


display:"flex",

justifyContent:"space-between",

alignItems:"flex-start",

gap:"18px",

marginBottom:"25px"


},





assetName:{


margin:0,

fontSize:"25px",

fontWeight:"900",

letterSpacing:"-.5px",

color:"#0f172a"


},





code:{


marginTop:"8px",

fontSize:"14px",

fontWeight:"700",

color:"#64748b",

display:"flex",

alignItems:"center",

gap:"6px"


},







/* ================= DETAILS ================= */


details:{


display:"flex",

flexDirection:"column",

gap:"15px"


},





detailItem:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"16px 18px",


borderRadius:"18px",


background:
"linear-gradient(135deg,#f8fafc,#ffffff)",


border:
"1px solid #e2e8f0",


fontSize:"14px",

fontWeight:"700",

color:"#475569",


transition:
"all .25s ease"


},







/* ================= CONDITION ================= */


condition:{


marginTop:"22px",

padding:"18px",

borderRadius:"20px",

background:
"linear-gradient(135deg,#eef2ff,#f8fafc)",


border:
"1px solid #e0e7ff",


color:"#475569",

fontSize:"14px",

fontWeight:"700",

lineHeight:"1.6"


},







/* ================= CARD META ================= */


metaBox:{


display:"flex",

alignItems:"center",

justifyContent:"space-between",

marginTop:"20px",

padding:"15px",

borderRadius:"18px",

background:"#f8fafc"


},





metaLabel:{


fontSize:"13px",

color:"#64748b",

fontWeight:"700"


},





metaValue:{


fontSize:"14px",

color:"#0f172a",

fontWeight:"800"


},



/* ================= STATUS BADGES ================= */


available:{


background:
"linear-gradient(135deg,#dcfce7,#bbf7d0)",


color:"#15803d",

padding:"9px 18px",

borderRadius:"999px",

fontSize:"13px",

fontWeight:"900",

display:"inline-flex",

alignItems:"center",

gap:"6px",

boxShadow:
"0 8px 20px rgba(22,163,74,.15)"


},






assigned:{


background:
"linear-gradient(135deg,#dbeafe,#bfdbfe)",


color:"#1d4ed8",

padding:"9px 18px",

borderRadius:"999px",

fontSize:"13px",

fontWeight:"900",

display:"inline-flex",

alignItems:"center",

gap:"6px",

boxShadow:
"0 8px 20px rgba(37,99,235,.15)"


},






maintenance:{


background:
"linear-gradient(135deg,#fef3c7,#fde68a)",


color:"#b45309",

padding:"9px 18px",

borderRadius:"999px",

fontSize:"13px",

fontWeight:"900",

display:"inline-flex",

alignItems:"center",

gap:"6px",

boxShadow:
"0 8px 20px rgba(180,83,9,.15)"


},






disposed:{


background:
"linear-gradient(135deg,#fee2e2,#fecaca)",


color:"#b91c1c",

padding:"9px 18px",

borderRadius:"999px",

fontSize:"13px",

fontWeight:"900",

display:"inline-flex",

alignItems:"center",

gap:"6px",

boxShadow:
"0 8px 20px rgba(185,28,28,.15)"


},










/* ================= ACTION BUTTONS ================= */



actions:{


display:"flex",

gap:"14px",

marginTop:"28px"


},






view:{


flex:1,

display:"flex",

alignItems:"center",

justifyContent:"center",

padding:"14px",

borderRadius:"16px",

background:
"linear-gradient(135deg,#eff6ff,#dbeafe)",


color:"#2563eb",

textDecoration:"none",

fontWeight:"900",

fontSize:"14px",

transition:
"all .3s ease",

border:
"1px solid #bfdbfe"


},






edit:{


flex:1,


display:"flex",

alignItems:"center",

justifyContent:"center",


padding:"14px",

borderRadius:"16px",


background:
"linear-gradient(135deg,#4f46e5,#2563eb)",


color:"#ffffff",

textDecoration:"none",

fontWeight:"900",

fontSize:"14px",

transition:
"all .3s ease",


boxShadow:
"0 15px 30px rgba(79,70,229,.30)"


},






delete:{


flex:1,

padding:"14px",

borderRadius:"16px",

border:"none",

background:
"linear-gradient(135deg,#fee2e2,#fecaca)",


color:"#dc2626",

fontWeight:"900",

fontSize:"14px",

cursor:"pointer",

transition:
"all .3s ease"


},







/* ================= HOVER SUPPORT ================= */


hoverCard:{


transform:
"translateY(-10px)",


boxShadow:
"0 35px 80px rgba(15,23,42,.20)"


},





hoverButton:{


transform:
"translateY(-4px)"


},




/* ================= LOADING STATE ================= */


loading:{


background:
"rgba(255,255,255,.95)",


backdropFilter:
"blur(20px)",


borderRadius:"32px",

padding:"100px 40px",

textAlign:"center",


border:
"1px solid #e2e8f0",


boxShadow:
"0 25px 70px rgba(15,23,42,.10)"


},





loadingIcon:{


fontSize:"70px",

marginBottom:"20px",

animation:
"pulse 1.5s infinite"


},







/* ================= EMPTY STATE ================= */


empty:{


background:
"rgba(255,255,255,.95)",


backdropFilter:
"blur(20px)",


padding:"100px 40px",

borderRadius:"32px",

textAlign:"center",


border:
"1px solid #e2e8f0",


boxShadow:
"0 25px 70px rgba(15,23,42,.10)"


},





emptyIcon:{


fontSize:"100px",

marginBottom:"25px",

opacity:"0.75"


},







/* ================= RESPONSIVE ================= */


responsiveContainer:{


width:"100%",


maxWidth:"1600px",


margin:"0 auto"


},





mobileTitle:{


fontSize:"30px"


},





mobilePadding:{


padding:"16px"


},





mobileGrid:{


gridTemplateColumns:
"1fr"


},







/* ================= EXTRA UI HELPERS ================= */


glass:{


background:
"rgba(255,255,255,.75)",


backdropFilter:
"blur(20px)",


border:
"1px solid rgba(255,255,255,.4)"


},





smallText:{


fontSize:"13px",

color:"#64748b",

fontWeight:"600"


},





primaryText:{


color:"#4f46e5",

fontWeight:"900"


},





divider:{


height:"1px",

background:"#e2e8f0",

margin:"25px 0"


}





};





export default Assets;



