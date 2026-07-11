// import { useEffect, useState } from "react";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import API from "../../api/axios";



// function AssetProfile(){


// const {id}=useParams();

// const navigate=useNavigate();


// const [asset,setAsset]=useState(null);

// const [history,setHistory]=useState([]);

// const [loading,setLoading]=useState(true);





// useEffect(()=>{

// loadAsset();

// loadHistory();

// },[]);







// const loadAsset=async()=>{


// try{


// const res =
// await API.get(`/assets/${id}`);


// setAsset(res.data.asset);



// }
// catch(error){

// console.log(error);

// }


// };







// const loadHistory=async()=>{


// try{


// const res =
// await API.get(`/assets/${id}/history`);


// setHistory(res.data.history || []);



// }
// catch(error){

// console.log(error);

// }
// finally{

// setLoading(false);

// }


// };








// if(loading)

// return(

// <DashboardLayout>

// <div style={styles.loading}>

// Loading asset profile...

// </div>

// </DashboardLayout>

// );








// if(!asset)

// return(

// <DashboardLayout>

// <div style={styles.loading}>

// Asset not found

// </div>

// </DashboardLayout>

// );






// const image =

// asset.asset_image

// ?

// `http://localhost:5000/uploads/assets/${asset.asset_image}`

// :

// null;







// return(


// <DashboardLayout>


// <div style={styles.page}>


// <div style={styles.header}>


// <div>


// <h1 style={styles.title}>

// Asset Profile

// </h1>


// <p style={styles.subtitle}>

// Complete asset information and history

// </p>


// </div>



// <button

// onClick={()=>navigate("/assets")}

// style={styles.back}

// >

// ← Back

// </button>



// </div>







// <div style={styles.hero}>


// <div style={styles.imageContainer}>


// {

// image ?


// <img

// src={image}

// style={styles.image}

// alt={asset.asset_name}

// />


// :


// <div style={styles.placeholder}>

// 💻

// </div>


// }



// </div>





// <div style={styles.heroInfo}>


// <h1>

// {asset.asset_name}

// </h1>


// <p style={styles.code}>

// {asset.asset_code}

// </p>



// <span

// style={
// asset.status==="Assigned"
// ?
// styles.assigned
// :
// styles.available
// }

// >

// {asset.status}

// </span>




// <div style={styles.buttons}>


// <Link

// to={`/assets/edit/${asset.id}`}

// style={styles.edit}

// >

// ✏ Edit

// </Link>



// <button

// style={styles.assign}

// >

// 🔄 Assign

// </button>



// <button

// style={styles.return}

// >

// ↩ Return

// </button>



// </div>


// </div>



// </div>







// <div style={styles.grid}>


// <div style={styles.card}>


// <h2>

// Asset Information

// </h2>



// <Info
// label="Category"
// value={asset.category}
// />


// <Info
// label="Brand"
// value={asset.brand}
// />


// <Info
// label="Model"
// value={asset.model}
// />


// <Info
// label="Serial Number"
// value={asset.serial_number}
// />


// <Info
// label="Purchase Date"
// value={asset.purchase_date}
// />


// <Info
// label="Purchase Price"
// value={
// asset.purchase_price
// ?
// "$ "+asset.purchase_price
// :
// "N/A"
// }
// />



// <Info
// label="Condition"
// value={asset.condition_status}
// />



// </div>







// <div style={styles.card}>


// <h2>

// Description

// </h2>



// <p style={styles.description}>

// {asset.description ||

// "No description available"}

// </p>



// </div>



// </div>








// <div style={styles.card}>


// <h2>

// Asset Timeline

// </h2>



// <div style={styles.timeline}>


// {

// history.map(item=>(


// <div

// key={item.id}

// style={styles.timelineItem}

// >


// <div style={styles.dot}></div>


// <div>


// <h3>

// {item.action}

// </h3>


// <p>

// {item.description}

// </p>


// <small>

// {item.created_at}

// </small>


// </div>


// </div>


// ))


// }



// {

// history.length===0 &&


// <p>

// No history available

// </p>

// }


// </div>




// </div>






// </div>


// </DashboardLayout>


// );

// }




// function Info({

// label,

// value

// }){


// return(

// <div style={styles.infoRow}>


// <span>

// {label}

// </span>


// <strong>

// {value || "N/A"}

// </strong>


// </div>

// );


// }






// const styles={


// page:{width:"100%"},



// header:{

// display:"flex",

// justifyContent:"space-between",

// marginBottom:"30px"

// },



// title:{

// fontSize:"32px",

// margin:0

// },



// subtitle:{

// color:"#64748b"

// },



// back:{

// padding:"12px 20px",

// border:"none",

// borderRadius:"10px",

// cursor:"pointer"

// },




// hero:{

