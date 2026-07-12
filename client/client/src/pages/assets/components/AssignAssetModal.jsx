
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


/* ================= OVERLAY ================= */


overlay:{


position:"fixed",

inset:0,


background:
"rgba(15,23,42,.65)",


backdropFilter:
"blur(10px)",


display:"flex",

alignItems:"center",

justifyContent:"center",


zIndex:2000,


padding:"20px",


animation:
"modalFade .35s ease"


},







/* ================= MODAL ================= */


modal:{


width:"480px",

maxWidth:"100%",


background:
"rgba(255,255,255,.9)",


backdropFilter:
"blur(30px)",


borderRadius:"35px",


padding:"40px",


border:
"1px solid rgba(255,255,255,.8)",


boxShadow:
"0 40px 120px rgba(0,0,0,.35)",


animation:
"modalShow .35s ease"


},








/* ================= INPUT ================= */


input:{


width:"100%",


padding:"17px 20px",


marginTop:"12px",


marginBottom:"22px",


borderRadius:"20px",


border:
"1px solid #cbd5e1",


background:"#ffffff",


fontSize:"15px",


fontWeight:"600",


outline:"none",


transition:".3s"


},







/* ================= BUTTON AREA ================= */


buttons:{


display:"flex",


justifyContent:"flex-end",


gap:"15px",


marginTop:"25px"


},







cancel:{


padding:"15px 28px",


borderRadius:"18px",


border:"none",


background:"#e2e8f0",


color:"#334155",


fontWeight:"900",


cursor:"pointer",


transition:".3s"


},







save:{


background:
"linear-gradient(135deg,#16a34a,#22c55e)",


color:"#ffffff",


padding:"15px 32px",


border:"none",


borderRadius:"18px",


fontWeight:"950",


cursor:"pointer",


boxShadow:
"0 20px 45px rgba(22,163,74,.35)",


transition:".35s"


}



};


export default AssignAssetModal;