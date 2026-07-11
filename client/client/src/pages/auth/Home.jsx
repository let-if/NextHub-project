import { Link } from "react-router-dom";


function Home(){


return (

<div style={styles.page}>


{/* NAVBAR */}

<nav style={styles.nav}>


<div style={styles.logo}>

<span style={styles.logoIcon}>
N
</span>

NexusHub

</div>



<div style={styles.navLinks}>


<Link 
to="/login"
style={styles.login}
>

Login

</Link>


<Link 
to="/register"
style={styles.register}
>

Get Started

</Link>


</div>


</nav>





{/* HERO SECTION */}


<section style={styles.hero}>


<div style={styles.heroText}>


<h1 style={styles.heroTitle}>

Smart Office
<br/>

Management
<br/>

<span style={styles.highlight}>
Platform
</span>

</h1>



<p style={styles.heroParagraph}>
NexusHub helps organizations manage employees,
resources, requests and daily operations in one
powerful centralized system.
</p>



<div style={styles.actions}>


<Link
to="/login"
style={styles.primary}
>

Login To Dashboard

</Link>



<Link
to="/register"
style={styles.secondary}
>

Create Account

</Link>


</div>



</div>





<div style={styles.heroCard}>


<div style={styles.cardHeader}>

NexusHub Dashboard

</div>



<div style={styles.dashboardBox}>


<div>

👥

<h3>
Employees
</h3>

<p>
Manage team members
</p>

</div>




<div>

📦

<h3>
Assets
</h3>

<p>
Track resources
</p>

</div>




<div>

📋

<h3>
Requests
</h3>

<p>
Handle workflow
</p>

</div>



</div>


</div>



</section>







{/* FEATURES */}



<section style={styles.features}>


<h2>

Everything You Need

</h2>


<p>

A complete office operation management solution.

</p>



<div style={styles.featureGrid}>


<Card
icon="👥"
title="Member Management"
text="Manage employees, roles and departments easily."
/>


<Card
icon="📦"
title="Asset Management"
text="Track company resources and assignments."
/>



<Card
icon="⚡"
title="Request Workflow"
text="Create and approve work requests faster."
/>



<Card
icon="📊"
title="Analytics"
text="Understand your organization with statistics."
/>



</div>


</section>








{/* FOOTER */}


<footer style={styles.footer}>


<h2>
NexusHub
</h2>


<p>

Modern Office Operations Management System

</p>


<p>

© 2026 NexusHub. All rights reserved.

</p>


</footer>



</div>


);


}




function Card({
icon,
title,
text
}){


return (

<div style={styles.featureCard}>


<div style={styles.icon}>

{icon}

</div>


<h3>

{title}

</h3>


<p>

{text}

</p>


</div>

);


}





const styles={


page:{
  fontFamily:"'Inter', Arial, sans-serif",
  background:"#f8fafc",
  minHeight:"100vh"
},


nav:{
  height:"80px",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"0 8%",
  background:"#ffffff",
  boxShadow:"0 5px 20px rgba(0,0,0,.05)"
},


logo:{
  fontSize:"28px",
  fontWeight:"800",
  color:"#0f172a",
  display:"flex",
  alignItems:"center",
  gap:"12px"
},


logoIcon:{
  background:"#2563eb",
  color:"white",
  width:"45px",
  height:"45px",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  borderRadius:"12px"
},



navLinks:{
  display:"flex",
  gap:"15px"
},



login:{
  textDecoration:"none",
  padding:"12px 25px",
  borderRadius:"10px",
  color:"#2563eb",
  fontWeight:"700"
},



register:{
  textDecoration:"none",
  padding:"12px 25px",
  borderRadius:"10px",
  background:"#2563eb",
  color:"white",
  fontWeight:"700"
},



hero:{
  display:"grid",
  gridTemplateColumns:"1fr 1fr",
  gap:"50px",
  padding:"80px 8%",
  alignItems:"center"
},



heroTitle:{
  fontSize:"60px",
  lineHeight:"1.1",
  color:"#0f172a"
},



highlight:{
  color:"#2563eb"
},



heroParagraph:{
  fontSize:"20px",
  lineHeight:"1.7",
  color:"#64748b",
  maxWidth:"600px"
},



actions:{
  display:"flex",
  gap:"20px",
  marginTop:"35px"
},



primary:{
  background:"#2563eb",
  color:"white",
  padding:"16px 30px",
  borderRadius:"12px",
  textDecoration:"none",
  fontWeight:"700"
},



secondary:{
  border:"2px solid #2563eb",
  color:"#2563eb",
  padding:"14px 30px",
  borderRadius:"12px",
  textDecoration:"none",
  fontWeight:"700"
},



heroCard:{
  background:"#ffffff",
  padding:"30px",
  borderRadius:"25px",
  boxShadow:"0 20px 50px rgba(0,0,0,.1)"
},



cardHeader:{
  fontSize:"22px",
  fontWeight:"700",
  marginBottom:"25px"
},



dashboardBox:{
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
  gap:"15px"
},



dashboardItem:{
  background:"#f1f5f9",
  padding:"20px",
  borderRadius:"15px",
  textAlign:"center"
},



features:{
  padding:"70px 8%",
  textAlign:"center"
},



featureGrid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",
  gap:"25px",
  marginTop:"40px"
},



featureCard:{
  background:"white",
  padding:"30px",
  borderRadius:"20px",
  boxShadow:"0 10px 30px rgba(0,0,0,.08)"
},



icon:{
  fontSize:"40px"
},



footer:{
  background:"#0f172a",
  color:"white",
  padding:"40px",
  textAlign:"center"
}



};


export default Home;