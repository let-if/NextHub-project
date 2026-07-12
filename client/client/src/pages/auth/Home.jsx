
import { Link } from "react-router-dom";


function Home(){


return(

<div style={styles.page}>


{/* ================= NAVBAR ================= */}


<nav style={styles.nav}>


<div style={styles.logo}>

<span style={styles.logoIcon}>
N
</span>

NexusHub

</div>





<div style={styles.navLinks}>


<a href="#home" style={styles.navItem}>
Home
</a>


<a href="#features" style={styles.navItem}>
Features
</a>


<a href="#modules" style={styles.navItem}>
Modules
</a>


<a href="#workflow" style={styles.navItem}>
Workflow
</a>


<a href="#about" style={styles.navItem}>
About
</a>



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









{/* ================= HERO ================= */}



<section
id="home"
style={styles.hero}
>



<div style={styles.heroText}>


<span style={styles.badge}>
🚀 Smart Business Management Platform
</span>



<h1 style={styles.heroTitle}>


Manage Your Entire Organization


<br/>


<span style={styles.highlight}>
In One Powerful System
</span>


</h1>




<p style={styles.heroParagraph}>

NexusHub is a complete office management platform
that helps organizations manage employees,
departments, assets, requests and daily operations
from one centralized intelligent dashboard.

</p>





<div style={styles.actions}>


<Link
to="/login"
style={styles.primary}
>

Access Dashboard

</Link>




<Link
to="/register"
style={styles.secondary}
>

Create Organization

</Link>



</div>




<div style={styles.statistics}>


<div>

<h2>
500+
</h2>

<p>
Employees Managed
</p>

</div>



<div>

<h2>
50+
</h2>

<p>
Departments
</p>

</div>




<div>

<h2>
99%
</h2>

<p>
Workflow Efficiency
</p>

</div>



</div>



</div>









<div style={styles.dashboardPreview}>


<div style={styles.previewHeader}>


<div style={styles.circle}></div>

<div style={styles.circle}></div>

<div style={styles.circle}></div>


</div>




<h3>
NexusHub Control Center
</h3>




<div style={styles.previewGrid}>


<PreviewCard
icon="👥"
title="Employees"
value="245"
/>



<PreviewCard
icon="📦"
title="Assets"
value="1,240"
/>



<PreviewCard
icon="📋"
title="Requests"
value="86"
/>



<PreviewCard
icon="📊"
title="Reports"
value="32"
/>



</div>




<div style={styles.progressBox}>


<p>
Organization Performance
</p>


<div style={styles.progress}>

<div style={styles.progressFill}></div>

</div>



<span>
92% Efficiency
</span>



</div>



</div>




</section>










{/* ================= TRUST SECTION ================= */}


<section style={styles.trust}>


<h2>
Built For Modern Organizations
</h2>


<p>

Powerful tools designed to simplify daily operations,
improve productivity and increase transparency.

</p>




<div style={styles.trustGrid}>


<InfoCard
icon="🔐"
title="Secure"
text="Role based access control and protected organizational data."
/>



<InfoCard
icon="⚡"
title="Fast"
text="Modern workflow automation that saves valuable time."
/>




<InfoCard
icon="📱"
title="Responsive"
text="Access your management system from any device."
/>




<InfoCard
icon="☁"
title="Centralized"
text="All business information available in one platform."
/>



</div>



</section>
// ================= FEATURES SECTION =================


<section
id="features"
style={styles.section}
>


<h2 style={styles.sectionTitle}>
Everything You Need To Run Your Organization
</h2>


<p style={styles.sectionText}>

NexusHub provides complete tools to manage people,
resources and business processes efficiently.

</p>




<div style={styles.featureGrid}>


<FeatureCard

icon="👥"

title="Employee Management"

text="Create employee profiles, manage roles, departments and access permissions."

/>



<FeatureCard

icon="🏢"

title="Department Management"

text="Organize your company structure and monitor every department."

/>



<FeatureCard

icon="📦"

title="Asset Management"

text="Track company resources, assignments and availability."

/>



<FeatureCard

icon="📋"

title="Request Management"

text="Create, assign, approve and monitor work requests."

/>



<FeatureCard

icon="📊"

title="Analytics Dashboard"

text="Understand organization performance with real-time statistics."

/>



<FeatureCard

icon="🔔"

title="Smart Notifications"

text="Receive updates about approvals, assignments and activities."

/>



</div>


</section>










{/* ================= MODULES SECTION ================= */}



<section
id="modules"
style={styles.moduleSection}
>



<div style={styles.sectionHeader}>


<h2 style={styles.sectionTitle}>
Powerful Management Modules
</h2>


<p style={styles.sectionText}>

A complete ecosystem designed for enterprise operations.

</p>


</div>







<div style={styles.modulesGrid}>


<div style={styles.moduleCard}>


<div style={styles.moduleIcon}>
👨‍💼
</div>


<h3>
Human Resources
</h3>


<ul>

<li>
Employee profiles
</li>

<li>
Role management
</li>

<li>
Department organization
</li>

<li>
Account control
</li>


</ul>


</div>







<div style={styles.moduleCard}>


<div style={styles.moduleIcon}>
💻
</div>


<h3>
Resource Control
</h3>


<ul>

<li>
Asset tracking
</li>

<li>
Assignments
</li>

<li>
Availability monitoring
</li>

<li>
Resource history
</li>


</ul>


</div>








<div style={styles.moduleCard}>


<div style={styles.moduleIcon}>
⚙️
</div>


<h3>
Workflow Automation
</h3>


<ul>

<li>
Request submission
</li>

<li>
Department approval
</li>

<li>
Status tracking
</li>

<li>
Performance reports
</li>


</ul>


</div>



</div>



</section>









{/* ================= WORKFLOW SECTION ================= */}



<section
id="workflow"
style={styles.workflow}
>



<h2 style={styles.sectionTitle}>
How NexusHub Works
</h2>



<p style={styles.sectionText}>

Simple workflow that connects your entire organization.

</p>






<div style={styles.steps}>


<Step

number="01"

title="Create"

text="Employees submit requests or administrators create records."

/>




<Step

number="02"

title="Manage"

text="Managers review information and assign responsibilities."

/>




<Step

number="03"

title="Approve"

text="Departments process requests with complete transparency."

/>




<Step

number="04"

title="Analyze"

text="Generate insights and improve organizational performance."

/>



</div>




</section>









{/* ================= ABOUT SECTION ================= */}



<section
id="about"
style={styles.about}
>



<div style={styles.aboutCard}>


<h2>
Why Choose NexusHub?
</h2>


<p>

Traditional office management systems are often
slow, disconnected and difficult to monitor.

NexusHub brings everything together into one
modern platform where employees, managers and
administrators can collaborate efficiently.

</p>




<div style={styles.aboutFeatures}>


<div>

<h3>
✔ Centralized Data
</h3>

<p>
All information in one secure location.
</p>

</div>



<div>

<h3>
✔ Better Decisions
</h3>

<p>
Real-time analytics and reporting.
</p>

</div>




<div>

<h3>
✔ Improved Productivity
</h3>

<p>
Automated workflows reduce manual work.
</p>

</div>



</div>



</div>


</section>









{/* ================= CTA ================= */}



<section style={styles.cta}>


<h2>
Ready To Transform Your Organization?
</h2>



<p>

Start managing your employees,
resources and workflows smarter today.

</p>



<Link

to="/register"

style={styles.ctaButton}

>

Start Using NexusHub

</Link>



</section>









{/* ================= FOOTER ================= */}



<footer style={styles.footer}>


<div>


<h2>
NexusHub
</h2>


<p>

Modern Enterprise Office Management Platform

</p>


</div>





<div style={styles.footerLinks}>


<a href="#home">
Home
</a>


<a href="#features">
Features
</a>


<a href="#modules">
Modules
</a>


<a href="#about">
About
</a>



</div>





<p>

© 2026 NexusHub. All rights reserved.

</p>



</footer>



</div>


);


}










