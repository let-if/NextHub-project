// import { useEffect, useState } from "react";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import API from "../../api/axios";


// function DepartmentRequests(){


// const [requests,setRequests]=useState([]);

// const [loading,setLoading]=useState(true);

// const [search,setSearch]=useState("");





// useEffect(()=>{

// loadRequests();

// },[]);





// const loadRequests=async()=>{


// try{


// const response =
// await API.get(
// "/department-requests"
// );


// setRequests(
// response.data.requests || []
// );


// }
// catch(error){

// console.log(error);

// }
// finally{

// setLoading(false);

// }


// };







// const updateStatus=async(id,status)=>{


// try{


// await API.put(

// `/department-requests/${id}/status`,

// {
// status
// }

// );


// loadRequests();


// }
// catch(error){

// console.log(error);

// alert(
// "Status update failed"
// );

// }



// };









// const filteredRequests =
// requests.filter(req=>

// req.title
// .toLowerCase()
// .includes(
// search.toLowerCase()
// )

// ||
// req.request_number
// .toLowerCase()
// .includes(
// search.toLowerCase()
// )

// );









// if(loading)

// return(

// <DashboardLayout>

// <div style={styles.loading}>

// Loading requests...

// </div>

// </DashboardLayout>

// );









// return(


// <DashboardLayout>


// <div style={styles.page}>


// {/* HEADER */}


// <div style={styles.header}>


// <div>

// <h1 style={styles.title}>

// Department Requests

// </h1>


// <p style={styles.subtitle}>

// Manage and process department requests

// </p>


// </div>



// </div>









// {/* SEARCH */}


// <div style={styles.searchBox}>


// <input

// placeholder="Search request..."

// value={search}

// onChange={
// e=>setSearch(e.target.value)
// }

// style={styles.search}

// />


// </div>









// {/* TABLE */}



// <div style={styles.card}>


// <table style={styles.table}>


// <thead>


// <tr>


// <th>
// Request
// </th>


// <th>
// Requester
// </th>


// <th>
// Category
// </th>


// <th>
// Priority
// </th>


// <th>
// Status
// </th>


// <th>
// Date
// </th>


// <th>
// Action
// </th>


// </tr>


// </thead>





// <tbody>



// {

// filteredRequests.length===0 ?


// <tr>

// <td

// colSpan="7"

// style={styles.empty}

// >

// No requests found

// </td>

// </tr>


// :


// filteredRequests.map(req=>(



// <tr key={req.id}>


// <td>


// <strong>

// {req.request_number}

// </strong>


// <br/>


// <span>

// {req.title}

// </span>


// </td>





// <td>

// {req.requester}

// </td>





// <td>

// {req.category}

// </td>





// <td>


// <span

// style={
// priorityStyle(req.priority)
// }

// >

// {req.priority}

// </span>


// </td>





// <td>


// <span

// style={
// statusStyle(req.status)
// }

// >

// {req.status}

// </span>


// </td>





// <td>

// {
// req.created_at?.slice(0,10)
// }

// </td>





// <td>


// <div style={styles.actions}>


// <button

// style={styles.view}

// >

// View

// </button>





// <button

// style={styles.approve}

// onClick={()=>updateStatus(
// req.id,
// "Completed"
// )}

// >

// Approve

// </button>





// <button

// style={styles.reject}

// onClick={()=>updateStatus(
// req.id,
// "Rejected"
// )}

// >

// Reject

// </button>



// </div>


// </td>



// </tr>


// ))


// }



// </tbody>



// </table>



// </div>






// </div>


// </DashboardLayout>


// );


// }









// function priorityStyle(priority){


// if(priority==="Urgent")

// return {

// background:"#fee2e2",
// color:"#b91c1c"

// };


// if(priority==="High")

// return {

// background:"#ffedd5",
// color:"#c2410c"

// };



// return {

// background:"#e0f2fe",
// color:"#0369a1"

// };


// }







// function statusStyle(status){


// if(status==="Completed")

// return {

// background:"#dcfce7",
// color:"#15803d"

// };



// if(status==="Rejected")

// return {

// background:"#fee2e2",
// color:"#b91c1c"

// };



// if(status==="In Progress")

// return {

// background:"#fef3c7",
// color:"#92400e"

// };



// return {

// background:"#dbeafe",
// color:"#1d4ed8"

// };


// }









// const styles={



// page:{


// width:"100%"

// },





// header:{


// display:"flex",

// justifyContent:"space-between",

// marginBottom:"25px"

// },





// title:{


// fontSize:"32px",

// margin:0,

// color:"#0f172a"

// },





// subtitle:{


// color:"#64748b"

// },






// searchBox:{


// marginBottom:"20px"

// },




// search:{


// width:"350px",

// padding:"14px",

// borderRadius:"12px",

