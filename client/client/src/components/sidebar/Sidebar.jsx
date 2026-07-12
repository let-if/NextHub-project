
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Sidebar() {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      title: "Department Requests",
      path: "/department/requests",
      icon: "📨",
    },
    {
      title: "My Requests",
      path: "/requests",
      icon: "📋",
    },
    {
      title: "Create Request",
      path: "/requests/create",
      icon: "➕",
    },
    {
      title: "Members",
      path: "/members",
      icon: "👥",
    },
    {
      title: "Resources",
      path: "/assets",
      icon: "💻",
    },
    {
      title: "Departments",
      path: "/departments",
      icon: "🏢",
    },
    {
      title: "Statistics",
      path: "/statistics",
      icon: "📊",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];


  return (
    <aside style={styles.sidebar}>
      <div>
        <div style={styles.logo}>
          <div style={styles.logoCircle}>NH</div>

          <div>
            <h2 style={styles.logoText}>NexusHub</h2>

            <small style={styles.logoSub}>
              Office Management
            </small>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.activeLink : {}),
              })}
            >
              <span style={styles.icon}>
                {item.icon}
              </span>

              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
    
      </div>

      <div>
        <div style={styles.userCard}>
          <div style={styles.avatar}>
            {user?.first_name?.charAt(0)}
            {user?.last_name?.charAt(0)}
          </div>

          <div>
            <strong>
              {user?.first_name} {user?.last_name}
            </strong>

            <p style={styles.role}>
              {user?.role_name ||
                user?.role ||
                "User"}
            </p>
          </div>
        </div>

        <button
          style={styles.logout}
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}


const styles = {


sidebar:{


position:"fixed",

top:0,

left:0,

width:290,

height:"100vh",


background:
"linear-gradient(180deg,#020617,#0f172a 45%,#111827)",


color:"#fff",


padding:"25px 20px",


display:"flex",

flexDirection:"column",

justifyContent:"space-between",


boxSizing:"border-box",


overflowY:"auto",


borderRight:
"1px solid rgba(255,255,255,.08)",


boxShadow:
"20px 0 60px rgba(0,0,0,.35)",


zIndex:1000,


},





logo:{


display:"flex",

alignItems:"center",

gap:15,


marginBottom:40,


paddingBottom:25,


borderBottom:
"1px solid rgba(255,255,255,.08)"


},






logoCircle:{


width:62,

height:62,


borderRadius:"20px",


background:
"linear-gradient(135deg,#3b82f6,#06b6d4)",


display:"flex",

justifyContent:"center",

alignItems:"center",


fontSize:22,

fontWeight:"900",


boxShadow:
"0 0 25px rgba(59,130,246,.7)",


animation:
"pulse 3s infinite"


},





logoText:{


margin:0,


fontSize:24,


fontWeight:800,


letterSpacing:.5,


background:
"linear-gradient(90deg,#fff,#93c5fd)",


WebkitBackgroundClip:"text",

color:"transparent"


},





logoSub:{


color:"#94a3b8",

fontSize:13,


letterSpacing:.5


},







link:{


position:"relative",


display:"flex",


alignItems:"center",


gap:15,


padding:"14px 18px",


marginBottom:10,


borderRadius:16,


color:"#cbd5e1",


textDecoration:"none",


fontWeight:600,


fontSize:15,


transition:"all .35s ease",


overflow:"hidden"


},







activeLink:{


background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",


color:"#fff",


boxShadow:
"0 10px 30px rgba(37,99,235,.45)",


transform:
"translateX(6px)"


},







icon:{


width:28,


height:28,


display:"flex",


alignItems:"center",


justifyContent:"center",


fontSize:21,


borderRadius:10,


background:
"rgba(255,255,255,.06)",


transition:"all .3s"


},







userCard:{


background:
"linear-gradient(135deg,#1e293b,#0f172a)",


borderRadius:20,


padding:18,


display:"flex",


alignItems:"center",


gap:15,


border:
"1px solid rgba(255,255,255,.08)",


boxShadow:
"0 10px 30px rgba(0,0,0,.3)",


marginBottom:15


},






avatar:{


width:52,


height:52,


borderRadius:"18px",


background:
"linear-gradient(135deg,#22c55e,#2563eb)",


display:"flex",


alignItems:"center",

justifyContent:"center",


fontWeight:"900",


fontSize:18,


boxShadow:
"0 0 20px rgba(34,197,94,.4)"


},






role:{


marginTop:5,


marginBottom:0,


fontSize:13,


color:"#94a3b8"


},







logout:{


width:"100%",


padding:"14px",


borderRadius:15,


border:"1px solid rgba(239,68,68,.4)",


background:
"linear-gradient(135deg,#dc2626,#991b1b)",


color:"#fff",


fontWeight:700,


fontSize:15,


cursor:"pointer",


transition:"all .3s",


boxShadow:
"0 10px 25px rgba(220,38,38,.35)"


},





};

export default Sidebar;
