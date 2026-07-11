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






const styles={


page:{


width:"100%"

},



header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"30px",

flexWrap:"wrap"

},



title:{

fontSize:"32px",

margin:0,

color:"#0f172a"

},



subtitle:{

color:"#64748b"

},



addButton:{

background:"#2563eb",

color:"white",

padding:"14px 22px",

borderRadius:"12px",

textDecoration:"none",

fontWeight:"600"

},




cards:{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginBottom:"30px"

},




statCard:{

background:"white",

padding:"22px",

borderRadius:"20px",

display:"flex",

alignItems:"center",

gap:"20px",

boxShadow:"0 10px 25px rgba(0,0,0,.08)"

},



statIcon:{

fontSize:"35px"

},



statTitle:{

margin:0,

color:"#64748b"

},



statValue:{

margin:"5px 0",

fontSize:"28px",

color:"#0f172a"

},




filterCard:{

background:"white",

padding:"20px",

borderRadius:"18px",

display:"flex",

gap:"15px",

flexWrap:"wrap",

marginBottom:"30px",

boxShadow:"0 10px 25px rgba(0,0,0,.08)"

},



input:{

padding:"12px",

borderRadius:"10px",

border:"1px solid #ddd",

minWidth:"220px"

},




grid:{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(280px,1fr))",

gap:"25px"

},




assetCard:{

background:"white",

borderRadius:"22px",

overflow:"hidden",

boxShadow:"0 15px 35px rgba(0,0,0,.08)"

},




imageBox:{

height:"190px",

background:"#f1f5f9",

display:"flex",

justifyContent:"center",

alignItems:"center"

},



assetImage:{

width:"100%",

height:"100%",

objectFit:"cover"

},



placeholder:{

fontSize:"70px"

},




assetBody:{

padding:"20px"

},



assetName:{

margin:"0",

fontSize:"20px",

color:"#0f172a"

},



code:{

color:"#64748b"

},



info:{

display:"flex",

justifyContent:"space-between",

fontSize:"14px",

color:"#475569"

},




statusRow:{

marginTop:"18px"

},




available:{

background:"#dcfce7",

color:"#15803d",

padding:"8px 15px",

borderRadius:"20px",

fontWeight:"600"

},



assigned:{

background:"#dbeafe",

color:"#1d4ed8",

padding:"8px 15px",

borderRadius:"20px",

fontWeight:"600"

},



maintenance:{

background:"#fef3c7",

color:"#b45309",

padding:"8px 15px",

borderRadius:"20px",

fontWeight:"600"

},



actions:{

marginTop:"20px",

display:"flex",

gap:"15px"

},



view:{

fontSize:"22px",

textDecoration:"none"

},



edit:{

fontSize:"22px",

textDecoration:"none"

},



delete:{

border:"none",

background:"transparent",

fontSize:"22px",

cursor:"pointer"

},



loading:{

background:"white",

padding:"40px",

borderRadius:"20px",

textAlign:"center"

},



empty:{

background:"white",

padding:"60px",

borderRadius:"20px",

textAlign:"center"

},



emptyIcon:{

fontSize:"70px"

}



};



export default Assets;