// border:"1px solid #cbd5e1",

// fontSize:"15px"

// },






// card:{


// background:"white",

// padding:"25px",

// borderRadius:"20px",

// boxShadow:"0 10px 30px rgba(0,0,0,.08)",

// overflowX:"auto"

// },





// table:{


// width:"100%",

// borderCollapse:"collapse"

// },




// th:{


// textAlign:"left",

// padding:"15px",

// background:"#f8fafc"

// },





// td:{


// padding:"15px",

// borderBottom:"1px solid #eee"

// },






// actions:{


// display:"flex",

// gap:"8px"

// },






// view:{


// padding:"8px 12px",

// border:"none",

// borderRadius:"8px",

// background:"#e2e8f0",

// cursor:"pointer"

// },





// approve:{


// padding:"8px 12px",

// border:"none",

// borderRadius:"8px",

// background:"#16a34a",

// color:"white",

// cursor:"pointer"

// },





// reject:{


// padding:"8px 12px",

// border:"none",

// borderRadius:"8px",

// background:"#dc2626",

// color:"white",

// cursor:"pointer"

// },





// empty:{


// textAlign:"center",

// padding:"30px"

// },




// loading:{


// padding:"50px",

// background:"white",

// borderRadius:"20px",

// textAlign:"center"

// }



// };




// export default DepartmentRequests;
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";

function DepartmentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await API.get("/department-requests");

      setRequests(response.data.requests || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/department-requests/${id}/status`, {
        status,
      });

      loadRequests();
    } catch (error) {
      console.log(error);
      alert("Status update failed");
    }
  };

  const filteredRequests = requests.filter((req) => {
    return (
      req.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      req.request_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      req.requester
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const statistics = useMemo(() => {
    return {
      total: requests.length,

      pending: requests.filter(
        (r) => r.status === "Pending"
      ).length,

      progress: requests.filter(
        (r) => r.status === "In Progress"
      ).length,

      completed: requests.filter(
        (r) => r.status === "Completed"
      ).length,

      rejected: requests.filter(
        (r) => r.status === "Rejected"
      ).length,
    };
  }, [requests]);

  if (loading) {
    return (
      <DashboardLayout>
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>

          <h2>Loading Department Requests...</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={styles.page}>
        {/* HEADER */}

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              📨 Department Request Management
            </h1>

            <p style={styles.subtitle}>
              Review, approve, reject and monitor
              all department work requests.
            </p>
          </div>

          <div style={styles.totalCard}>
            <span style={styles.totalNumber}>
              {statistics.total}
            </span>

            <span style={styles.totalText}>
              Total Requests
            </span>
          </div>
        </div>

        {/* STATISTICS */}

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📄</div>

            <div>
              <h2>{statistics.total}</h2>

              <p>Total</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🟡</div>

            <div>
              <h2>{statistics.pending}</h2>

              <p>Pending</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🟣</div>

            <div>
              <h2>{statistics.progress}</h2>

              <p>In Progress</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>

            <div>
              <h2>{statistics.completed}</h2>

              <p>Completed</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>❌</div>

            <div>
              <h2>{statistics.rejected}</h2>

              <p>Rejected</p>
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div style={styles.toolbar}>
          <input
            placeholder="🔍 Search by request number, title or requester..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.search}
          />
        </div>

        {/* TABLE */}

        <div style={styles.card}>
          <div style={styles.tableHeader}>
            <h2>Request List</h2>

            <span style={styles.countBadge}>
              {filteredRequests.length} Results
            </span>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>
                    Request
                  </th>

                  <th style={styles.th}>
                    Requester
                  </th>

                  <th style={styles.th}>
                    Category
                  </th>

                  <th style={styles.th}>
                    Priority
                  </th>

                  <th style={styles.th}>
                    Status
                  </th>

                  <th style={styles.th}>
                    Date
                  </th>

                  <th style={styles.th}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>                {filteredRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={styles.empty}
                    >
                      <div style={styles.emptyBox}>
                        <div style={styles.emptyIcon}>
                          📭
                        </div>

                        <h3>No Requests Found</h3>

                        <p>
                          No department requests
                          match your search.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr
                      key={req.id}
                      style={styles.row}
                    >
                      <td style={styles.td}>
                        <strong
                          style={styles.requestNo}
                        >
                          {req.request_number}
                        </strong>

                        <br />

                        <span
                          style={styles.requestTitle}
                        >
                          {req.title}
                        </span>
                      </td>

                      <td style={styles.td}>
                        {req.requester}
                      </td>

                      <td style={styles.td}>
                        {req.category}
                      </td>

                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            ...priorityStyle(
                              req.priority
                            ),
                          }}
                        >
                          {req.priority}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            ...statusStyle(
                              req.status
                            ),
                          }}
                        >
                          {req.status}
                        </span>
                      </td>

                      <td style={styles.td}>
                        {new Date(
                          req.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td style={styles.td}>
                        <div
                          style={styles.actions}
                        >
                          <button
                            style={styles.view}
                          >
                            👁 View
                          </button>

                          {req.status !==
                            "Completed" && (
                            <button
                              style={
                                styles.approve
                              }
                              onClick={() =>
                                updateStatus(
                                  req.id,
                                  "Completed"
                                )
                              }
                            >
                              ✓ Approve
                            </button>
                          )}

                          {req.status !==
                            "Rejected" && (
                            <button
                              style={
                                styles.reject
                              }
                              onClick={() =>
                                updateStatus(
                                  req.id,
                                  "Rejected"
                                )
                              }
                            >
                              ✕ Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function priorityStyle(priority) {
  switch (priority) {
    case "Urgent":
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };

    case "High":
      return {
        background: "#ffedd5",
        color: "#c2410c",
      };

    case "Medium":
      return {
        background: "#fef3c7",
        color: "#92400e",
      };

    default:
      return {
        background: "#dbeafe",
        color: "#1d4ed8",
      };
  }
}

function statusStyle(status) {
  switch (status) {
    case "Completed":
      return {
        background: "#dcfce7",
        color: "#15803d",
      };

    case "Rejected":
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };

    case "In Progress":
      return {
        background: "#ede9fe",
        color: "#6d28d9",
      };

    case "Assigned":
      return {
        background: "#dbeafe",
        color: "#1d4ed8",
      };

    default:
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
  }
}
const styles = {
  page: {
    width: "100%",
    padding: "5px 0 25px",
  },

  /* ---------------- HEADER ---------------- */

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    flexWrap: "wrap",
    gap: 20,
  },

  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 700,
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 8,
    color: "#64748b",
    fontSize: 15,
  },

  totalCard: {
    minWidth: 180,
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    borderRadius: 18,
    padding: "18px 26px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 18px 40px rgba(37,99,235,.25)",
  },

  totalNumber: {
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 1,
  },

  totalText: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.95,
  },

  /* ---------------- STATS ---------------- */

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: 20,
    marginBottom: 30,
  },

  statCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 22,
    display: "flex",
    alignItems: "center",
    gap: 18,
    boxShadow: "0 12px 30px rgba(15,23,42,.08)",
    transition: "0.25s",
  },

  statIcon: {
    width: 58,
    height: 58,
    borderRadius: "50%",
    background: "#eff6ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28,
    flexShrink: 0,
  },

  /* ---------------- TOOLBAR ---------------- */

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginBottom: 24,
    flexWrap: "wrap",
  },

  search: {
    width: 360,
    maxWidth: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid #dbe3ef",
    outline: "none",
    fontSize: 15,
    background: "#fff",
    transition: ".25s",
    boxSizing: "border-box",
  },

  /* ---------------- CARD ---------------- */

  card: {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 15px 40px rgba(15,23,42,.08)",
    overflow: "hidden",
  },

  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 28px",
    borderBottom: "1px solid #eef2f7",
  },

  countBadge: {
    background: "#2563eb",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
  },

  tableWrapper: {
    overflowX: "auto",
  },
    /* ---------------- TABLE ---------------- */

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 1050,
  },

  th: {
    background: "#f8fafc",
    color: "#475569",
    textAlign: "left",
    padding: "16px 20px",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: ".5px",
    borderBottom: "1px solid #e2e8f0",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "18px 20px",
    borderBottom: "1px solid #edf2f7",
    verticalAlign: "middle",
    color: "#334155",
    fontSize: 14,
  },

  requestNumber: {
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 4,
    display: "block",
  },

  requestTitle: {
    color: "#64748b",
    fontSize: 13,
  },

  /* ---------------- BADGES ---------------- */

  badge: {
    display: "inline-block",
    padding: "7px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  priorityBadge: {
    display: "inline-block",
    padding: "7px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  /* ---------------- ACTIONS ---------------- */

  actions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },

  view: {
    padding: "8px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    background: "#fff",
    color: "#334155",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: ".25s",
  },

  approve: {
    padding: "8px 14px",
    border: "none",
    borderRadius: 10,
    background: "#16a34a",
    color: "#fff",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: ".25s",
  },

  reject: {
    padding: "8px 14px",
    border: "none",
    borderRadius: 10,
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: ".25s",
  },

  /* ---------------- EMPTY ---------------- */

  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#64748b",
    fontSize: 15,
  },

  /* ---------------- LOADING ---------------- */

  loading: {
    background: "#fff",
    borderRadius: 20,
    padding: "80px 30px",
    textAlign: "center",
    fontSize: 18,
    color: "#475569",
    boxShadow: "0 12px 30px rgba(15,23,42,.08)",
  },
};
export default DepartmentRequests;