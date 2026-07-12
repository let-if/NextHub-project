
// import useAuth from "../../hooks/useAuth";
// import GlobalSearch from "../search/GlobalSearch";


// function Navbar(){

// const {user}=useAuth();



// return(

// <header style={styles.navbar}>


// <div>

// <h2 style={{margin:0}}>
// Welcome Back,
// </h2>


// <p style={styles.subtitle}>
// {user?.first_name} {user?.last_name}
// </p>


// </div>



// <GlobalSearch />



// <div style={styles.right}>

// 🔔


// <div style={styles.avatar}>

// {user?.first_name?.charAt(0)}

// </div>


// </div>



// </header>

// );

// }


// const styles={

// navbar:{
// height:80,
// background:"white",
// display:"flex",
// alignItems:"center",
// justifyContent:"space-between",
// padding:"0 30px",
// boxShadow:"0 2px 10px rgba(0,0,0,.08)"
// },


// subtitle:{
// margin:0,
// color:"#64748b"
// },


// right:{
// display:"flex",
// alignItems:"center",
// gap:20
// },


// avatar:{
// width:45,
// height:45,
// borderRadius:"50%",
// background:"#2563eb",
// color:"white",
// display:"flex",
// alignItems:"center",
// justifyContent:"center",
// fontWeight:"bold"
// }


// };


// export default Navbar;
import useAuth from "../../hooks/useAuth";
import GlobalSearch from "../search/GlobalSearch";


function Navbar(){

const {user}=useAuth();


return(

<header style={styles.navbar}>


{/* LEFT */}

<div style={styles.welcome}>


<div style={styles.greeting}>

<span>
👋
</span>

<div>

<h2 style={styles.title}>
Welcome Back
</h2>


<p style={styles.subtitle}>
{user?.first_name} {user?.last_name}
</p>


</div>


</div>



</div>





{/* CENTER SEARCH */}

<div style={styles.search}>

<GlobalSearch />

</div>





{/* RIGHT */}

<div style={styles.right}>


<button style={styles.notification}>

🔔

<span style={styles.badge}>
3
</span>


</button>





<div style={styles.profile}>


<div style={styles.avatar}>


{
user?.first_name?.charAt(0)
}


{
user?.last_name?.charAt(0)
}


</div>



<div>

<strong style={styles.name}>

{
user?.first_name
}

{" "}

{
user?.last_name
}


</strong>


<p style={styles.role}>

{
user?.role_name ||
user?.role ||
"User"
}


</p>


</div>



</div>



</div>



</header>


);

}





const styles={




navbar:{


height:90,


background:
"rgba(255,255,255,.85)",


backdropFilter:
"blur(15px)",


display:"flex",


alignItems:"center",


justifyContent:"space-between",


padding:"0 35px",


position:"sticky",


top:0,


zIndex:50,


borderBottom:
"1px solid rgba(15,23,42,.08)",


boxShadow:
"0 10px 35px rgba(0,0,0,.08)"


},





welcome:{


display:"flex",

alignItems:"center"


},





greeting:{


display:"flex",

alignItems:"center",

gap:15


},





title:{


margin:0,


fontSize:24,


fontWeight:800,


color:"#0f172a"


},





subtitle:{


margin:"5px 0 0",


color:"#64748b",


fontSize:14,


fontWeight:500


},






search:{


flex:1,


display:"flex",


justifyContent:"center",


marginLeft:40,


marginRight:40


},






right:{


display:"flex",


alignItems:"center",


gap:22


},







notification:{


position:"relative",


width:45,


height:45,


borderRadius:15,


border:"1px solid #e2e8f0",


background:"#fff",


fontSize:22,


cursor:"pointer",


display:"flex",


alignItems:"center",


justifyContent:"center",


transition:".3s",


boxShadow:
"0 5px 15px rgba(0,0,0,.08)"


},






badge:{


position:"absolute",


top:-5,


right:-5,


background:"#ef4444",


color:"#fff",


fontSize:11,


width:18,


height:18,


borderRadius:"50%",


display:"flex",


alignItems:"center",


justifyContent:"center",


fontWeight:"700"


},






profile:{


display:"flex",


alignItems:"center",


gap:12,


padding:"8px 15px",


borderRadius:18,


background:
"linear-gradient(135deg,#f8fafc,#ffffff)",


border:
"1px solid #e2e8f0",


boxShadow:
"0 8px 25px rgba(0,0,0,.06)"


},






avatar:{


width:48,


height:48,


borderRadius:16,


background:
"linear-gradient(135deg,#2563eb,#06b6d4)",


color:"#fff",


display:"flex",


alignItems:"center",


justifyContent:"center",


fontWeight:"900",


fontSize:16,


boxShadow:
"0 0 20px rgba(37,99,235,.4)"


},





name:{


fontSize:14,


color:"#0f172a"


},





role:{


margin:0,


fontSize:12,


color:"#64748b"


}



};



export default Navbar;