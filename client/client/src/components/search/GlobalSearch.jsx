
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

import API from "../../api/axios";



function GlobalSearch(){



const [query,setQuery]=useState("");



const [results,setResults]=useState({

members:[],
requests:[],
resources:[]

});



const [show,setShow]=useState(false);



const navigate = useNavigate();







useEffect(()=>{


if(query.length < 2){


setResults({

members:[],
requests:[],
resources:[]

});


setShow(false);


return;


}






const timer=setTimeout(async()=>{


try{


const res = await API.get(

`/search?q=${query}`

);



setResults(res.data);


setShow(true);



}


catch(error){


console.log(error);


}



},400);






return ()=>clearTimeout(timer);



},[query]);









const openResult=(type,id)=>{



if(type==="member"){


navigate(`/members/${id}`);


}




if(type==="request"){


navigate(`/requests/${id}`);


}




if(type==="resource"){


navigate(`/assets/${id}`);


}




setShow(false);

setQuery("");



};









return(


<div style={styles.wrapper}>



<div style={styles.searchContainer}>


<div style={styles.searchIcon}>

🔍

</div>





<input


value={query}


onChange={(e)=>

setQuery(e.target.value)

}


placeholder="Search members, requests, resources..."


style={styles.input}



/>



{

query &&

<button

style={styles.clearButton}

onClick={()=>setQuery("")}

>

×


</button>


}



</div>









{

show &&


<div style={styles.dropdown}>


{


results.members.length > 0 &&


<div>


<div style={styles.sectionTitle}>

👥 Members

</div>



{

results.members.map(item=>(


<div

key={item.id}

style={styles.item}

onClick={()=>openResult(

"member",

item.id

)}

>


<div style={styles.itemTitle}>


{item.first_name}

{" "}

{item.last_name}


</div>



<div style={styles.itemSub}>


{item.email}


</div>



</div>



))


}



</div>



}






{

results.requests.length > 0 &&


<div>


<div style={styles.sectionTitle}>

📋 Requests

</div>





{

results.requests.map(item=>(


<div


key={item.id}


style={styles.item}


onClick={()=>openResult(

"request",

item.id

)}



>


<div style={styles.itemTitle}>


{item.request_number}


</div>



<div style={styles.itemSub}>


{item.title}


</div>



</div>



))


}





</div>


}







{

results.resources.length > 0 &&


<div>


<div style={styles.sectionTitle}>

💻 Resources

</div>




{


results.resources.map(item=>(


<div


key={item.id}


style={styles.item}


onClick={()=>openResult(

"resource",

item.id

)}


>



<div style={styles.itemTitle}>


{item.asset_name}


</div>




<div style={styles.itemSub}>


{item.asset_code}


</div>



</div>



))


}



</div>


}




</div>



}




</div>



);


}
const styles = {


wrapper:{


position:"relative",

width:"100%",

maxWidth:"460px"


},







/* ================= SEARCH CONTAINER ================= */


searchContainer:{


position:"relative",

display:"flex",

alignItems:"center",

background:"#ffffff",

borderRadius:"16px",

border:"1px solid #e2e8f0",

height:"48px",

boxShadow:

"0 8px 25px rgba(15,23,42,.06)",

transition:"all .25s ease"


},







searchIcon:{


position:"absolute",

left:"16px",

width:"34px",

height:"34px",

borderRadius:"12px",

display:"flex",

alignItems:"center",

justifyContent:"center",

background:"#eff6ff",

fontSize:"16px"


},







input:{


width:"100%",

height:"100%",

border:"none",

outline:"none",

padding:

"0 45px 0 60px",

fontSize:"14px",

fontWeight:"500",

color:"#0f172a",

background:"transparent"


},







clearButton:{


position:"absolute",

right:"12px",

width:"28px",

height:"28px",

borderRadius:"50%",

border:"none",

background:"#f1f5f9",

color:"#64748b",

fontSize:"20px",

lineHeight:"20px",

cursor:"pointer",

display:"flex",

alignItems:"center",

justifyContent:"center"


},









/* ================= DROPDOWN ================= */


dropdown:{


position:"absolute",

top:"60px",

left:0,

width:"100%",

background:"rgba(255,255,255,.96)",

backdropFilter:"blur(18px)",

borderRadius:"22px",

padding:"15px",

boxShadow:

"0 25px 60px rgba(15,23,42,.18)",

border:

"1px solid #e2e8f0",

zIndex:9999,

maxHeight:"420px",

overflowY:"auto"


},







sectionTitle:{


fontSize:"13px",

fontWeight:"800",

color:"#475569",

padding:

"12px 10px",

display:"flex",

alignItems:"center",

gap:"8px",

textTransform:"uppercase",

letterSpacing:"0.5px"


},







item:{


padding:"14px",

borderRadius:"14px",

cursor:"pointer",

marginBottom:"6px",

transition:"all .2s ease",

border:

"1px solid transparent"


},







itemTitle:{


fontSize:"14px",

fontWeight:"750",

color:"#0f172a",

marginBottom:"5px"


},







itemSub:{


fontSize:"13px",

color:"#64748b",

lineHeight:"1.5"


}






};
export default GlobalSearch;