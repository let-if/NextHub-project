
// import { useEffect, useState } from "react";

// import DashboardLayout from "../../layouts/DashboardLayout";

// import { getMembers } from "../../services/memberService";

// import API from "../../api/axios";

// import { Link } from "react-router-dom";


// function Members() {


// const [members,setMembers] = useState([]);

// const [loading,setLoading] = useState(true);


// const [filters,setFilters] = useState({

// search:"",
// department:"",
// role:""

// });





// useEffect(()=>{

// loadMembers();

// },[filters]);







// const loadMembers = async()=>{


// try{


// setLoading(true);


// const data = await getMembers(filters);


// setMembers(data.members || []);



// }
// catch(error){

// console.log(error);

// }
// finally{

// setLoading(false);

// }


// };








// const handleDelete = async(id)=>{


// const confirmDelete = window.confirm(

// "Are you sure you want to delete this employee?"

// );



// if(!confirmDelete)

// return;



// try{


// await API.delete(`/members/${id}`);


// loadMembers();


// }
// catch(error){

// console.log(error);

// }



// };









// return(


// <DashboardLayout>


// <div style={styles.page}>



// <div style={styles.header}>


// <div>


// <h1 style={styles.title}>

// Members Management

// </h1>


// <p style={styles.subtitle}>

// Manage employees, roles and departments

// </p>


// </div>





// <Link

// to="/members/add"

// style={styles.addButton}

// >

// ➕ Add Employee

// </Link>



// </div>







// <div style={styles.filterCard}>


// <input

// placeholder="🔍 Search employee..."

// value={filters.search}

// onChange={(e)=>

// setFilters({

// ...filters,

// search:e.target.value

// })

// }

// style={styles.input}

// />





// <select

// value={filters.department}

// onChange={(e)=>

// setFilters({

// ...filters,

// department:e.target.value

// })

// }

// style={styles.input}

// >


// <option value="">

// All Departments

// </option>


// <option>

// IT

// </option>


// <option>

// Human Resource

// </option>


// <option>

// Finance

// </option>


// <option>

// Administration

// </option>


// <option>

// Maintenance

// </option>


// </select>







// <select

// value={filters.role}

// onChange={(e)=>

// setFilters({

// ...filters,

// role:e.target.value

// })

// }

// style={styles.input}

// >


// <option value="">

// All Roles

// </option>


// <option>

// Administrator

// </option>


// <option>

// Manager

// </option>


// <option>

// Staff

// </option>


// <option>

// Viewer

// </option>



// </select>



// </div>








// {

// loading ?


// <div style={styles.loading}>

// Loading employees...

// </div>


// :

// <div style={styles.tableCard}>


// <table style={styles.table}>


// <thead>


// <tr>


// <th>

// Photo

// </th>


// <th>

// Employee ID

// </th>


// <th>

// Name

// </th>


// {/* <th>

// Email

// </th> */}


// <th>

// Department

// </th>


// <th>

// Role

// </th>


// <th>

// Status

// </th>


// <th>

// Actions

// </th>



// </tr>


// </thead>





// <tbody>


// {


// members.map(member=>{


// const image = member.profile_image

// ?

// `http://localhost:5000/${member.profile_image}`

// :

// null;



// return(


// <tr key={member.id}>


// <td>


// {

// image ?

// <img

// src={image}

// alt="profile"

// style={styles.photo}

// />


// :


// <div style={styles.avatar}>

// {

// member.first_name?.charAt(0)

// }

// </div>


// }


// </td>

// {/* <td>
// <div style={styles.profileCell}>
//   {image ? (
//     <img
//       src={image}
//       alt="profile"
//       style={styles.photo}
//     />
//   ) : (
//     <div style={styles.avatar}>
//       {member.first_name?.charAt(0)}
//       {member.last_name?.charAt(0)}
//     </div>
//   )}
// </div>
// </td> */}





// <td>

// <strong>

// {member.employee_id}

// </strong>

// </td>






// <td>