// background:"white",

// padding:"30px",

// borderRadius:"25px",

// display:"flex",

// gap:"35px",

// alignItems:"center",

// boxShadow:"0 15px 35px rgba(0,0,0,.08)"

// },




// imageContainer:{

// width:"300px",

// height:"260px",

// borderRadius:"20px",

// overflow:"hidden",

// background:"#f1f5f9"

// },



// image:{

// width:"100%",

// height:"100%",

// objectFit:"cover"

// },



// placeholder:{

// height:"100%",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontSize:"90px"

// },



// code:{

// color:"#64748b"

// },



// assigned:{

// background:"#dbeafe",

// color:"#1d4ed8",

// padding:"10px 18px",

// borderRadius:"30px"

// },



// available:{

// background:"#dcfce7",

// color:"#15803d",

// padding:"10px 18px",

// borderRadius:"30px"

// },



// buttons:{

// marginTop:"25px",

// display:"flex",

// gap:"12px"

// },



// edit:{

// background:"#2563eb",

// color:"white",

// padding:"12px 20px",

// borderRadius:"10px",

// textDecoration:"none"

// },



// assign:{

// background:"#16a34a",

// color:"white",

// border:"none",

// padding:"12px 20px",

// borderRadius:"10px"

// },



// return:{

// background:"#f59e0b",

// color:"white",

// border:"none",

// padding:"12px 20px",

// borderRadius:"10px"

// },



// grid:{

// display:"grid",

// gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",

// gap:"25px",

// marginTop:"30px"

// },



// card:{

// background:"white",

// padding:"25px",

// borderRadius:"22px",

// boxShadow:"0 10px 30px rgba(0,0,0,.08)",

// marginTop:"30px"

// },



// infoRow:{

// display:"flex",

// justifyContent:"space-between",

// padding:"12px 0",

// borderBottom:"1px solid #e2e8f0"

// },



// description:{

// color:"#475569",

// lineHeight:"1.7"

// },



// timelineItem:{

// display:"flex",

// gap:"20px",

// marginBottom:"25px"

// },



// dot:{

// width:"15px",

// height:"15px",

// background:"#2563eb",

// borderRadius:"50%",

// marginTop:"8px"

// },



// loading:{

// background:"white",

// padding:"50px",

// textAlign:"center",

// borderRadius:"20px"

// }



// };



// export default AssetProfile;
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

width:"100%"

},



header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"30px"

},




title:{

fontSize:"32px",

margin:0,

color:"#0f172a"

},



subtitle:{

color:"#64748b"

},



back:{

padding:"12px 20px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

},





hero:{

background:"white",

padding:"35px",

borderRadius:"25px",

display:"flex",

gap:"35px",

alignItems:"center",

boxShadow:"0 15px 40px rgba(0,0,0,.08)"

},



imageBox:{

width:"300px",

height:"260px",

borderRadius:"20px",

overflow:"hidden",

background:"#f1f5f9"

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

fontSize:"100px"

},



heroContent:{


flex:1

},



code:{

color:"#64748b"

},



available:{

background:"#dcfce7",

color:"#15803d",

padding:"10px 20px",

borderRadius:"30px"

},



assigned:{

background:"#dbeafe",

color:"#1d4ed8",

padding:"10px 20px",

borderRadius:"30px"

},



maintenance:{

background:"#fef3c7",

color:"#b45309",

padding:"10px 20px",

borderRadius:"30px"

},





buttons:{

marginTop:"25px",

display:"flex",

gap:"15px"

},




edit:{

background:"#2563eb",

color:"white",

padding:"12px 20px",

borderRadius:"10px",

textDecoration:"none"

},



assign:{

background:"#16a34a",

color:"white",

border:"none",

padding:"12px 20px",

borderRadius:"10px",

cursor:"pointer"

},



return:{

background:"#f59e0b",

color:"white",

border:"none",

padding:"12px 20px",

borderRadius:"10px",

cursor:"pointer"

},





grid:{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",

gap:"25px",

marginTop:"30px"

},



card:{

background:"white",

padding:"25px",

borderRadius:"22px",

boxShadow:"0 10px 30px rgba(0,0,0,.08)",

marginTop:"30px"

},



employee:{

display:"flex",

gap:"20px",

alignItems:"center"

},



avatar:{

width:"70px",

height:"70px",

borderRadius:"50%",

background:"#2563eb",

color:"white",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px",

fontWeight:"bold"

},




infoRow:{

display:"flex",

justifyContent:"space-between",

padding:"12px 0",

borderBottom:"1px solid #e2e8f0"

},



description:{

color:"#475569",

lineHeight:"1.7"

},




loading:{

background:"white",

padding:"50px",

borderRadius:"20px",

textAlign:"center"

}



};



export default AssetProfile;