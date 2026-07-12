
import {useEffect,useState} from "react";

import {
useParams,
useNavigate,
Link
}
from "react-router-dom";


import DashboardLayout from "../../layouts/DashboardLayout";


import API from "../../api/axios";


import AssignAssetModal 
from "./components/AssignAssetModal";


import ReturnAssetModal
from "./components/ReturnAssetModal";


import AssetHistory
from "./components/AssetHistory";




function AssetProfile(){


const {id}=useParams();

const navigate=useNavigate();



const [asset,setAsset]=useState(null);

const [loading,setLoading]=useState(true);


const [assignOpen,setAssignOpen]=useState(false);

const [returnOpen,setReturnOpen]=useState(false);







useEffect(()=>{

loadAsset();

},[]);







const loadAsset=async()=>{


try{


setLoading(true);


const res =
await API.get(`/assets/${id}`);


setAsset(res.data.asset);



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

Loading asset profile...

</div>

</DashboardLayout>

);





if(!asset)

return(

<DashboardLayout>

<div style={styles.loading}>

Asset not found

</div>

</DashboardLayout>

);







const image = asset.asset_image

?

`http://localhost:5000/uploads/assets/${asset.asset_image}`

:

null;








return(


<DashboardLayout>


<div style={styles.page}>


{/* HEADER */}

<div style={styles.header}>


<div>

<h1 style={styles.title}>

Asset Profile

</h1>


<p style={styles.subtitle}>

Complete asset information and lifecycle history

</p>


</div>



<button

style={styles.back}

onClick={()=>navigate("/assets")}

>

← Back

</button>


</div>









{/* HERO */}

<div style={styles.hero}>


<div style={styles.imageBox}>


{

image ?


<img

src={image}

alt={asset.asset_name}

style={styles.image}

/>


:

<div style={styles.placeholder}>

📦

</div>


}



</div>









<div style={styles.heroContent}>


<h1>

{asset.asset_name}

</h1>


<p style={styles.code}>

{asset.asset_code}

</p>





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







<div style={styles.buttons}>


<Link

to={`/assets/edit/${asset.id}`}

style={styles.edit}

>

✏ Edit

</Link>





{

asset.status==="Available" &&

<button

onClick={()=>setAssignOpen(true)}

style={styles.assign}

>

👤 Assign

</button>

}






{

asset.status==="Assigned" &&

<button

onClick={()=>setReturnOpen(true)}

style={styles.return}

>

↩ Return

</button>

}





</div>


</div>


</div>









{/* ASSIGNED EMPLOYEE */}


{

asset.status==="Assigned" &&

<div style={styles.card}>


<h2>

Assigned Employee

</h2>



<div style={styles.employee}>


<div style={styles.avatar}>

{

asset.first_name?.charAt(0)

}

</div>



<div>


<h3>

{asset.first_name}

{" "}

{asset.last_name}

</h3>


<p>

Employee ID:

<strong>

{" "}

{asset.employee_id}

</strong>

</p>


<p>

Department:

<strong>

{" "}

{asset.department_name || "N/A"}

</strong>

</p>


<p>

Assigned Date:

<strong>

{" "}

{asset.assigned_date}

</strong>

</p>



</div>



</div>



</div>

}









<div style={styles.grid}>



<div style={styles.card}>


<h2>

Asset Information

</h2>



<Info
label="Category"
value={asset.category}
/>


<Info
label="Brand"
value={asset.brand}
/>


<Info
label="Model"
value={asset.model}
/>


<Info
label="Serial Number"
value={asset.serial_number}
/>


<Info
label="Purchase Date"
value={asset.purchase_date}
/>


<Info
label="Purchase Price"
value={
asset.purchase_price
?
"$ "+asset.purchase_price
:
"N/A"
}
/>


<Info
label="Condition"
value={asset.condition_status}
/>



</div>







<div style={styles.card}>


<h2>

Description

</h2>


<p style={styles.description}>

{

asset.description ||

"No description available"

}

</p>



</div>


</div>









{/* HISTORY */}


<div style={styles.card}>


<h2>

Asset Activity Timeline

</h2>


<AssetHistory assetId={id}/>



</div>









{

assignOpen &&


<AssignAssetModal

assetId={id}

close={()=>setAssignOpen(false)}

refresh={loadAsset}

/>


}







{

returnOpen &&


<ReturnAssetModal

assetId={id}

close={()=>setReturnOpen(false)}

refresh={loadAsset}

/>


}




</div>


</DashboardLayout>


);

}









function Info({label,value}){


return(

<div style={styles.infoRow}>


<span>

{label}

</span>


<strong>

{value || "N/A"}

</strong>


</div>

);


}





const styles={


page:{

width:"100%",

minHeight:"100vh",

animation:"fadeIn .6s ease"

},






/* ================= HEADER ================= */


header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"40px",

flexWrap:"wrap",

gap:"20px"

},




title:{


fontSize:"42px",

fontWeight:"950",

letterSpacing:"-1px",

margin:0,


background:
"linear-gradient(90deg,#020617,#2563eb,#06b6d4)",


WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent"


},




subtitle:{


color:"#64748b",

fontSize:"16px",

fontWeight:"600"

},




back:{


padding:"14px 28px",

border:"none",

borderRadius:"18px",

background:"#ffffff",

fontWeight:"800",

cursor:"pointer",

boxShadow:
"0 15px 35px rgba(15,23,42,.12)",

transition:".3s"

},








/* ================= HERO ================= */


hero:{


background:
"linear-gradient(135deg,#ffffff,#f8fafc)",


padding:"45px",

borderRadius:"40px",


display:"flex",

gap:"45px",

alignItems:"center",

flexWrap:"wrap",


boxShadow:
"0 35px 90px rgba(15,23,42,.15)",


border:
"1px solid #e2e8f0",

position:"relative",

overflow:"hidden"


},






imageBox:{


width:"330px",

height:"280px",

borderRadius:"35px",

overflow:"hidden",

background:
"linear-gradient(145deg,#e2e8f0,#f8fafc)",


boxShadow:
"0 30px 70px rgba(15,23,42,.2)",


transition:".4s"


},




image:{


width:"100%",

height:"100%",

objectFit:"cover"

},




placeholder:{


height:"100%",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"120px"


},




heroContent:{


flex:1

},




code:{


color:"#64748b",

fontWeight:"700",

fontSize:"16px"

},








/* ================= STATUS ================= */



available:{


background:
"linear-gradient(135deg,#22c55e,#16a34a)",

color:"#fff",

padding:"12px 25px",

borderRadius:"999px",

fontWeight:"900",

display:"inline-block",

boxShadow:
"0 15px 35px rgba(22,163,74,.35)"

},




assigned:{


background:
"linear-gradient(135deg,#2563eb,#06b6d4)",

color:"#fff",

padding:"12px 25px",

borderRadius:"999px",

fontWeight:"900",

display:"inline-block",

boxShadow:
"0 15px 35px rgba(37,99,235,.35)"


},




maintenance:{


background:
"linear-gradient(135deg,#f59e0b,#f97316)",

color:"#fff",

padding:"12px 25px",

borderRadius:"999px",

fontWeight:"900",

display:"inline-block",

boxShadow:
"0 15px 35px rgba(245,158,11,.35)"


},







/* ================= BUTTONS ================= */



buttons:{


marginTop:"30px",

display:"flex",

gap:"15px",

flexWrap:"wrap"

},




edit:{


background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#fff",

padding:"14px 30px",

borderRadius:"18px",

fontWeight:"900",

textDecoration:"none",

boxShadow:
"0 20px 45px rgba(37,99,235,.35)",

transition:".3s"

},




assign:{


background:
"linear-gradient(135deg,#16a34a,#22c55e)",

color:"#fff",

padding:"14px 30px",

border:"none",

borderRadius:"18px",

fontWeight:"900",

cursor:"pointer",

boxShadow:
"0 20px 45px rgba(22,163,74,.35)",

transition:".3s"


},




return:{


background:
"linear-gradient(135deg,#f59e0b,#ea580c)",

color:"#fff",

padding:"14px 30px",

border:"none",

borderRadius:"18px",

fontWeight:"900",

cursor:"pointer",

boxShadow:
"0 20px 45px rgba(245,158,11,.35)",

transition:".3s"


},







/* ================= CARDS ================= */



grid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",

gap:"30px",

marginTop:"35px"


},