// <div style={styles.name}>


// {member.first_name}

// {" "}

// {member.last_name}



// </div>



// </td>
// {/* <td>

// <div style={styles.employeeInfo}>

// <div style={styles.employeeName}>
// {member.first_name} {member.last_name}
// </div>

// <div style={styles.employeeEmail}>
// {member.email}
// </div>

// </div>

// </td>






// <td>

// {member.email}

// </td> */}






// <td>

// {member.department_name || "N/A"}

// </td>





// <td>

// <span style={styles.role}>

// {member.role_name}

// </span>

// </td>






// <td>


// <span

// style={

// member.status==="Active"

// ?

// styles.active

// :

// styles.inactive

// }

// >

// {member.status}

// </span>

// {/* <span
// style={
// member.status==="Active"
// ? styles.activeBadge
// : styles.inactiveBadge
// }
// >
// ● {member.status}
// </span> */}
// </td>








// <td>


// <Link

// to={`/members/${member.id}`}

// style={styles.view}

// >

// 👁

// </Link>





// <Link

// to={`/members/edit/${member.id}`}

// style={styles.edit}

// >

// ✏

// </Link>






// <button

// style={styles.delete}

// onClick={()=>handleDelete(member.id)}

// >

// 🗑

// </button>




// </td>


// {/* <div style={styles.actions}>

// <Link
// to={`/members/${member.id}`}
// style={styles.viewBtn}
// >
// View
// </Link>

// <Link
// to={`/members/edit/${member.id}`}
// style={styles.editBtn}
// >
// Edit
// </Link>

// <button
// style={styles.deleteBtn}
// onClick={()=>handleDelete(member.id)}
// >
// Delete
// </button>

// </div> */}
// </tr>


// )


// })


// }



// </tbody>



// </table>



// </div>


// }





// </div>


// </DashboardLayout>


// );


// }









// // const styles={


// // page:{


// // width:"100%"

// // },





// // header:{


// // display:"flex",

// // justifyContent:"space-between",

// // alignItems:"center",

// // marginBottom:"30px",

// // flexWrap:"wrap"

// // },




// // title:{


// // margin:0,

// // fontSize:"32px",

// // color:"#0f172a"

// // },





// // subtitle:{


// // color:"#64748b"

// // },





// // addButton:{


// // background:"#2563eb",

// // color:"white",

// // padding:"14px 22px",

// // borderRadius:"12px",

// // textDecoration:"none",

// // fontWeight:"600"

// // },







// // filterCard:{


// // background:"white",

// // padding:"20px",

// // borderRadius:"16px",

// // boxShadow:"0 10px 25px rgba(0,0,0,.08)",

// // display:"flex",

// // gap:"15px",

// // marginBottom:"25px",

// // flexWrap:"wrap"

// // },





// // input:{


// // padding:"12px",

// // borderRadius:"10px",

// // border:"1px solid #ddd",

// // minWidth:"220px"

// // },






// // tableCard:{


// // background:"white",

// // padding:"25px",

// // borderRadius:"20px",

// // boxShadow:"0 15px 40px rgba(0,0,0,.08)",

// // overflowX:"auto"

// // },





// // table:{


// // width:"100%",

// // borderCollapse:"collapse"

// // },
// // // table:{
// // // width:"100%",
// // // borderCollapse:"separate",
// // // borderSpacing:"0 12px"
// // // },
// // // tr:{
// // // background:"#fff"
// // // },


// // // profileCell:{
// // // display:"flex",
// // // justifyContent:"center",
// // // alignItems:"center"
// // // },

// // // photo:{
// // // width:"72px",
// // // height:"72px",
// // // objectFit:"cover",
// // // borderRadius:"16px",
// // // border:"3px solid #2563eb",
// // // boxShadow:"0 8px 18px rgba(37,99,235,.25)"
// // // },

