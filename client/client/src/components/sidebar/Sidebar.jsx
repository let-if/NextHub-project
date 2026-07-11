
// // import { NavLink, useNavigate } from "react-router-dom";
// // import useAuth from "../../hooks/useAuth";

// // function Sidebar() {
// //   const navigate = useNavigate();
// //   const { logout, user } = useAuth();

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login");
// //   };

// //   const menuItems = [
// //     {
// //       title: "Dashboard",
// //       path: "/dashboard",
// //       icon: "🏠",
// //     },
// //     {
// //       title: "My Requests",
// //       path: "/requests",
// //       icon: "📋",
// //     },
// //     {
// //       title: "Create Request",
// //       path: "/requests/create",
// //       icon: "➕",
// //     },
// //     {
// //       title: "Members",
// //       path: "/members",
// //       icon: "👥",
// //     },
// //     {
// //       title: "Assets",
// //       path: "/assets",
// //       icon: "💻",
// //     },
// //     {
// //       title: "Resources",
// //       path: "/resources",
// //       icon: "📦",
// //     },
// //     {
// //       title: "Departments",
// //       path: "/departments",
// //       icon: "🏢",
// //     },
// //     {
// //       title: "Statistics",
// //       path: "/statistics",
// //       icon: "📊",
// //     },
// //     {
// //       title: "Profile",
// //       path: "/profile",
// //       icon: "👤",
// //     },
// //   ];

// //   return (
// //     <aside style={styles.sidebar}>
// //       <div>
// //         <div style={styles.logo}>
// //           <div style={styles.logoCircle}>
// //             NH
// //           </div>

// //           <div>
// //             <h2 style={styles.logoText}>
// //               NexusHub
// //             </h2>

// //             <small style={styles.logoSub}>
// //               Office Management
// //             </small>
// //           </div>
// //         </div>

// //         <nav>
// //           {menuItems.map((item) => (
// //             <NavLink
// //               key={item.path}
// //               to={item.path}
// //               style={({ isActive }) => ({
// //                 ...styles.link,
// //                 ...(isActive ? styles.activeLink : {}),
// //               })}
// //             >
// //               <span style={styles.icon}>
// //                 {item.icon}
// //               </span>

// //               <span>
// //                 {item.title}
// //               </span>
// //             </NavLink>
// //           ))}
// //         </nav>
// //       </div>

// //       <div>
// //         <div style={styles.userCard}>
// //           <div style={styles.userAvatar}>
// //             {user?.first_name?.charAt(0)}
// //             {user?.last_name?.charAt(0)}
// //           </div>

// //           <div>
// //             <strong>
// //               {user?.first_name} {user?.last_name}
// //             </strong>

// //             <div style={styles.role}>
// //               {user?.role_name}
// //             </div>
// //           </div>
// //         </div>

// //         <button
// //           style={styles.logout}
// //           onClick={handleLogout}
// //         >
// //           🚪 Logout
// //         </button>
// //       </div>
// //     </aside>
// //   );
// // }

// // const styles = {
// //   sidebar: {
// //     width: 270,
// //     background: "#0f172a",
// //     color: "white",
// //     display: "flex",
// //     flexDirection: "column",
// //     justifyContent: "space-between",
// //     padding: 22,
// //     minHeight: "100vh",
// //     boxSizing: "border-box",
// //   },

// //   logo: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 14,
// //     marginBottom: 35,
// //   },

// //   logoCircle: {
// //     width: 55,
// //     height: 55,
// //     borderRadius: "50%",
// //     background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     fontWeight: "bold",
// //     fontSize: 20,
// //     boxShadow: "0 8px 20px rgba(37,99,235,.35)",
// //   },

// //   logoText: {
// //     margin: 0,
// //     fontSize: 22,
// //     fontWeight: 700,
// //   },

// //   logoSub: {
// //     color: "#94a3b8",
// //     fontSize: 13,
// //   },

// //   link: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 14,
// //     color: "#e2e8f0",
// //     textDecoration: "none",
// //     padding: "13px 16px",
// //     borderRadius: 12,
// //     marginBottom: 8,
// //     transition: "0.3s",
// //     fontWeight: 500,
// //   },

// //   activeLink: {
// //     background: "#2563eb",
// //     color: "#fff",
// //     boxShadow: "0 8px 18px rgba(37,99,235,.35)",
// //   },

// //   icon: {
// //     fontSize: 20,
// //     width: 24,
// //     textAlign: "center",
// //   },

// //   userCard: {
// //     background: "#1e293b",
// //     borderRadius: 14,
// //     padding: 16,
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 14,
// //     marginBottom: 15,
// //   },

// //   userAvatar: {
// //     width: 46,
// //     height: 46,
// //     borderRadius: "50%",
// //     background: "#2563eb",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     fontWeight: "bold",
// //     fontSize: 16,
// //   },

// //   role: {
// //     fontSize: 13,
// //     color: "#94a3b8",
// //     marginTop: 4,
// //   },

// //   logout: {
// //     width: "100%",
// //     padding: 13,
// //     background: "#dc2626",
// //     border: "none",
// //     color: "white",
// //     borderRadius: 10,
// //     cursor: "pointer",
// //     fontWeight: 600,
// //     fontSize: 15,
// //   },
// // };

// // export default Sidebar;
// import {NavLink,useNavigate} from "react-router-dom";
// import useAuth from "../../hooks/useAuth";


// function Sidebar(){


// const navigate = useNavigate();


// const {
// logout,
// user
// }=useAuth();



// const handleLogout=()=>{

// logout();

// navigate("/login");

// };





// const menuItems=[


