// import { useEffect, useState } from "react";
// import { getMyRequests } from "../../services/requestService";

// function MyRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadRequests();
//   }, []);

//   const loadRequests = async () => {
//     try {
//       const result = await getMyRequests();
//       setRequests(result.requests);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return "#16a34a";
//       case "Pending":
//         return "#f59e0b";
//       case "Assigned":
//         return "#2563eb";
//       case "In Progress":
//         return "#9333ea";
//       case "Rejected":
//         return "#dc2626";
//       default:
//         return "#64748b";
//     }
//   };

//   if (loading) {
//     return (
//       <div style={styles.loading}>
//         Loading requests...
//       </div>
//     );
//   }

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>

//         <h1>My Work Requests</h1>

//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Request No</th>
//               <th>Title</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Department</th>
//               <th>Created</th>
//             </tr>
//           </thead>

//           <tbody>

//             {requests.length === 0 ? (
//               <tr>
//                 <td colSpan="6">
//                   No requests found.
//                 </td>
//               </tr>
//             ) : (
//               requests.map((request) => (
//                 <tr key={request.id}>
//                   <td>{request.request_number}</td>
//                   <td>{request.title}</td>
//                   <td>{request.priority}</td>

//                   <td>
//                     <span
//                       style={{
//                         background: statusColor(request.status),
//                         color: "#fff",
//                         padding: "6px 10px",
//                         borderRadius: "20px",
//                         fontSize: "12px",
//                       }}
//                     >
//                       {request.status}
//                     </span>
//                   </td>

//                   <td>
//                     {request.department_name || "-"}
//                   </td>

//                   <td>
//                     {new Date(
//                       request.created_at
//                     ).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))
//             )}

//           </tbody>
//         </table>

//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     padding: "40px",
//     background: "#f8fafc",
//     minHeight: "100vh",
//   },

//   card: {
//     background: "#fff",
//     borderRadius: "12px",
//     padding: "25px",
//     boxShadow: "0 10px 25px rgba(0,0,0,.08)",
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//   },

//   loading: {
//     padding: "50px",
//     textAlign: "center",
//   },
// };

