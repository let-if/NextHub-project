
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

<div style={styles.loadingIcon}>
⏳
</div>

<h3>
Loading Activity History...
</h3>

<p>
Fetching asset lifecycle information
</p>

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

className="asset-history-item"

>





<div style={styles.left}>


<div

style={{

...styles.icon,

background:
getActionColor(item.action)

}}

>


{

getIcon(item.action)

}


</div>




<div style={styles.line}></div>



</div>









<div

style={styles.content}

className="timeline-card"

>





<div style={styles.header}>


<h3 style={styles.title}>

{item.action}

</h3>




<span style={styles.date}>

{formatDate(item.created_at)}

</span>



</div>








<p style={styles.description}>

{

item.description ||

"No description available"

}

</p>









<div style={styles.user}>


<span>

👤

</span>


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









function getActionColor(action){



if(action==="Assigned")

return "linear-gradient(135deg,#2563eb,#1d4ed8)";



if(action==="Returned")

return "linear-gradient(135deg,#f59e0b,#d97706)";



if(action.includes("Created"))

return "linear-gradient(135deg,#16a34a,#15803d)";



if(action.includes("Updated"))

return "linear-gradient(135deg,#7c3aed,#6d28d9)";



if(action.includes("Deleted"))

return "linear-gradient(135deg,#dc2626,#991b1b)";



return "linear-gradient(135deg,#64748b,#334155)";


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

marginTop:"25px",

padding:"10px",

maxHeight:"600px",

overflowY:"auto",

paddingRight:"15px"

},







item:{


display:"flex",

gap:"22px",

position:"relative",

marginBottom:"30px",

transition:"all .3s ease"

},








left:{


display:"flex",

flexDirection:"column",

alignItems:"center",

minWidth:"55px"

},







icon:{


width:"58px",

height:"58px",

borderRadius:"50%",


display:"flex",

alignItems:"center",

justifyContent:"center",


fontSize:"26px",

color:"#ffffff",

zIndex:2,


boxShadow:

"0 15px 35px rgba(37,99,235,.25)",


transition:"all .3s ease"

},









line:{


width:"3px",

flex:1,

marginTop:"10px",

background:

"linear-gradient(#bfdbfe,#e0f2fe)"

},







content:{


flex:1,


background:

"linear-gradient(145deg,#ffffff,#f8fafc)",


padding:"24px",


borderRadius:"24px",


border:

"1px solid #e2e8f0",



boxShadow:

"0 15px 40px rgba(15,23,42,.08)",


transition:

"all .3s ease"

},









header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

gap:"20px",

flexWrap:"wrap"

},







title:{


margin:0,

fontSize:"20px",

fontWeight:"850",

color:"#0f172a"

},








date:{


background:"#eff6ff",

color:"#2563eb",

padding:"7px 14px",

borderRadius:"999px",

fontSize:"12px",

fontWeight:"700"

},








description:{


marginTop:"15px",

color:"#475569",

lineHeight:"1.7",

fontSize:"15px"

},









user:{


display:"inline-flex",

alignItems:"center",

gap:"8px",


marginTop:"18px",


padding:"9px 16px",


borderRadius:"999px",


background:"#f1f5f9",


color:"#334155",


fontSize:"13px",


fontWeight:"700"

},







empty:{


padding:"65px 30px",

textAlign:"center",

background:

"linear-gradient(145deg,#ffffff,#f8fafc)",


borderRadius:"28px",

border:

"1px solid #e2e8f0",


boxShadow:

"0 15px 40px rgba(15,23,42,.08)"

},









emptyIcon:{


fontSize:"75px",

marginBottom:"20px"

},







loading:{


padding:"60px",

textAlign:"center",

background:"#ffffff",

borderRadius:"25px",

boxShadow:

"0 15px 40px rgba(15,23,42,.08)"

},






loadingIcon:{


fontSize:"55px",

marginBottom:"15px"

}



};






export default AssetHistory;