card:{


background:
"rgba(255,255,255,.85)",


backdropFilter:
"blur(20px)",


padding:"35px",

borderRadius:"35px",

boxShadow:
"0 25px 70px rgba(15,23,42,.12)",


border:
"1px solid #e2e8f0",

marginTop:"35px",

transition:".35s"


},







employee:{


display:"flex",

gap:"25px",

alignItems:"center",

background:
"linear-gradient(145deg,#f8fafc,#ffffff)",

padding:"25px",

borderRadius:"25px"


},





avatar:{


width:"85px",

height:"85px",

borderRadius:"50%",

background:
"linear-gradient(135deg,#2563eb,#06b6d4)",

color:"#fff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"35px",

fontWeight:"950",

boxShadow:
"0 20px 40px rgba(37,99,235,.3)"

},







/* ================= INFO ================= */


infoRow:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"16px 0",

borderBottom:
"1px solid #e2e8f0",

fontSize:"15px"

},




description:{


background:
"#f8fafc",

padding:"25px",

borderRadius:"25px",

color:"#475569",

lineHeight:"1.8",

fontSize:"16px"

},







/* ================= LOADING ================= */


loading:{


height:"400px",

background:"#fff",

borderRadius:"35px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"22px",

fontWeight:"900",

color:"#2563eb",

boxShadow:
"0 30px 80px rgba(15,23,42,.12)"

}



};





export default AssetProfile;