// export default MyRequests;
import { useEffect, useMemo, useState } from "react";
import { getMyRequests } from "../../services/requestService";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const result = await getMyRequests();
      setRequests(result.requests || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#16a34a";

      case "Pending":
        return "#f59e0b";

      case "Assigned":
        return "#2563eb";

      case "In Progress":
        return "#9333ea";

      case "Rejected":
        return "#dc2626";

      default:
        return "#64748b";
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "#dc2626";

      case "High":
        return "#ea580c";

      case "Medium":
        return "#2563eb";

      case "Low":
        return "#16a34a";

      default:
        return "#64748b";
    }
  };

  const stats = useMemo(() => {
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
    };
  }, [requests]);

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loader}></div>

        <h2 style={styles.loadingText}>
          Loading your requests...
        </h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            📋 My Work Requests
          </h1>

          <p style={styles.subtitle}>
            View and track all your submitted work
            requests.
          </p>
        </div>

        <div style={styles.totalBadge}>
          {stats.total} Requests
        </div>
      </div>

      {/* STATISTICS */}

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📄</div>

          <div>
            <div style={styles.statNumber}>
              {stats.total}
            </div>

            <div style={styles.statLabel}>
              Total Requests
            </div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>🟡</div>

          <div>
            <div style={styles.statNumber}>
              {stats.pending}
            </div>

            <div style={styles.statLabel}>
              Pending
            </div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>🟣</div>

          <div>
            <div style={styles.statNumber}>
              {stats.progress}
            </div>

            <div style={styles.statLabel}>
              In Progress
            </div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>

          <div>
            <div style={styles.statNumber}>
              {stats.completed}
            </div>

            <div style={styles.statLabel}>
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>
            Request History
          </h2>

          <span style={styles.cardCount}>
            {requests.length} records
          </span>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Request No</th>

                <th style={styles.th}>Title</th>

                <th style={styles.th}>Priority</th>

                <th style={styles.th}>Status</th>

                <th style={styles.th}>Department</th>

                <th style={styles.th}>Created</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={styles.empty}
                  >
                    <div style={styles.emptyIcon}>
                      📭
                    </div>

                    <h3>No Requests Found</h3>

                    <p>
                      You haven't submitted any work
                      requests yet.
                    </p>
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr
                    key={request.id}
                    style={styles.row}
                  >
                    <td style={styles.tdCode}>
                      {request.request_number}
                    </td>

                    <td style={styles.td}>
                      <strong>
                        {request.title}
                      </strong>
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.priorityBadge,
                          background:
                            priorityColor(
                              request.priority
                            ),
                        }}
                      >
                        {request.priority}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          background:
                            statusColor(
                              request.status
                            ),
                        }}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {request.department_name ||
                        "-"}
                    </td>

                    <td style={styles.td}>
                      {new Date(
                        request.created_at
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
const styles = {
  page: {
    padding: "32px",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  /* Loading */

  loadingPage: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
  },

  loader: {
    width: "60px",
    height: "60px",
    border: "6px solid #e2e8f0",
    borderTop: "6px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    margin: 0,
    color: "#475569",
    fontWeight: 600,
  },

  /* Header */

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "20px",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    fontWeight: 700,
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: 0,
    color: "#64748b",
    fontSize: "15px",
  },

  totalBadge: {
    background: "#2563eb",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: "30px",
    fontWeight: 700,
    fontSize: "15px",
    boxShadow: "0 12px 28px rgba(37,99,235,.25)",
  },

  /* Stats */

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "22px",
    marginBottom: "32px",
  },

  statCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow: "0 10px 30px rgba(15,23,42,.07)",
    border: "1px solid #eef2f7",
  },

  statIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "#eff6ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
  },

  statNumber: {
    fontSize: "30px",
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1,
  },

  statLabel: {
    marginTop: "8px",
    color: "#64748b",
    fontSize: "14px",
  },

  /* Card */

  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "26px",
    boxShadow: "0 10px 30px rgba(15,23,42,.08)",
    border: "1px solid #eef2f7",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "24px",
    color: "#0f172a",
  },

  cardCount: {
    background: "#f1f5f9",
    color: "#475569",
    padding: "8px 18px",
    borderRadius: "20px",
    fontWeight: 600,
    fontSize: "14px",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "950px",
  },

  th: {
    background: "#f8fafc",
    color: "#475569",
    textAlign: "left",
    padding: "18px",
    fontWeight: 700,
    fontSize: "14px",
    borderBottom: "2px solid #e2e8f0",
    whiteSpace: "nowrap",
  },

  row: {
    transition: ".25s",
  },

  td: {
    padding: "18px",
    borderBottom: "1px solid #eef2f7",
    color: "#334155",
    fontSize: "15px",
  },

  tdCode: {
    padding: "18px",
    borderBottom: "1px solid #eef2f7",
    fontWeight: 700,
    color: "#2563eb",
    whiteSpace: "nowrap",
  },

  statusBadge: {
    color: "#fff",
    padding: "7px 16px",
    borderRadius: "30px",
    fontWeight: 600,
    fontSize: "12px",
    display: "inline-block",
    minWidth: "105px",
    textAlign: "center",
  },

  priorityBadge: {
    color: "#fff",
    padding: "7px 14px",
    borderRadius: "30px",
    fontWeight: 600,
    fontSize: "12px",
    display: "inline-block",
    minWidth: "70px",
    textAlign: "center",
  },

  empty: {
    padding: "70px 20px",
    textAlign: "center",
    color: "#64748b",
  },

  emptyIcon: {
    fontSize: "70px",
    marginBottom: "15px",
  },
};
export default MyRequests;
