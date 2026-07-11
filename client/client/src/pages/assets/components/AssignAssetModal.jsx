
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