// // // avatar:{
// // // width:"72px",
// // // height:"72px",
// // // borderRadius:"16px",
// // // background:"linear-gradient(135deg,#2563eb,#1e40af)",
// // // color:"#fff",
// // // display:"flex",
// // // alignItems:"center",
// // // justifyContent:"center",
// // // fontSize:"24px",
// // // fontWeight:"700"
// // // },

// // // employeeInfo:{
// // // display:"flex",
// // // flexDirection:"column",
// // // gap:"6px"
// // // },

// // // employeeName:{
// // // fontSize:"17px",
// // // fontWeight:"700",
// // // color:"#111827"
// // // },

// // // employeeEmail:{
// // // fontSize:"13px",
// // // color:"#64748b"
// // // },

// // // role:{
// // // display:"inline-block",
// // // padding:"8px 16px",
// // // borderRadius:"30px",
// // // background:"#EEF4FF",
// // // color:"#2563eb",
// // // fontWeight:"700",
// // // whiteSpace:"nowrap"
// // // },

// // // activeBadge:{
// // // display:"inline-flex",
// // // alignItems:"center",
// // // padding:"8px 18px",
// // // borderRadius:"30px",
// // // background:"#DCFCE7",
// // // color:"#15803d",
// // // fontWeight:"700",
// // // whiteSpace:"nowrap"
// // // },

// // // inactiveBadge:{
// // // display:"inline-flex",
// // // alignItems:"center",
// // // padding:"8px 18px",
// // // borderRadius:"30px",
// // // background:"#FEE2E2",
// // // color:"#DC2626",
// // // fontWeight:"700",
// // // whiteSpace:"nowrap"
// // // },

// // // actions:{
// // // display:"flex",
// // // gap:"10px",
// // // justifyContent:"center"
// // // },

// // // viewBtn:{
// // // background:"#DBEAFE",
// // // color:"#1D4ED8",
// // // padding:"8px 14px",
// // // borderRadius:"10px",
// // // textDecoration:"none",
// // // fontWeight:"600"
// // // },

// // // editBtn:{
// // // background:"#FEF3C7",
// // // color:"#B45309",
// // // padding:"8px 14px",
// // // borderRadius:"10px",
// // // textDecoration:"none",
// // // fontWeight:"600"
// // // },

// // // deleteBtn:{
// // // background:"#FEE2E2",
// // // color:"#B91C1C",
// // // padding:"8px 14px",
// // // borderRadius:"10px",
// // // border:"none",
// // // cursor:"pointer",
// // // fontWeight:"600"
// // // },


// // photo:{


// // width:"45px",

// // height:"45px",

// // borderRadius:"50%",

// // objectFit:"cover",

// // border:"3px solid #2563eb"

// // },





// // avatar:{


// // width:"45px",

// // height:"45px",

// // borderRadius:"50%",

// // background:"#2563eb",

// // color:"white",

// // display:"flex",

// // alignItems:"center",

// // justifyContent:"center",

// // fontWeight:"bold"

// // },





// // name:{


// // fontWeight:"600"

// // },






// // role:{


// // background:"#dbeafe",

// // color:"#1d4ed8",

// // padding:"6px 12px",

// // borderRadius:"20px",

// // fontSize:"13px"

// // },






// // active:{


// // background:"#dcfce7",

// // color:"#15803d",

// // padding:"6px 12px",

// // borderRadius:"20px",

// // fontWeight:"600"

// // },




// // inactive:{


// // background:"#fee2e2",

// // color:"#b91c1c",

// // padding:"6px 12px",

// // borderRadius:"20px",

// // fontWeight:"600"

// // },





// // view:{


// // textDecoration:"none",

// // fontSize:"20px",

// // marginRight:"10px"

// // },




// // edit:{


// // textDecoration:"none",

// // fontSize:"20px",

// // marginRight:"10px"

// // },





// // delete:{


// // border:"none",

// // background:"transparent",

// // cursor:"pointer",

// // fontSize:"20px"

// // },




// // loading:{


// // background:"white",

// // padding:"40px",

// // borderRadius:"15px",

// // textAlign:"center"

