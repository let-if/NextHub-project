// import useAuth from "../../hooks/useAuth";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { loginUser } from "../../services/authService";


// function Login() {

//     const navigate = useNavigate();
// const { login } = useAuth();

//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });


//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");



//     const handleChange = (e) => {

//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });

//     };



//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");
//         setLoading(true);


//         try {

//             const result = await loginUser(form);


//             // Save authentication data
//             // localStorage.setItem(
//             //     "token",
//             //     result.token
//             // );


//             // localStorage.setItem(
//             //     "user",
//             //     JSON.stringify(result.user)
//             // );
//             login(result);


//             // Go to dashboard
//             navigate("/dashboard");


//         } catch (error) {

//             setError(
//                 error.response?.data?.message ||
//                 "Login failed. Please check your credentials."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };



//     return (

//         <div style={styles.page}>


//             <div style={styles.card}>


//                 <div style={styles.logo}>
//                     NH
//                 </div>


//                 <h1 style={styles.title}>
//                     Welcome Back
//                 </h1>


//                 <p style={styles.subtitle}>
//                     Login to access NexusHub system
//                 </p>



//                 {
//                     error &&
//                     <div style={styles.error}>
//                         {error}
//                     </div>
//                 }



//                 <form onSubmit={handleSubmit}>


//                     <div style={styles.inputGroup}>

//                         <label>
//                             Email Address
//                         </label>


//                         <input

//                             type="email"

//                             name="email"

//                             placeholder="Enter your email"

//                             value={form.email}

//                             onChange={handleChange}

//                             required

//                             style={styles.input}

//                         />


//                     </div>



//                     <div style={styles.inputGroup}>

//                         <label>
//                             Password
//                         </label>


//                         <input

//                             type="password"

//                             name="password"

//                             placeholder="Enter your password"

//                             value={form.password}

//                             onChange={handleChange}

//                             required

//                             style={styles.input}

//                         />


//                     </div>



//                     <button

//                         type="submit"

//                         disabled={loading}

//                         style={styles.button}

//                     >

//                         {
//                             loading
//                             ?
//                             "Signing in..."
//                             :
//                             "Login"
//                         }


//                     </button>


//                 </form>



//                 <div style={styles.footer}>
//                     © 2026 NexusHub. All rights reserved.
//                 </div>



//             </div>


//         </div>

//     );

// }



// const styles = {


// page: {

//     minHeight:"100vh",

//     display:"flex",

//     justifyContent:"center",

//     alignItems:"center",

//     background:
//     "linear-gradient(135deg,#0f172a,#1e3a8a)",

//     fontFamily:
//     "Inter, Arial, sans-serif"

// },



// card:{


//     width:"420px",

//     background:"#ffffff",

//     padding:"40px",

//     borderRadius:"18px",

//     boxShadow:
//     "0 20px 50px rgba(0,0,0,0.25)"

// },



// logo:{


//     width:"70px",

//     height:"70px",

//     borderRadius:"50%",

//     background:
//     "linear-gradient(135deg,#2563eb,#1d4ed8)",

//     color:"#fff",

//     display:"flex",

//     justifyContent:"center",

//     alignItems:"center",

//     fontSize:"28px",

//     fontWeight:"bold",

//     margin:"0 auto 20px"

// },



// title:{


//     textAlign:"center",

//     marginBottom:"8px",

//     color:"#111827",

//     fontSize:"28px"

// },



// subtitle:{


//     textAlign:"center",

//     color:"#6b7280",

//     marginBottom:"30px"

// },



// inputGroup:{


//     marginBottom:"20px"

// },



// input:{


//     width:"100%",

//     padding:"13px",

//     marginTop:"8px",

//     borderRadius:"10px",

//     border:"1px solid #d1d5db",

//     fontSize:"15px",

//     outline:"none",

//     boxSizing:"border-box"

// },



// button:{


//     width:"100%",

//     padding:"14px",

//     border:"none",

//     borderRadius:"10px",

//     background:
//     "linear-gradient(135deg,#2563eb,#1d4ed8)",

//     color:"#fff",

//     fontSize:"16px",

//     fontWeight:"600",

//     cursor:"pointer"

// },



// error:{


//     background:"#fee2e2",

//     color:"#b91c1c",

//     padding:"12px",

//     borderRadius:"8px",

//     marginBottom:"20px",

//     textAlign:"center"

// },



// footer:{


//     marginTop:"30px",

//     textAlign:"center",

//     color:"#9ca3af",

//     fontSize:"13px"

// }


// };


// export default Login;
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";


