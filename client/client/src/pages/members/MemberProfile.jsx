
import {useEffect,useState} from "react";

import {useParams,useNavigate} from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";



function MemberProfile(){


const {id}=useParams();

const navigate=useNavigate();



const [member,setMember]=useState(null);

const [loading,setLoading]=useState(true);







useEffect(()=>{


loadMember();


},[]);








const loadMember=async()=>{


try{


const res=await API.get(

`/members/${id}`

);


setMember(res.data.member);



}
catch(error){


console.log(error);


}
finally{


setLoading(false);


}


};









const deleteEmployee=async()=>{


const confirmDelete=window.confirm(

"Are you sure you want to delete this employee?"

);



if(!confirmDelete)

return;



try{


await API.delete(

`/members/${id}`

);



alert(

"Employee deleted successfully"

);



navigate("/members");



}
catch(error){


console.log(error);


}


};










if(loading){


return(

<DashboardLayout>

<div style={styles.loading}>

Loading employee profile...

</div>


</DashboardLayout>

);


}








if(!member){


return(

<DashboardLayout>


<div style={styles.error}>

Employee not found

</div>


</DashboardLayout>


);


}








const imageURL = member.profile_image

?

`http://localhost:5000/${member.profile_image}`

:

null;









return(


<DashboardLayout>


<div style={styles.container}>


<button

style={styles.back}

onClick={()=>navigate("/members")}

>

← Back To Members

</button>








<div style={styles.profileCard}>





<div style={styles.cover}></div>







<div style={styles.profileHeader}>


{

imageURL ?


<img

src={imageURL}

alt="employee"

style={styles.photo}

/>


:


<div style={styles.avatar}>


{

member.first_name?.charAt(0)

}

{

member.last_name?.charAt(0)

}


</div>



}







<div style={styles.identity}>


<h1>


{member.first_name}

{" "}

{member.last_name}


</h1>





<p style={styles.employeeId}>

Employee ID:

<strong>

{" "}

{member.employee_id}

</strong>

</p>






<div style={styles.badges}>


<span style={styles.role}>

👔 {member.role_name || "No Role"}

</span>





<span style={styles.department}>

🏢 {member.department_name || "No Department"}

</span>






<span

style={

member.status==="Active"

?

styles.active

:

styles.inactive

}

>

● {member.status}

</span>





</div>



</div>



</div>









<div style={styles.line}></div>







<h2>

Employee Information

</h2>







<div style={styles.grid}>



<Info

icon="📧"

title="Email"

value={member.email}

/>





<Info

icon="📱"

title="Phone"

value={member.phone || "Not Provided"}

/>





<Info

icon="🏢"

title="Department"

value={member.department_name || "N/A"}

/>





<Info

icon="👔"

title="Role"

value={member.role_name || "N/A"}

/>





<Info

icon="📅"

title="Joined Date"

value={

member.created_at

?

new Date(member.created_at)

.toLocaleDateString()

:

"N/A"

}

/>





<Info

icon="🆔"

title="Employee Number"

value={member.employee_id}

/>





</div>









<div style={styles.actions}>


<button

style={styles.edit}

onClick={()=>navigate(

`/members/edit/${member.id}`

)}

>

✏ Edit Employee

</button>







<button

style={styles.delete}

onClick={deleteEmployee}

>

🗑 Delete Employee

</button>



</div>






</div>


</div>


</DashboardLayout>


);



}









function Info({icon,title,value}){


return(


<div style={styles.info}>


<div style={styles.icon}>

{icon}

</div>



<div>


<h4>

{title}

</h4>


<p>

{value}

</p>



</div>


</div>


);


}









const styles={



container:{


maxWidth:"1100px",

margin:"auto"

},





loading:{


padding:"50px",

textAlign:"center",

fontSize:"22px"

},





error:{


background:"#fee2e2",

color:"#991b1b",

padding:"30px",

borderRadius:"15px"

},






back:{


marginBottom:"25px",

background:"#475569",

color:"white",

border:"none",

padding:"12px 20px",

borderRadius:"10px",

cursor:"pointer"

},






profileCard:{


background:"white",

borderRadius:"25px",

overflow:"hidden",

boxShadow:"0 20px 50px rgba(0,0,0,.12)"

},





cover:{


height:"150px",

background:

"linear-gradient(135deg,#2563eb,#1e40af)"


},





profileHeader:{


display:"flex",

gap:"35px",

alignItems:"center",

padding:"30px",

marginTop:"-70px",

flexWrap:"wrap"

},






photo:{


width:"150px",

height:"150px",

borderRadius:"50%",

objectFit:"cover",

border:"6px solid white"

},





avatar:{


width:"150px",

height:"150px",

borderRadius:"50%",

background:"#0f172a",

color:"white",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"45px",

fontWeight:"700",

border:"6px solid white"

},






identity:{


flex:1

},





employeeId:{


color:"#64748b"

},






badges:{


display:"flex",

gap:"10px",

flexWrap:"wrap",

marginTop:"15px"

},





role:{


background:"#dbeafe",

color:"#1d4ed8",

padding:"8px 15px",

borderRadius:"20px"

},






department:{


background:"#ede9fe",

color:"#6d28d9",

padding:"8px 15px",

borderRadius:"20px"

},






active:{


background:"#dcfce7",

color:"#15803d",

padding:"8px 15px",

borderRadius:"20px"

},






inactive:{


background:"#fee2e2",

color:"#b91c1c",

padding:"8px 15px",

borderRadius:"20px"

},





line:{


height:"1px",

background:"#e5e7eb",

margin:"0 30px 30px"

},






grid:{


padding:"30px",

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(260px,1fr))",

gap:"20px"

},





info:{


background:"#f8fafc",

padding:"20px",

borderRadius:"15px",

display:"flex",

gap:"15px"

},





icon:{


fontSize:"25px"

},






actions:{


padding:"30px",

display:"flex",

gap:"15px"

},






edit:{


background:"#2563eb",

color:"white",

border:"none",

padding:"14px 25px",

borderRadius:"12px",

cursor:"pointer",

fontWeight:"600"

},






delete:{


background:"#dc2626",

color:"white",

border:"none",

padding:"14px 25px",

borderRadius:"12px",

cursor:"pointer",

fontWeight:"600"

}



};





export default MemberProfile;