// // }



// // };

// const styles={


// page:{
// width:"100%",
// padding:"10px"
// },




// /* HEADER */

// header:{
// display:"flex",
// justifyContent:"space-between",
// alignItems:"center",
// width:"100%",
// marginBottom:"35px"
// },



// title:{
// margin:0,
// fontSize:"32px",
// fontWeight:"800",
// color:"#0f172a"
// },



// subtitle:{
// marginTop:"8px",
// fontSize:"15px",
// color:"#64748b"
// },




// addButton:{
// display:"flex",
// alignItems:"center",
// justifyContent:"center",
// gap:"8px",
// background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
// color:"#fff",
// padding:"14px 26px",
// borderRadius:"14px",
// textDecoration:"none",
// fontWeight:"700",
// boxShadow:"0 10px 25px rgba(37,99,235,.25)",
// whiteSpace:"nowrap"
// },



// plus:{
// fontSize:"22px",
// fontWeight:"800"
// },







// /* FILTER */


// filterCard:{
// background:"#ffffff",
// padding:"22px",
// borderRadius:"20px",
// display:"flex",
// alignItems:"center",
// gap:"18px",
// marginBottom:"30px",
// boxShadow:"0 15px 35px rgba(15,23,42,.08)",
// flexWrap:"wrap"
// },



// searchBox:{
// display:"flex",
// alignItems:"center",
// gap:"10px",
// height:"45px",
// padding:"0 15px",
// border:"1px solid #e2e8f0",
// borderRadius:"12px"
// },



// input:{
// height:"45px",
// minWidth:"230px",
// border:"1px solid #e2e8f0",
// borderRadius:"12px",
// padding:"0 15px",
// outline:"none",
// fontSize:"14px"
// },







// /* TABLE */


// tableCard:{
// background:"#ffffff",
// padding:"25px",
// borderRadius:"22px",
// boxShadow:"0 20px 45px rgba(15,23,42,.08)",
// overflowX:"auto"
// },




// table:{
// width:"100%",
// borderCollapse:"collapse",
// tableLayout:"fixed"
// },




// th:{
// textAlign:"left",
// padding:"16px",
// fontSize:"12px",
// fontWeight:"800",
// color:"#64748b",
// textTransform:"uppercase",
// borderBottom:"2px solid #f1f5f9"
// },



// row:{
// height:"90px",
// borderBottom:"1px solid #f1f5f9"
// },





// /* IMAGE */


// photoCell:{
// width:"100px",
// padding:"15px"
// },



// photo:{
// width:"62px",
// height:"62px",
// borderRadius:"50%",
// objectFit:"cover",
// border:"4px solid #dbeafe",
// display:"block",
// boxShadow:"0 6px 18px rgba(37,99,235,.15)"
// },



// avatar:{
// width:"62px",
// height:"62px",
// borderRadius:"50%",
// background:"linear-gradient(135deg,#2563eb,#1e40af)",
// color:"#ffffff",
// display:"flex",
// alignItems:"center",
// justifyContent:"center",
// fontSize:"20px",
// fontWeight:"800"
// },







// /* EMPLOYEE ID */


// employeeId:{
// display:"inline-block",
// background:"#eff6ff",
// color:"#2563eb",
// padding:"7px 14px",
// borderRadius:"10px",
// fontSize:"13px",
// fontWeight:"800"
// },







// /* NAME */


// name:{
// fontSize:"16px",
// fontWeight:"700",
// color:"#111827",
// whiteSpace:"nowrap",
// overflow:"hidden",
// textOverflow:"ellipsis"
// },






// /* DEPARTMENT */


// department:{
// fontSize:"14px",
// color:"#475569",
// fontWeight:"600"
// },






// /* ROLE */


// role:{
// display:"inline-flex",
// justifyContent:"center",
// alignItems:"center",
// background:"#dbeafe",
// color:"#1d4ed8",
// padding:"8px 15px",
// borderRadius:"30px",
// fontSize:"13px",
// fontWeight:"700",
// whiteSpace:"nowrap"
// },