function Login() {


const navigate = useNavigate();

const { login } = useAuth();



const [form,setForm] = useState({

    email:"",
    password:""

});



const [loading,setLoading]=useState(false);

const [error,setError]=useState("");





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const handleSubmit=async(e)=>{


e.preventDefault();


setError("");

setLoading(true);



try{


const result = await loginUser(form);


login(result);


navigate("/dashboard");



}

catch(error){


setError(

error.response?.data?.message ||

"Login failed. Please check your credentials."

);


}

finally{


setLoading(false);


}


};







return (


<div style={styles.page}>


{/* BACKGROUND LIGHT EFFECT */}

<div style={styles.glow}></div>



<div style={styles.container}>



{/* LEFT BRAND SECTION */}


<div style={styles.brand}>


<div style={styles.logo}>

NH

</div>



<h1>

NexusHub

</h1>



<p>

Office Operations Management
Platform

</p>



<div style={styles.features}>


<div>

✓ Employee Management

</div>


<div>

✓ Asset Tracking

</div>


<div>

✓ Smart Workflow

</div>


<div>

✓ Analytics Dashboard

</div>


</div>



</div>







{/* LOGIN CARD */}



<div style={styles.card}>


<h2>

Welcome Back

</h2>



<p style={styles.subtitle}>

Sign in to access your NexusHub workspace

</p>





{

error &&

<div style={styles.error}>

{error}

</div>

}







<form onSubmit={handleSubmit}>


<div style={styles.group}>


<label style={styles.label}>
 Email Address
</label>


<input


type="email"

name="email"

placeholder="Enter your email"

value={form.email}

onChange={handleChange}

required

style={styles.input}


/>



</div>







<div style={styles.group}>


<label style={styles.label}>
 Password
</label>



<input


type="password"

name="password"

placeholder="Enter your password"

value={form.password}

onChange={handleChange}

required

style={styles.input}


/>


</div>







<button

disabled={loading}

style={styles.button}

>


{

loading

?

"Signing in..."

:

"Login to NexusHub"

}



</button>




</form>




<div style={styles.footer}>

© 2026 NexusHub. All rights reserved.

</div>




</div>



</div>



</div>


);


}







const styles = {


page: {

    minHeight:"100vh",

    display:"flex",

    justifyContent:"center",

    alignItems:"center",

    background:
    "linear-gradient(135deg,#eff6ff,#dbeafe,#ffffff)",

    fontFamily:
    "Inter, Arial, sans-serif",

    padding:"20px"

},



card:{


    width:"430px",

    background:
    "rgba(255,255,255,0.95)",

    padding:"45px",

    borderRadius:"25px",

    boxShadow:
    "0 25px 60px rgba(37,99,235,0.20)",

    border:
    "1px solid rgba(255,255,255,0.8)",

    backdropFilter:
    "blur(15px)"

},



logo:{


    width:"90px",

    height:"90px",

    borderRadius:"25px",

    background:
    "linear-gradient(135deg,#2563eb,#1e40af)",

    color:"#ffffff",

    display:"flex",

    justifyContent:"center",

    alignItems:"center",

    fontSize:"34px",

    fontWeight:"800",

    margin:"0 auto 25px",

    boxShadow:
    "0 15px 30px rgba(37,99,235,0.35)"

},



title:{


    textAlign:"center",

    fontSize:"32px",

    marginBottom:"10px",

    color:"#0f172a",

    fontWeight:"800"

},



subtitle:{


    textAlign:"center",

    color:"#64748b",

    fontSize:"15px",

    marginBottom:"35px"

},



inputGroup:{


    marginBottom:"22px"

},



label:{


    display:"block",

    marginBottom:"8px",

    color:"#334155",

    fontWeight:"600",

    fontSize:"14px"

},



input:{


    width:"100%",

    padding:"15px",

    borderRadius:"14px",

    border:
    "1px solid #cbd5e1",

    fontSize:"15px",

    outline:"none",

    boxSizing:"border-box",

    background:"#f8fafc"

},



button:{


    width:"100%",

    padding:"15px",

    border:"none",

    borderRadius:"14px",

    background:
    "linear-gradient(135deg,#2563eb,#1d4ed8)",

    color:"#ffffff",

    fontSize:"17px",

    fontWeight:"700",

    cursor:"pointer",

    marginTop:"10px",

    boxShadow:
    "0 12px 25px rgba(37,99,235,0.35)"

},



error:{


    background:"#fee2e2",

    color:"#b91c1c",

    padding:"14px",

    borderRadius:"12px",

    marginBottom:"20px",

    textAlign:"center",

    fontWeight:"600"

},



footer:{


    marginTop:"35px",

    textAlign:"center",

    color:"#94a3b8",

    fontSize:"13px"

},



divider:{


    height:"1px",

    background:"#e2e8f0",

    margin:"25px 0"

},



welcomeText:{


    textAlign:"center",

    color:"#2563eb",

    fontWeight:"700",

    marginBottom:"15px"

}


};


export default Login;