// ================= COMPONENTS =================



function PreviewCard({
icon,
title,
value
}){


return(

<div style={styles.previewCard}>


<div>
{icon}
</div>


<h3>
{value}
</h3>


<p>
{title}
</p>


</div>

);


}









function InfoCard({
icon,
title,
text
}){


return(

<div style={styles.infoCard}>


<div style={styles.infoIcon}>
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









function FeatureCard({
icon,
title,
text
}){


return(

<div style={styles.featureCard}>


<div style={styles.featureIcon}>
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









function Step({
number,
title,
text
}){


return(

<div style={styles.step}>


<div style={styles.stepNumber}>
{number}
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


fontFamily:
"'Inter',Arial,sans-serif",

background:
"#f8fafc",

minHeight:"100vh",

color:"#0f172a",

scrollBehavior:"smooth"


},







/* ================= NAVBAR ================= */



nav:{


position:"sticky",

top:0,

zIndex:100,

height:"82px",

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"0 7%",

background:

"rgba(255,255,255,.92)",

backdropFilter:
"blur(15px)",

boxShadow:

"0 5px 25px rgba(15,23,42,.08)"


},







logo:{


display:"flex",

alignItems:"center",

gap:"12px",

fontSize:"28px",

fontWeight:"800",

color:"#0f172a"


},








logoIcon:{


width:"48px",

height:"48px",

borderRadius:"15px",

background:

"linear-gradient(135deg,#2563eb,#7c3aed)",

color:"#fff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"24px",

fontWeight:"800"


},








navLinks:{


display:"flex",

alignItems:"center",

gap:"22px"


},








navItem:{


textDecoration:"none",

color:"#475569",

fontWeight:"600",

fontSize:"15px"


},








login:{


textDecoration:"none",

padding:"12px 24px",

borderRadius:"12px",

color:"#2563eb",

fontWeight:"700"


},








register:{


textDecoration:"none",

padding:"13px 25px",

borderRadius:"12px",

background:

"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#fff",

fontWeight:"700"


},









/* ================= HERO ================= */



hero:{


display:"grid",

gridTemplateColumns:

"1fr 1fr",

gap:"70px",

alignItems:"center",

padding:

"90px 8%"


},







heroText:{


maxWidth:"650px"


},







badge:{


display:"inline-block",

background:"#dbeafe",

color:"#1d4ed8",

padding:"8px 18px",

borderRadius:"30px",

fontWeight:"700",

fontSize:"14px",

marginBottom:"25px"


},








heroTitle:{


fontSize:"64px",

lineHeight:"1.1",

fontWeight:"900",

margin:"0 0 25px",

letterSpacing:"-2px"


},








highlight:{


background:

"linear-gradient(135deg,#2563eb,#7c3aed)",

WebkitBackgroundClip:"text",

color:"transparent"


},








heroParagraph:{


fontSize:"20px",

lineHeight:"1.7",

color:"#64748b"


},








actions:{


display:"flex",

gap:"20px",

marginTop:"35px",

flexWrap:"wrap"


},








primary:{


background:

"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#fff",

padding:"16px 32px",

borderRadius:"14px",

textDecoration:"none",

fontWeight:"700"


},








secondary:{


border:"2px solid #2563eb",

color:"#2563eb",

padding:"14px 32px",

borderRadius:"14px",

textDecoration:"none",

fontWeight:"700"


},







statistics:{


display:"flex",

gap:"45px",

marginTop:"45px"


},








dashboardPreview:{


background:"#ffffff",

borderRadius:"30px",

padding:"30px",

boxShadow:

"0 30px 70px rgba(15,23,42,.15)"


},








previewHeader:{


display:"flex",

gap:"8px",

marginBottom:"25px"


},








circle:{


width:"12px",

height:"12px",

borderRadius:"50%",

background:"#cbd5e1"


},








previewGrid:{


display:"grid",

gridTemplateColumns:

"repeat(2,1fr)",

gap:"18px"


},








previewCard:{


background:"#f8fafc",

padding:"22px",

borderRadius:"18px",

textAlign:"center"


},








progressBox:{


marginTop:"25px",

background:"#eff6ff",

padding:"20px",

borderRadius:"18px"


},








progress:{


height:"12px",

background:"#dbeafe",

borderRadius:"20px",

overflow:"hidden"


},








progressFill:{


width:"92%",

height:"100%",

background:

"linear-gradient(90deg,#2563eb,#7c3aed)"


},









/* ================= SECTIONS ================= */


section:{


padding:"90px 8%",

textAlign:"center"


},








sectionTitle:{


fontSize:"42px",

fontWeight:"800",

marginBottom:"15px"


},








sectionText:{


color:"#64748b",

fontSize:"18px",

maxWidth:"700px",

margin:"auto",

lineHeight:"1.6"


},








trust:{


padding:"70px 8%",

textAlign:"center",

background:"#ffffff"


},








trustGrid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(230px,1fr))",

gap:"25px",

marginTop:"40px"


},








infoCard:{


padding:"30px",

borderRadius:"22px",

background:"#f8fafc",

boxShadow:

"0 10px 30px rgba(0,0,0,.06)"


},








infoIcon:{


fontSize:"40px"


},







featureGrid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(260px,1fr))",

gap:"25px",

marginTop:"45px"


},








featureCard:{


background:"#ffffff",

padding:"30px",

borderRadius:"24px",

boxShadow:

"0 15px 35px rgba(15,23,42,.08)",

textAlign:"left"


},








featureIcon:{


fontSize:"42px"


},







/* MODULES */



moduleSection:{


padding:"90px 8%",

background:"#f1f5f9"


},








modulesGrid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(300px,1fr))",