// /* STATUS */


// active:{
// display:"inline-flex",
// alignItems:"center",
// justifyContent:"center",
// background:"#dcfce7",
// color:"#15803d",
// padding:"8px 16px",
// borderRadius:"30px",
// fontSize:"13px",
// fontWeight:"700",
// whiteSpace:"nowrap"
// },



// inactive:{
// display:"inline-flex",
// alignItems:"center",
// justifyContent:"center",
// background:"#fee2e2",
// color:"#dc2626",
// padding:"8px 16px",
// borderRadius:"30px",
// fontSize:"13px",
// fontWeight:"700",
// whiteSpace:"nowrap"
// },







// /* ACTION BUTTONS */


// actions:{
// display:"flex",
// alignItems:"center",
// gap:"10px"
// },



// view:{
// background:"#dbeafe",
// color:"#2563eb",
// padding:"9px 15px",
// borderRadius:"10px",
// fontSize:"13px",
// fontWeight:"700",
// textDecoration:"none"
// },



// edit:{
// background:"#fef3c7",
// color:"#b45309",
// padding:"9px 15px",
// borderRadius:"10px",
// fontSize:"13px",
// fontWeight:"700",
// textDecoration:"none"
// },



// delete:{
// background:"#fee2e2",
// color:"#dc2626",
// border:"none",
// padding:"9px 15px",
// borderRadius:"10px",
// fontSize:"13px",
// fontWeight:"700",
// cursor:"pointer"
// },







// loading:{
// background:"#ffffff",
// padding:"60px",
// borderRadius:"20px",
// textAlign:"center",
// fontSize:"18px",
// color:"#64748b"
// },



// spinner:{
// width:"38px",
// height:"38px",
// border:"4px solid #e2e8f0",
// borderTop:"4px solid #2563eb",
// borderRadius:"50%",
// margin:"0 auto 15px"
// }



// };







// export default Members;

import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getMembers } from "../../services/memberService";

import API from "../../api/axios";

import { Link } from "react-router-dom";