// {
// title:"Dashboard",
// path:"/dashboard",
// icon:"🏠"
// },


// {
// title:"My Requests",
// path:"/requests",
// icon:"📋"
// },


// {
// title:"Create Request",
// path:"/requests/create",
// icon:"➕"
// },


// {
// title:"Members",
// path:"/members",
// icon:"👥"
// },


// {
// title:"Assets",
// path:"/assets",
// icon:"💻"
// },


// {
// title:"Resources",
// path:"/resources",
// icon:"📦"
// },


// {
// title:"Departments",
// path:"/departments",
// icon:"🏢"
// },


// {
// title:"Statistics",
// path:"/statistics",
// icon:"📊"
// },


// {
// title:"Profile",
// path:"/profile",
// icon:"👤"
// }


// ];




// return(


// <aside style={styles.sidebar}>


// <div>


// <div style={styles.logo}>


// <div style={styles.logoCircle}>

// NH

// </div>



// <div>

// <h2 style={styles.logoText}>
// NexusHub
// </h2>


// <small style={styles.logoSub}>
// Office Management
// </small>


// </div>


// </div>





// <nav>


// {
// menuItems.map(item=>(


// <NavLink

// key={item.path}

// to={item.path}


// style={({isActive})=>({

// ...styles.link,

// ...(isActive?
// styles.activeLink:{}

// )

// })}


// >


// <span style={styles.icon}>

// {item.icon}

// </span>


// {item.title}


// </NavLink>



// ))

// }



// </nav>


// </div>








// <div>


// <div style={styles.userCard}>


// <div style={styles.avatar}>


// {
// user?.first_name?.charAt(0)
// }

// {
// user?.last_name?.charAt(0)
// }


// </div>



// <div>


// <strong>

// {
// user?.first_name
// }

// {" "}

// {
// user?.last_name
// }


// </strong>



// <p style={styles.role}>


// {
// user?.role_name ||
// user?.role ||
// "User"
// }


// </p>


// </div>


// </div>




// <button

// style={styles.logout}

// onClick={handleLogout}

// >


// 🚪 Logout


// </button>


// </div>



// </aside>


// );


// }




// const styles={


// sidebar:{


// width:270,

// background:"#0f172a",

// color:"#fff",

// padding:"22px",

// display:"flex",

// flexDirection:"column",

// justifyContent:"space-between",

// minHeight:"100vh"

// },



// logo:{


// display:"flex",

// alignItems:"center",

// gap:15,

// marginBottom:35

// },



// logoCircle:{


// width:55,

// height:55,

// borderRadius:"50%",

// background:"linear-gradient(135deg,#2563eb,#1e40af)",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontWeight:"700",

// fontSize:20

// },



// logoText:{


// margin:0

// },



// logoSub:{


// color:"#94a3b8"

// },



// link:{


// display:"flex",

// alignItems:"center",

// gap:14,

// padding:"13px 15px",

// marginBottom:8,

// borderRadius:12,

// color:"#e2e8f0",

// textDecoration:"none"

// },



// activeLink:{


// background:"#2563eb",

// color:"#fff"

// },



// icon:{


// fontSize:20

// },



// userCard:{


// background:"#1e293b",

// padding:15,

// borderRadius:15,

// display:"flex",

// gap:12,

// alignItems:"center"

// },



// avatar:{


// width:45,

// height:45,

// borderRadius:"50%",

// background:"#2563eb",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontWeight:"700"

// },



// role:{


// margin:0,

// color:"#94a3b8",

// fontSize:13

// },



// logout:{


// width:"100%",

// marginTop:15,

// padding:13,

// border:"none",

// borderRadius:10,

// background:"#dc2626",

// color:"#fff",

// fontWeight:"600",

// cursor:"pointer"

// }



// };



// export default Sidebar;
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
//   sidebar: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: 270,
//     height: "100vh",
//     overflowY: "auto",

//     background: "#0f172a",
//     color: "#fff",

//     padding: "22px",

//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",

//     boxSizing: "border-box",
//     borderRight: "1px solid #1e293b",
//     zIndex: 1000,
//   },
sidebar: {
  position: "fixed",
  top: 0,
  left: 0,
  width: 270,
  height: "100vh",

  background: "#0f172a",
  color: "#fff",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  padding: "22px",
  boxSizing: "border-box",

  overflowY: "auto",
  overflowX: "hidden",

  borderRight: "1px solid #1e293b",
  zIndex: 100,
  flexShrink: 0,
},
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    marginBottom: 35,
  },

  logoCircle: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 20,
  },

  logoText: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
  },

  logoSub: {
    color: "#94a3b8",
    fontSize: 13,
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "13px 16px",
    marginBottom: 8,
    borderRadius: 12,

    color: "#e2e8f0",
    textDecoration: "none",

    transition: "0.25s",
    fontWeight: 500,
  },

  activeLink: {
    background: "#2563eb",
    color: "#fff",
    boxShadow: "0 8px 18px rgba(37,99,235,.35)",
  },

  icon: {
    width: 24,
    textAlign: "center",
    fontSize: 20,
  },

  userCard: {
    background: "#1e293b",
    borderRadius: 14,
    padding: 16,

    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "#2563eb",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontWeight: "bold",
    fontSize: 16,
  },

  role: {
    marginTop: 4,
    marginBottom: 0,
    fontSize: 13,
    color: "#94a3b8",
  },

  logout: {
    width: "100%",
    marginTop: 15,

    padding: 13,

    background: "#dc2626",
    color: "#fff",

    border: "none",
    borderRadius: 10,

    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
  },
};

export default Sidebar;
