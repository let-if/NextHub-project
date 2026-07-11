import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";

import {
  getDepartments,
  deleteDepartment,
} from "../../services/departmentService";

function Departments() {

  const [departments, setDepartments] = useState([]);

  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");



  useEffect(() => {

    loadDepartments();

  }, []);




  useEffect(() => {

    const keyword = search.toLowerCase();

    setFilteredDepartments(

      departments.filter((department) =>

        department.department_name
          ?.toLowerCase()
          .includes(keyword)

        ||

        department.description
          ?.toLowerCase()
          .includes(keyword)

      )

    );

  }, [search, departments]);






  const loadDepartments = async () => {

    try {

      setLoading(true);

      const data = await getDepartments();

      setDepartments(data.departments || []);

      setFilteredDepartments(data.departments || []);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };







  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this department?"

    );

    if (!confirmDelete) return;

    try {

      await deleteDepartment(id);

      loadDepartments();

    }

    catch (error) {

      console.log(error);

    }

  };








  return (

    <DashboardLayout>

      <div style={styles.page}>





        {/* ================= HEADER ================= */}

        <div style={styles.header}>

          <div>

            <h1 style={styles.title}>

              Department Management

            </h1>

            <p style={styles.subtitle}>

              Organize and manage all company departments

            </p>

          </div>



          <Link

            to="/departments/add"

            style={styles.addButton}

          >

            ➕ Add Department

          </Link>

        </div>







        {/* ================= STATISTICS ================= */}

        <div style={styles.cards}>


          <StatCard

            title="Departments"

            value={departments.length}

            icon="🏢"

          />


          <StatCard

            title="Active"

            value={departments.length}

            icon="🟢"

          />


          <StatCard

            title="Company Units"

            value={departments.length}

            icon="🏛️"

          />


          <StatCard

            title="Organization"

            value="100%"

            icon="📊"

          />


        </div>








        {/* ================= SEARCH ================= */}

        <div style={styles.searchCard}>

          <input

            type="text"

            placeholder="🔍 Search department..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            style={styles.searchInput}

          />

        </div>







        {/* ================= CONTENT ================= */}

        {

          loading ?

          (

            <div style={styles.loading}>

              Loading departments...

            </div>

          )

          :

          filteredDepartments.length === 0 ?

          (

            <div style={styles.empty}>


              <div style={styles.emptyIcon}>

                🏢

              </div>


              <h2>

                No Departments Found

              </h2>


              <p>

                Create your first department to get started.

              </p>


              <Link

                to="/departments/add"

                style={styles.addButton}

              >

                Add Department

              </Link>

            </div>

          )

          :

          (

            <div style={styles.grid}>

              {

                filteredDepartments.map((department) => (

                  <div

                    key={department.id}

                    style={styles.departmentCard}

                  >

                    <div style={styles.iconBox}>

                      🏢
                    </div>

                    <div style={styles.departmentBody}>

                      <h2 style={styles.departmentName}>

                        {department.department_name}

                      </h2>

                      <p style={styles.description}>

                        {

                          department.description ||

                          "No description available."

                        }

                      </p>

                      <div style={styles.meta}>

                        <span>

                          📅 Created

                        </span>

                        <strong>

                          {

                            department.created_at

                              ?.slice(0, 10)

                          }

                        </strong>

                      </div>

                      {/* <div style={styles.actions}>                        <Link
                          to={`/departments/${department.id}`}
                          style={styles.viewButton}
                        >
                          👁 View
                        </Link>

                        <Link
                          to={`/departments/edit/${department.id}`}
                          style={styles.editButton}
                        >
                          ✏ Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(department.id)}
                          style={styles.deleteButton}
                        >
                          🗑 Delete
                        </button>

                      </div> */}
                      <div style={styles.actions}>

  <Link
    to={`/departments/${department.id}`}
    style={styles.view}
  >
    👁 View
  </Link>


  <Link
    to={`/departments/edit/${department.id}`}
    style={styles.edit}
  >
    ✏ Edit
  </Link>


  <button
    onClick={() => handleDelete(department.id)}
    style={styles.delete}
  >
    🗑 Delete
  </button>

</div>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}





function StatCard({

  title,

  value,

  icon

}) {

  return (

    <div style={styles.statCard}>

      <div style={styles.statIcon}>

        {icon}

      </div>

      <div>

        <p style={styles.statTitle}>

          {title}

        </p>

        <h2 style={styles.statValue}>

          {value}

        </h2>

      </div>

    </div>

  );

}
const styles = {

  page: {

    width: "100%",

    minHeight: "100vh"

  },



  header: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "20px",

    marginBottom: "35px"

  },



  title: {

    margin: 0,

    fontSize: "34px",

    color: "#0f172a",

    fontWeight: "700"

  },



  subtitle: {

    marginTop: "8px",

    color: "#64748b",

    fontSize: "16px"

  },



  addButton: {

    background: "#2563eb",

    color: "#ffffff",

    textDecoration: "none",

    padding: "14px 24px",

    borderRadius: "12px",

    fontWeight: "600",

    boxShadow: "0 10px 25px rgba(37,99,235,.25)",

    transition: ".3s"

  },



  cards: {

    display: "grid",

    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",

    gap: "22px",

    marginBottom: "30px"

  },



  statCard: {

    background: "#ffffff",

    borderRadius: "22px",

    padding: "22px",

    display: "flex",

    alignItems: "center",

    gap: "18px",

    boxShadow: "0 15px 35px rgba(0,0,0,.08)"

  },



  statIcon: {

    width: "65px",

    height: "65px",

    borderRadius: "18px",

    background: "#eff6ff",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "32px"

  },



  statTitle: {

    margin: 0,

    color: "#64748b",

    fontSize: "14px"

  },



  statValue: {

    margin: "6px 0 0",

    color: "#0f172a",

    fontSize: "30px",

    fontWeight: "700"

  },



  searchCard: {

    background: "#ffffff",

    borderRadius: "20px",

    padding: "22px",

    marginBottom: "30px",

    boxShadow: "0 10px 30px rgba(0,0,0,.08)"

  },



  searchInput: {

    width: "100%",

    padding: "15px 18px",

    border: "1px solid #dbe2ea",

    borderRadius: "12px",

    outline: "none",

    fontSize: "15px",

    boxSizing: "border-box"

  },



  grid: {

    display: "grid",

    gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))",

    gap: "28px"

  },



  departmentCard: {

    background: "#ffffff",

    borderRadius: "24px",

    overflow: "hidden",

    boxShadow: "0 15px 35px rgba(0,0,0,.08)",

    transition: ".3s"

  },



  iconBox: {

    height: "130px",

    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "65px",

    color: "#ffffff"

  },



  departmentBody: {

    padding: "24px"

  },



  departmentName: {

    margin: 0,

    color: "#0f172a",

    fontSize: "24px",

    fontWeight: "700"

  },



  description: {

    color: "#64748b",

    lineHeight: "1.7",

    marginTop: "12px",

    minHeight: "60px"

  },



  meta: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: "18px",

    paddingTop: "18px",

    borderTop: "1px solid #e2e8f0",

    color: "#475569",

    fontSize: "14px"

  },



  actions: {

    display: "flex",

    justifyContent: "space-between",

    gap: "12px",

    marginTop: "22px"

  },
  page: {
    width: "100%",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    color: "#0f172a",
    fontWeight: "700",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "8px",
    fontSize: "15px",
  },

  addButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    boxShadow: "0 10px 25px rgba(37,99,235,.25)",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 12px 30px rgba(15,23,42,.08)",
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  statIcon: {
    fontSize: "38px",
  },

  statTitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  statValue: {
    margin: "5px 0 0",
    color: "#0f172a",
    fontSize: "30px",
    fontWeight: "700",
  },

  searchCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 10px 25px rgba(15,23,42,.08)",
  },

  input: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "22px",
    padding: "24px",
    boxShadow: "0 15px 35px rgba(15,23,42,.08)",
    transition: ".3s",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "18px",
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: "24px",
  },

  deptName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "21px",
    fontWeight: "700",
  },

  badge: {
    display: "inline-block",
    marginTop: "8px",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: "600",
    fontSize: "13px",
  },

  description: {
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "25px",
    minHeight: "55px",
  },

  actions: {
    display: "flex",
    gap: "12px",
  },

  edit: {
    flex: 1,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  delete: {
    flex: 1,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  empty: {
    background: "#fff",
    borderRadius: "20px",
    padding: "80px 30px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(15,23,42,.08)",
  },

  emptyIcon: {
    fontSize: "70px",
    marginBottom: "15px",
  },

  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modalCard: {
    width: "100%",
    maxWidth: "550px",
    background: "#fff",
    borderRadius: "22px",
    padding: "30px",
    boxShadow: "0 20px 40px rgba(0,0,0,.15)",
  },

  modalTitle: {
    marginTop: 0,
    marginBottom: "20px",
    color: "#0f172a",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "15px",
  },

  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "25px",
  },

  cancel: {
    background: "#e2e8f0",
    color: "#334155",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  save: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Departments;