function Members() {


const [members,setMembers] = useState([]);

const [loading,setLoading] = useState(true);



const [filters,setFilters] = useState({

search:"",
department:"",
role:""

});





useEffect(()=>{

loadMembers();

},[filters]);





const loadMembers = async()=>{


try{


setLoading(true);


const data = await getMembers(filters);


setMembers(data.members || []);



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};







const handleDelete = async(id)=>{


const confirmDelete = window.confirm(

"Are you sure you want to delete this employee?"

);



if(!confirmDelete)

return;



try{


await API.delete(`/members/${id}`);


loadMembers();


}
catch(error){

console.log(error);

}



};









return(


<DashboardLayout>


<div style={styles.page}>


{/* PAGE HEADER */}

<div style={styles.header}>


<div>

<h1 style={styles.title}>
Members Management
</h1>


<p style={styles.subtitle}>
Manage employees, roles, departments and account status
</p>


</div>





<Link

to="/members/add"

style={styles.addButton}

>

<span style={styles.addIcon}>
+
</span>

Add Employee

</Link>



</div>





{/* FILTER AREA */}

<div style={styles.filterCard}>


<div style={styles.searchWrapper}>


<span style={styles.searchIcon}>
🔍
</span>


<input

placeholder="Search employee..."

value={filters.search}

onChange={(e)=>

setFilters({

...filters,

search:e.target.value

})

}

style={styles.input}

/>


</div>
<select

value={filters.department}

onChange={(e)=>

setFilters({

...filters,

department:e.target.value

})

}

style={styles.input}

>


<option value="">

All Departments

</option>


<option>

IT

</option>


<option>

Human Resource

</option>


<option>

Finance

</option>


<option>

Administration

</option>


<option>

Maintenance

</option>


</select>





<select

value={filters.role}

onChange={(e)=>

setFilters({

...filters,

role:e.target.value

})

}

style={styles.input}

>


<option value="">

All Roles

</option>


<option>

Administrator

</option>


<option>

Manager

</option>


<option>

Staff

</option>


<option>

Viewer

</option>



</select>



</div>






{

loading ?


<div style={styles.loading}>


<div style={styles.spinner}></div>


Loading employees...


</div>



:


<div style={styles.tableCard}>


<table style={styles.table}>


<thead>


<tr>


<th style={styles.th}>
Photo
</th>



<th style={styles.th}>
Employee ID
</th>




<th style={styles.th}>
Employee
</th>




<th style={styles.th}>
Department
</th>




<th style={styles.th}>
Role
</th>




<th style={styles.th}>
Status
</th>




<th style={styles.th}>
Actions
</th>




</tr>


</thead>



<tbody>
  {

members.map(member=>{


const image = member.profile_image

?

`http://localhost:5000/${member.profile_image}`

:

null;



return(


<tr key={member.id} style={styles.row}>


<td style={styles.photoCell}>


{

image ?


<img

src={image}

alt="profile"

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



</td>






<td>


<span style={styles.employeeId}>

{member.employee_id}

</span>


</td>







<td>


<div style={styles.employeeInfo}>


<div style={styles.name}>


{member.first_name}

{" "}

{member.last_name}


</div>



<div style={styles.email}>


{member.email || "No email"}


</div>



</div>


</td>







<td>


<span style={styles.department}>


{member.department_name || "N/A"}


</span>


</td>








<td>


<span style={styles.role}>


{member.role_name}


</span>


</td>







<td>


<span


style={

member.status==="Active"

?

styles.active

:

styles.inactive

}


>


<span style={styles.statusDot}></span>


{member.status}


</span>


</td>








<td>


<div style={styles.actions}>


<Link

to={`/members/${member.id}`}

style={styles.view}

title="View employee"

>

👁 View

</Link>





<Link

to={`/members/edit/${member.id}`}

style={styles.edit}

title="Edit employee"

>

✏ Edit

</Link>






<button

style={styles.delete}

onClick={()=>handleDelete(member.id)}

title="Delete employee"

>

🗑 Delete

</button>





</div>


</td>





</tr>


)


})


}


</tbody>


</table>



</div>


}



</div>


</DashboardLayout>


);


}

const styles={



page:{

width:"100%",

padding:"15px",

boxSizing:"border-box"

},






/* HEADER */

header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"35px",

gap:"20px",

flexWrap:"wrap"

},





title:{

margin:0,

fontSize:"32px",

fontWeight:"800",

color:"#0f172a",

letterSpacing:"-0.5px"

},




subtitle:{

marginTop:"8px",

fontSize:"15px",

color:"#64748b"

},






addButton:{

display:"flex",

alignItems:"center",

gap:"10px",

background:"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#ffffff",

padding:"14px 24px",

borderRadius:"14px",

textDecoration:"none",

fontWeight:"700",

fontSize:"15px",

boxShadow:"0 12px 25px rgba(37,99,235,.25)",

transition:"0.3s",

whiteSpace:"nowrap"

},




addIcon:{

fontSize:"24px",

fontWeight:"800"

},






/* FILTER */

filterCard:{

background:"#ffffff",

padding:"22px",

borderRadius:"20px",

display:"flex",

alignItems:"center",

gap:"18px",

marginBottom:"30px",

boxShadow:"0 10px 30px rgba(15,23,42,.08)",

flexWrap:"wrap"

},






searchWrapper:{

display:"flex",

alignItems:"center",

gap:"10px",

height:"45px",

padding:"0 15px",

border:"1px solid #e2e8f0",

borderRadius:"12px",

background:"#ffffff"

},






searchIcon:{

fontSize:"16px"

},






input:{

height:"45px",

minWidth:"220px",

border:"1px solid #e2e8f0",

borderRadius:"12px",

padding:"0 15px",

fontSize:"14px",

outline:"none",

color:"#334155"

},







/* TABLE CONTAINER */


tableCard:{

background:"#ffffff",

padding:"25px",

borderRadius:"22px",

boxShadow:"0 15px 40px rgba(15,23,42,.08)",

overflowX:"auto"

},





table:{

width:"100%",

borderCollapse:"collapse",

tableLayout:"auto"

},






th:{

padding:"16px",

textAlign:"left",

fontSize:"12px",

fontWeight:"800",

textTransform:"uppercase",

color:"#64748b",

borderBottom:"2px solid #f1f5f9",

letterSpacing:"0.5px"

},





row:{

height:"85px",

borderBottom:"1px solid #f1f5f9"

},







/* IMAGE */


photoCell:{

padding:"12px 16px"

},





photo:{

width:"58px",

height:"58px",

borderRadius:"50%",

objectFit:"cover",

border:"4px solid #dbeafe",

boxShadow:"0 5px 15px rgba(37,99,235,.15)"

},





avatar:{

width:"58px",

height:"58px",

borderRadius:"50%",

background:"linear-gradient(135deg,#2563eb,#1e40af)",

color:"#ffffff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"20px",

fontWeight:"800",

textTransform:"uppercase"

},







/* EMPLOYEE INFO */


employeeInfo:{

display:"flex",

flexDirection:"column",

gap:"5px"

},




name:{

fontSize:"16px",

fontWeight:"700",

color:"#111827"

},




email:{

fontSize:"13px",

color:"#64748b"

},








/* EMPLOYEE ID */


employeeId:{

display:"inline-flex",

padding:"7px 13px",

background:"#eff6ff",

color:"#2563eb",

borderRadius:"10px",

fontSize:"13px",

fontWeight:"800"

},









/* DEPARTMENT */


department:{

fontSize:"14px",

fontWeight:"600",

color:"#475569"

},









/* ROLE BADGE */


role:{

display:"inline-flex",

alignItems:"center",

justifyContent:"center",

padding:"8px 15px",

background:"#dbeafe",

color:"#1d4ed8",

borderRadius:"30px",

fontSize:"13px",

fontWeight:"700",

whiteSpace:"nowrap"

},







/* STATUS */


active:{

display:"inline-flex",

alignItems:"center",

gap:"7px",

padding:"8px 15px",

background:"#dcfce7",

color:"#15803d",

borderRadius:"30px",

fontSize:"13px",

fontWeight:"700"

},





inactive:{

display:"inline-flex",

alignItems:"center",

gap:"7px",

padding:"8px 15px",

background:"#fee2e2",

color:"#dc2626",

borderRadius:"30px",

fontSize:"13px",

fontWeight:"700"

},






statusDot:{

width:"8px",

height:"8px",

borderRadius:"50%",

background:"currentColor"

},








/* ACTIONS */


actions:{

display:"flex",

alignItems:"center",

gap:"10px",

whiteSpace:"nowrap"

},






view:{

background:"#dbeafe",

color:"#2563eb",

padding:"9px 14px",

borderRadius:"10px",

textDecoration:"none",

fontSize:"13px",

fontWeight:"700"

},






edit:{

background:"#fef3c7",

color:"#b45309",

padding:"9px 14px",

borderRadius:"10px",

textDecoration:"none",

fontSize:"13px",

fontWeight:"700"

},






delete:{

background:"#fee2e2",

color:"#dc2626",

border:"none",

padding:"9px 14px",

borderRadius:"10px",

fontSize:"13px",

fontWeight:"700",

cursor:"pointer"

},








/* LOADING */


loading:{

background:"#ffffff",

padding:"60px",

borderRadius:"20px",

textAlign:"center",

fontSize:"18px",

color:"#64748b",

boxShadow:"0 10px 25px rgba(15,23,42,.06)"

},






spinner:{

width:"40px",

height:"40px",

border:"4px solid #e2e8f0",

borderTop:"4px solid #2563eb",

borderRadius:"50%",

margin:"0 auto 20px"

}



};
export default Members;