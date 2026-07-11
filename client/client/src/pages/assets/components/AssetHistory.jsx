import {useEffect,useState} from "react";

import API from "../../../api/axios";



function AssetHistory({assetId}){


const [history,setHistory]=useState([]);

const [loading,setLoading]=useState(true);





useEffect(()=>{

loadHistory();

},[assetId]);






const loadHistory=async()=>{


try{


setLoading(true);


const res =
await API.get(
`/assets/${assetId}/history`
);



setHistory(
res.data.history || []
);



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

<div style={styles.loading}>

Loading activity history...

</div>

);








if(history.length===0)

return(

<div style={styles.empty}>


<div style={styles.emptyIcon}>

📜

</div>


<h3>

No Activity Yet

</h3>


<p>

Asset actions will appear here

</p>


</div>

);








return(


<div style={styles.timeline}>


{

history.map(item=>(


<div

key={item.id}

style={styles.item}

>



<div style={styles.left}>


<div style={styles.icon}>

{

getIcon(item.action)

}

</div>


<div style={styles.line}></div>


</div>








<div style={styles.content}>


<div style={styles.header}>


<h3>

{item.action}

</h3>


<span>

{formatDate(item.created_at)}

</span>


</div>





<p>

{item.description}

</p>





<div style={styles.user}>


👤

{" "}

{

item.first_name

?

`${item.first_name} ${item.last_name}`

:

"System"

}



</div>





</div>




</div>


))


}



</div>


);

}







function getIcon(action){


if(action==="Assigned")

return "👤";


if(action==="Returned")

return "↩️";


if(action.includes("Created"))

return "➕";


if(action.includes("Updated"))

return "✏️";


if(action.includes("Deleted"))

return "🗑️";


return "📌";


}







function formatDate(date){


if(!date)

return "";



return new Date(date)
.toLocaleString();

}









const styles={




timeline:{


display:"flex",

flexDirection:"column",

marginTop:"20px"

},





item:{


display:"flex",

gap:"20px",

position:"relative",

marginBottom:"25px"

},




left:{


display:"flex",

flexDirection:"column",

alignItems:"center"

},




icon:{


width:"45px",

height:"45px",

borderRadius:"50%",

background:"#2563eb",

color:"white",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"20px",

zIndex:2

},




line:{


width:"3px",

background:"#dbeafe",

flex:1,

marginTop:"5px"

},




content:{


background:"#f8fafc",

padding:"18px",

borderRadius:"15px",

flex:1

},




header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

gap:"20px"

},




contentTitle:{


margin:0

},




contentText:{


color:"#475569"

},





user:{


marginTop:"10px",

color:"#64748b",

fontSize:"14px"

},




empty:{


textAlign:"center",

padding:"40px",

background:"#f8fafc",

borderRadius:"15px"

},




emptyIcon:{


fontSize:"50px"

},




loading:{


padding:"30px",

textAlign:"center",

color:"#64748b"

}



};



export default AssetHistory;