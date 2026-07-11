// import { useEffect, useState } from "react";
// import API from "../../../api/axios";


// function AssignAssetModal({
//     assetId,
//     onClose,
//     onSuccess
// }){


// const [members,setMembers]=useState([]);

// const [search,setSearch]=useState("");

// const [selected,setSelected]=useState(null);

// const [loading,setLoading]=useState(false);





// useEffect(()=>{

// loadMembers();

// },[]);






// const loadMembers=async()=>{


// try{


// const res =
// await API.get("/members");


// setMembers(
// res.data.members || []
// );



// }
// catch(error){

// console.log(error);

// }


// };








// const assignAsset=async()=>{


// if(!selected){

// alert(
// "Please select employee"
// );

// return;

// }



// try{


// setLoading(true);



// await API.post(

// `/assets/${assetId}/assign`,

// {

// user_id:selected.id

// }

// );





// onSuccess();



// onClose();



// }
// catch(error){


// console.log(error);


// alert(

// error.response?.data?.message ||

// "Assignment failed"

// );


// }
// finally{


// setLoading(false);


// }



// };







// const filteredMembers =
// members.filter(member=>

// `${member.first_name} ${member.last_name}`

// .toLowerCase()

// .includes(

// search.toLowerCase()

// )

// );







// return(


// <div style={styles.overlay}>


// <div style={styles.modal}>


// <div style={styles.header}>


// <h2>

// Assign Asset

// </h2>


// <button

// onClick={onClose}

// style={styles.close}

// >

// ✕

// </button>


// </div>





// <input

// placeholder="🔍 Search employee..."

// value={search}

// onChange={(e)=>
// setSearch(e.target.value)
// }

// style={styles.search}

// />






// <div style={styles.list}>


// {

// filteredMembers.map(member=>(


// <div

// key={member.id}

// onClick={()=>setSelected(member)}

// style={{

// ...styles.employee,

// ...(selected?.id===member.id
// ?
// styles.selected
// :
// {})

// }}

// >



// {

// member.profile_image

// ?

// <img

// src={
// `http://localhost:5000/uploads/${member.profile_image}`
// }

// style={styles.photo}

// />


// :

// <div style={styles.avatar}>

// {
// member.first_name.charAt(0)
// }

// </div>


// }




// <div>


// <strong>

// {member.first_name}

// {" "}

// {member.last_name}

// </strong>


// <p>

// {member.department_name || "No Department"}

// </p>


// </div>



// </div>


// ))


// }


// </div>







// <div style={styles.footer}>


// <button

// onClick={onClose}

// style={styles.cancel}

// >

// Cancel

// </button>




// <button

// onClick={assignAsset}

// disabled={loading}

// style={styles.assign}

// >

// {

// loading

// ?

// "Assigning..."

// :

// "Assign Asset"

// }


// </button>


// </div>



// </div>



// </div>


// );

// }




// const styles={



// overlay:{

// position:"fixed",

// top:0,

// left:0,

// right:0,

// bottom:0,

// background:"rgba(15,23,42,.55)",

// display:"flex",

// justifyContent:"center",

// alignItems:"center",

// zIndex:1000

// },



// modal:{

// width:"500px",

// background:"white",

// borderRadius:"20px",

// padding:"25px",

// boxShadow:"0 20px 50px rgba(0,0,0,.25)"

// },



// header:{

// display:"flex",

// justifyContent:"space-between",

// alignItems:"center"

// },



// close:{

// border:"none",

// background:"transparent",

// fontSize:"25px",

// cursor:"pointer"

// },



// search:{

// width:"100%",

// padding:"13px",

// borderRadius:"12px",

// border:"1px solid #cbd5e1",

// margin:"20px 0"

// },



// list:{

// maxHeight:"300px",

// overflowY:"auto"

// },



// employee:{

// display:"flex",

// alignItems:"center",

// gap:"15px",

// padding:"12px",

// borderRadius:"12px",

// cursor:"pointer",

// marginBottom:"8px"

// },



// selected:{

// background:"#dbeafe"

// },



// photo:{

// width:"45px",

// height:"45px",

// borderRadius:"50%",

// objectFit:"cover"

// },



// avatar:{

// width:"45px",

// height:"45px",

// borderRadius:"50%",

// background:"#2563eb",

// color:"white",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontWeight:"bold"

// },



// footer:{

// display:"flex",

// justifyContent:"flex-end",

// gap:"15px",

// marginTop:"20px"

// },



// cancel:{

// padding:"12px 20px",

// border:"none",

// borderRadius:"10px",

// background:"#e2e8f0"

// },



// assign:{

// padding:"12px 25px",

// border:"none",

// borderRadius:"10px",

// background:"#2563eb",

// color:"white",

// fontWeight:"600"

// }


// };



// export default AssignAssetModal;
import {useEffect,useState} from "react";
import {
getEmployees,
assignAsset
}
from "../../../services/assetService";


function AssignAssetModal({
assetId,
close,
refresh
}){


const [employees,setEmployees]=useState([]);

const [employee,setEmployee]=useState("");

const [remarks,setRemarks]=useState("");

const [loading,setLoading]=useState(false);



useEffect(()=>{

loadEmployees();

},[]);




const loadEmployees=async()=>{

try{

const data =
await getEmployees();


setEmployees(
data.employees || []
);


}
catch(err){

console.log(err);

}

};





const submit=async()=>{


try{


setLoading(true);


await assignAsset(
assetId,
{

user_id:employee,

remarks

}

);



refresh();

close();


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};





return(

<div style={styles.overlay}>


<div style={styles.modal}>


<h2>

Assign Asset

</h2>



<label>
Select Employee
</label>


<select

value={employee}

onChange={
e=>setEmployee(e.target.value)
}

style={styles.input}

>


<option value="">

Choose employee

</option>


{

employees.map(emp=>(

<option
key={emp.id}
value={emp.id}
>

{emp.first_name}

{" "}

{emp.last_name}

-
{emp.employee_id}

</option>

))

}


</select>





<textarea

placeholder="Remarks"

value={remarks}

onChange={
e=>setRemarks(e.target.value)
}

style={styles.input}

/>





<div style={styles.buttons}>


<button

onClick={close}

style={styles.cancel}

>

Cancel

</button>




<button

onClick={submit}

disabled={loading}

style={styles.save}

>

{
loading
?
"Assigning..."
:
"Assign Asset"
}


</button>


</div>



</div>

</div>

);


}




const styles={


overlay:{

position:"fixed",

top:0,

left:0,

right:0,

bottom:0,

background:"rgba(0,0,0,.5)",

display:"flex",

alignItems:"center",

justifyContent:"center",

zIndex:1000

},


modal:{

background:"white",

width:"420px",

padding:"30px",

borderRadius:"20px",

boxShadow:"0 20px 50px rgba(0,0,0,.2)"

},



input:{

width:"100%",

padding:"12px",

marginTop:"10px",

marginBottom:"15px",

borderRadius:"10px",

border:"1px solid #ddd"

},



buttons:{

display:"flex",

justifyContent:"flex-end",

gap:"10px"

},



cancel:{

padding:"12px 20px",

border:"none",

borderRadius:"10px"

},


save:{

background:"#16a34a",

color:"white",

padding:"12px 20px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

}



};



export default AssignAssetModal;