gap:"30px",

marginTop:"45px"


},








moduleCard:{


background:"#fff",

padding:"35px",

borderRadius:"25px",

textAlign:"left",

boxShadow:

"0 15px 35px rgba(0,0,0,.08)"


},








moduleIcon:{


fontSize:"50px"


},








/* WORKFLOW */



workflow:{


padding:"90px 8%",

textAlign:"center"


},








steps:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(220px,1fr))",

gap:"25px",

marginTop:"45px"


},








step:{


background:"#fff",

padding:"30px",

borderRadius:"25px",

boxShadow:

"0 15px 35px rgba(0,0,0,.08)"


},








stepNumber:{


fontSize:"30px",

fontWeight:"900",

color:"#2563eb"


},








/* ABOUT */



about:{


padding:"90px 8%"

},








aboutCard:{


background:"#0f172a",

color:"#fff",

padding:"60px",

borderRadius:"35px"


},








aboutFeatures:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(220px,1fr))",

gap:"25px",

marginTop:"35px"


},








/* CTA */



cta:{


padding:"80px 8%",

textAlign:"center",

background:

"linear-gradient(135deg,#2563eb,#7c3aed)",

color:"#fff"


},








ctaButton:{


display:"inline-block",

marginTop:"25px",

background:"#fff",

color:"#2563eb",

padding:"16px 35px",

borderRadius:"15px",

textDecoration:"none",

fontWeight:"800"


},









/* FOOTER */



footer:{


background:"#020617",

color:"#fff",

padding:"50px 8%",

textAlign:"center"


},








footerLinks:{


display:"flex",

justifyContent:"center",

gap:"25px",

margin:"25px 0"


}



};





export default Home;