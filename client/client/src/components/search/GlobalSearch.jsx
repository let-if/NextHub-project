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


const navigate=useNavigate();






useEffect(()=>{


if(query.length<2){

setResults({

members:[],
requests:[],
resources:[]

});

return;

}



const timer=setTimeout(async()=>{


try{


const res=await API.get(
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


<input

value={query}

onChange={(e)=>setQuery(e.target.value)}

placeholder="Search members, requests, resources..."

style={styles.input}

/>





{

show &&

<div style={styles.dropdown}>


{

results.members.length>0 &&

<>

<h4>👥 Members</h4>

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

{item.first_name}
{" "}
{item.last_name}

<br/>

<small>
{item.email}
</small>


</div>

))

}

</>

}







{

results.requests.length>0 &&

<>

<h4>📋 Requests</h4>


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

{item.request_number}

-
{item.title}


</div>

))

}


</>

}







{

results.resources.length>0 &&

<>

<h4>💻 Resources</h4>


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


{item.asset_name}

<br/>

<small>

{item.asset_code}

</small>


</div>

))

}


</>

}





</div>


}



</div>

);



}



const styles={


wrapper:{

position:"relative",

width:"420px"

},


input:{

width:"100%",

height:"42px",

borderRadius:"12px",

border:"1px solid #e2e8f0",

padding:"0 18px",

fontSize:"14px",

outline:"none"

},



dropdown:{

position:"absolute",

top:"50px",

left:0,

width:"100%",

background:"white",

borderRadius:"15px",

boxShadow:"0 15px 40px rgba(0,0,0,.15)",

padding:"15px",

zIndex:999

},


item:{

padding:"12px",

cursor:"pointer",

borderBottom:"1px solid #f1f5f9"

}



};


export default GlobalSearch;