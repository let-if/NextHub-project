
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import { getDashboard } from "../../services/dashboardService";

function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();

      console.log("Dashboard Data:", data);

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Employees",
      value: dashboard?.statistics?.users ?? 0,
      color: "#2563eb",
      icon: "👥",
    },
    {
      title: "Resources",
      value: dashboard?.statistics?.resources ?? 0,
      color: "#16a34a",
      icon: "💻",
    },
    {
      title: "Work Requests",
      value: dashboard?.statistics?.requests ?? 0,
      color: "#f59e0b",
      icon: "📋",
    },
    {
      title: "Pending",
      value: dashboard?.statistics?.pending ?? 0,
      color: "#dc2626",
      icon: "⏳",
    },
  ];

  return (
    <DashboardLayout>
      <div style={styles.container}>
        {/* HERO */}
        <div style={styles.hero}>
          <div>
            <span style={styles.welcomeBadge}>
              👋 Welcome Back
            </span>

            <h1 style={styles.heroTitle}>
              {user?.first_name} {user?.last_name}
            </h1>

            <p style={styles.heroSubtitle}>
              NexusHub Office Operations Management System
            </p>
          </div>

          <div style={styles.heroCircle}>
            {user?.first_name?.charAt(0)}
            {user?.last_name?.charAt(0)}
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingCard}>
            <div style={styles.loadingIcon}>
              ⏳
            </div>

            <h2>Loading Dashboard...</h2>

            <p>
              Preparing your workspace.
            </p>
          </div>
        ) : (
          <>
            {/* STATISTICS */}
            <div style={styles.grid}>
              {cards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    ...styles.card,
                    borderTop: `5px solid ${card.color}`,
                  }}
                >
                  <div style={styles.cardTop}>
                    <div
                      style={{
                        ...styles.cardIcon,
                        background: card.color,
                      }}
                    >
                      {card.icon}
                    </div>

                    <div>
                      <div style={styles.cardLabel}>
                        {card.title}
                      </div>

                      <div style={styles.cardValue}>
                        {card.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* LOWER GRID */}
            <div style={styles.bottomGrid}>
              {/* QUICK ACTIONS */}
              <div style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h2 style={styles.panelTitle}>
                    Quick Actions
                  </h2>

                  <span style={styles.panelBadge}>
                    Shortcuts
                  </span>
                </div>

                <div style={styles.quickGrid}>
                  <Link
                    to="/requests/create"
                    style={styles.actionCard}
                  >
                    <div style={styles.actionIcon}>
                      ➕
                    </div>

                    <h3>Create Request</h3>

                    <p>
                      Submit a new work request.
                    </p>
                  </Link>

                  <Link
                    to="/requests"
                    style={styles.actionCard}
                  >
                    <div style={styles.actionIcon}>
                      📋
                    </div>

                    <h3>My Requests</h3>

                    <p>
                      View request history.
                    </p>
                  </Link>

                  <Link
                    to="/members"
                    style={styles.actionCard}
                  >
                    <div style={styles.actionIcon}>
                      👥
                    </div>

                    <h3>Members</h3>

                    <p>
                      Manage organization members.
                    </p>
                  </Link>
                </div>
              </div>

              {/* RECENT ACTIVITY */}
              <div style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h2 style={styles.panelTitle}>
                    Recent Activity
                  </h2>

                  <span style={styles.panelBadge}>
                    Live
                  </span>
                </div>

                {dashboard?.activities?.length === 0 ? (
                  <div style={styles.empty}>
                    <div style={styles.emptyIcon}>
                      📭
                    </div>

                    <h3>No Recent Activities</h3>

                    <p>
                      Activities will appear here.
                    </p>
                  </div>
                ) : (
                  // <div style={styles.activityList}>
                  //   {dashboard.activities.map(
                  //     (activity, index) => (
                  //       <div
                  //         key={index}
                  //         style={styles.activityCard}
                  //       >
                  //         <div
                  //           style={styles.activityDot}
                  //         />

                  //         <div
                  //           style={
                  //             styles.activityContent
                  //           }
                  //         >
                  //           <strong>
                  //             {activity.action}
                  //           </strong>

                  //           <p>
                  //             {activity.created_at}
                  //           </p>
                  //         </div>
                  //       </div>
                  //     )
                  //   )}
                  // </div>
                  <div style={styles.activityList}>

{
dashboard.activities.map(
(activity,index)=>(


<div

key={index}

style={{

...styles.activityCard,


borderLeft:

`6px solid ${
index % 4 === 0
?
"#2563eb"
:
index % 4 === 1
?
"#16a34a"
:
index % 4 === 2
?
"#f59e0b"
:
"#dc2626"
}`

}}

>


<div

style={{

...styles.activityDot,


background:

index % 4 === 0
?
"linear-gradient(135deg,#2563eb,#38bdf8)"
:
index % 4 === 1
?
"linear-gradient(135deg,#16a34a,#4ade80)"
:
index % 4 === 2
?
"linear-gradient(135deg,#f59e0b,#fbbf24)"
:
"linear-gradient(135deg,#dc2626,#fb7185)"

}}

>


</div>





<div style={styles.activityContent}>


<div style={styles.activityTitle}>

{activity.action}

</div>



<div style={styles.activityTime}>

🕒 {activity.created_at}

</div>



</div>



</div>



)

)

}


</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

const styles = {


container:{

maxWidth:"1450px",

margin:"0 auto",

padding:"5px 0 30px"

},





/* ================= HERO ================= */


hero:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

background:
"linear-gradient(135deg,#2563eb,#1d4ed8,#172554)",

borderRadius:"28px",

padding:"45px",

color:"#fff",

marginBottom:"35px",

boxShadow:
"0 25px 60px rgba(37,99,235,.25)",

flexWrap:"wrap",

gap:"25px"

},



welcomeBadge:{

display:"inline-flex",

alignItems:"center",

padding:"8px 18px",

background:"rgba(255,255,255,.16)",

borderRadius:"999px",

fontSize:"13px",

fontWeight:"700",

marginBottom:"15px"

},



heroTitle:{

margin:0,

fontSize:"42px",

fontWeight:"850",

letterSpacing:"-1px"

},



heroSubtitle:{

marginTop:"12px",

fontSize:"16px",

color:"#dbeafe"

},



heroCircle:{

width:"105px",

height:"105px",

borderRadius:"50%",

background:"rgba(255,255,255,.18)",

border:"4px solid rgba(255,255,255,.35)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"34px",

fontWeight:"800"

},







/* ================= LOADING ================= */


loadingCard:{

background:"#fff",

borderRadius:"26px",

padding:"80px 40px",

textAlign:"center",

boxShadow:
"0 20px 45px rgba(15,23,42,.08)"

},



loadingIcon:{

fontSize:"60px",

marginBottom:"20px"

},









/* ================= STATISTICS ================= */



grid:{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",

gap:"24px",

marginBottom:"35px"

},



card:{

background:"#fff",

borderRadius:"24px",

padding:"28px",

boxShadow:
"0 18px 45px rgba(15,23,42,.08)",

transition:"all .25s ease"

},



cardTop:{

display:"flex",

alignItems:"center",

gap:"18px"

},



cardIcon:{

width:"68px",

height:"68px",

borderRadius:"20px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"32px",

color:"#fff"

},



cardLabel:{

fontSize:"15px",

fontWeight:"650",

color:"#64748b",

marginBottom:"8px"

},



cardValue:{

fontSize:"40px",

fontWeight:"850",

color:"#0f172a"

},







/* ================= LOWER SECTION ================= */



bottomGrid:{

display:"grid",

gridTemplateColumns:

"minmax(600px,2fr) minmax(350px,1fr)",

gap:"25px",

alignItems:"stretch"

},







/* ================= PANELS ================= */


panel:{

background:"#ffffff",

borderRadius:"26px",

padding:"30px",

boxShadow:
"0 18px 45px rgba(15,23,42,.08)",

height:"520px",

display:"flex",

flexDirection:"column",

overflow:"hidden"

},



panelHeader:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"25px",

flexShrink:0

},



panelTitle:{

margin:0,

fontSize:"24px",

fontWeight:"850",

color:"#0f172a"

},



panelBadge:{

background:"#eff6ff",

color:"#2563eb",

padding:"8px 15px",

borderRadius:"999px",

fontSize:"13px",

fontWeight:"700"

},







/* ================= QUICK ACTION ================= */


quickGrid:{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

flex:1,

alignContent:"start"

},



actionCard:{

textDecoration:"none",

background:
"linear-gradient(145deg,#ffffff,#f8fafc)",

border:"1px solid #e2e8f0",

borderRadius:"22px",

padding:"26px",

color:"#0f172a",

transition:"all .25s ease"

},



actionIcon:{

width:"60px",

height:"60px",

borderRadius:"18px",

background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#fff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px",

marginBottom:"18px"

},







/* ================= RECENT ACTIVITY ================= */


/* ================= PREMIUM ACTIVITY FEED ================= */


activityList:{


display:"flex",


flexDirection:"column",


gap:"18px",


overflowY:"auto",


paddingRight:"12px",


paddingBottom:"15px",


flex:1,


scrollBehavior:"smooth"


},






activityCard:{


position:"relative",


display:"flex",


alignItems:"flex-start",


gap:"18px",


padding:"22px",


borderRadius:"24px",


background:
"linear-gradient(145deg,#ffffff,#f8fafc)",


border:
"1px solid #e2e8f0",


boxShadow:
"0 12px 30px rgba(15,23,42,.06)",


transition:
"all .35s cubic-bezier(.4,0,.2,1)",


cursor:"pointer",


overflow:"hidden"


},





activityDot:{


width:"18px",


height:"18px",


borderRadius:"50%",


background:
"linear-gradient(135deg,#2563eb,#06b6d4)",


marginTop:"8px",


flexShrink:0,


boxShadow:
"0 0 0 8px rgba(37,99,235,.12),0 8px 20px rgba(37,99,235,.35)"


},





activityContent:{


flex:1,


color:"#334155",


display:"flex",


flexDirection:"column",


gap:"8px"


},
activityTime:{


fontSize:"13px",


fontWeight:"700",


color:"#94a3b8"


},



activityTitle:{


fontSize:"16px",


fontWeight:"850",


color:"#0f172a"


},


// activityList:{

// display:"flex",

// flexDirection:"column",

// gap:"15px",

// overflowY:"auto",

// paddingRight:"8px",

// flex:1

// },



// activityCard:{

// display:"flex",

// alignItems:"flex-start",

// gap:"15px",

// padding:"18px",

// background:"#f8fafc",

// borderRadius:"18px",

// border:"1px solid #e2e8f0",

// flexShrink:0

// },



// activityDot:{

// width:"14px",

// height:"14px",

// borderRadius:"50%",

// background:"#2563eb",

// marginTop:"7px",

// flexShrink:0

// },



// activityContent:{

// flex:1,

// color:"#334155"

// },







/* ================= EMPTY ================= */



empty:{

flex:1,

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

textAlign:"center",

color:"#64748b"

},



emptyIcon:{

fontSize:"75px",

marginBottom:"15px"

}
,
activityTitle:{


fontSize:"16px",

fontWeight:"850",

color:"#0f172a",

marginBottom:"5px"


},



activityTime:{


fontSize:"13px",

fontWeight:"700",

color:"#64748b"


}


};

export default Dashboard;