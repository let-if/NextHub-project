// import Sidebar from "../components/sidebar/Sidebar";
// import Navbar from "../components/navbar/Navbar";

// function DashboardLayout({ children }) {
//   return (
//     <div style={styles.container}>
//       <Sidebar />

//       <div style={styles.right}>
//         <Navbar />

//         <main style={styles.content}>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     minHeight: "100vh",
//     background: "#f8fafc",
//   },

//   right: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//   },

//   content: {
//     flex: 1,
//     padding: "30px",
//     overflow: "auto",
//   },
// };

// export default DashboardLayout;
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

function DashboardLayout({ children }) {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.right}>
        <Navbar />

        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

const SIDEBAR_WIDTH = 270;

const styles = {
  container: {
    background: "#f8fafc",
    minHeight: "100vh",
  },

  right: {
    marginLeft: SIDEBAR_WIDTH,
    minHeight: "100vh",

    display: "flex",
    flexDirection: "column",

    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  },

  content: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
  },
};

export default DashboardLayout;
