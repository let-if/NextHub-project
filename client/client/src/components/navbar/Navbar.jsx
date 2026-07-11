// import useAuth from "../../hooks/useAuth";

// function Navbar() {
//   const { user } = useAuth();

//   return (
//     <header style={styles.navbar}>
//       <div>
//         <h2 style={{ margin: 0 }}>
//           Welcome Back,
//         </h2>

//         <p style={styles.subtitle}>
//           {user?.first_name} {user?.last_name}
//         </p>
//       </div>

//       <div style={styles.right}>
//         🔔

//         <div style={styles.avatar}>
//           {user?.first_name?.charAt(0)}
//         </div>
//       </div>
//     </header>
//   );
// }

// const styles = {
//   navbar: {
//     height: 80,
//     background: "white",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0 30px",
//     boxShadow: "0 2px 10px rgba(0,0,0,.08)",
//   },

//   subtitle: {
//     margin: 0,
//     color: "#64748b",
//   },

//   right: {
//     display: "flex",
//     alignItems: "center",
//     gap: 20,
//     fontSize: 22,
//   },

//   avatar: {
//     width: 45,
//     height: 45,
//     borderRadius: "50%",
//     background: "#2563eb",
//     color: "white",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontWeight: "bold",
//   },
// };

// export default Navbar;
import useAuth from "../../hooks/useAuth";
import GlobalSearch from "../search/GlobalSearch";


function Navbar(){

const {user}=useAuth();



return(

<header style={styles.navbar}>


<div>

<h2 style={{margin:0}}>
Welcome Back,
</h2>


<p style={styles.subtitle}>
{user?.first_name} {user?.last_name}
</p>


</div>



<GlobalSearch />



<div style={styles.right}>

🔔


<div style={styles.avatar}>

{user?.first_name?.charAt(0)}

</div>


</div>



</header>

);

}


const styles={

navbar:{
height:80,
background:"white",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 30px",
boxShadow:"0 2px 10px rgba(0,0,0,.08)"
},


subtitle:{
margin:0,
color:"#64748b"
},


right:{
display:"flex",
alignItems:"center",
gap:20
},


avatar:{
width:45,
height:45,
borderRadius:"50%",
background:"#2563eb",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold"
}


};


export default Navbar;