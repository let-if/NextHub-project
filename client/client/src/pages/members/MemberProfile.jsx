

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";

function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMember();
  }, []);

  const loadMember = async () => {
    try {
      const res = await API.get(`/members/${id}`);

      setMember(res.data.member);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/members/${id}`);

      alert("Employee deleted successfully");

      navigate("/members");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>

          <h2 style={styles.loadingTitle}>
            Loading Employee Profile
          </h2>

          <p style={styles.loadingText}>
            Please wait while we retrieve employee information...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!member) {
    return (
      <DashboardLayout>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>⚠</div>

          <h2 style={styles.errorTitle}>
            Employee Not Found
          </h2>

          <p style={styles.errorText}>
            The employee you are looking for doesn't exist or may have been removed.
          </p>

          <button
            style={styles.backButton}
            onClick={() => navigate("/members")}
          >
            ← Back to Members
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const imageURL = member.profile_image
    ? `http://localhost:5000/uploads/${member.profile_image}`
    : null;

  return (
    <DashboardLayout>
      <div style={styles.page}>
        <button
          style={styles.backButton}
          onClick={() => navigate("/members")}
        >
          ← Back To Members
        </button>

        <div style={styles.profileCard}>
          <div style={styles.cover}>
            <div style={styles.coverOverlay}></div>

            <div style={styles.coverContent}>
              <div>
                <span style={styles.coverBadge}>
                  Employee Profile
                </span>

                <h1 style={styles.coverTitle}>
                  Employee Information
                </h1>

                <p style={styles.coverSubtitle}>
                  Complete employee details, department information,
                  account status and profile overview.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.profileHeader}>
            <div style={styles.avatarWrapper}>
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="employee"
                  style={styles.photo}
                />
              ) : (
                <div style={styles.avatar}>
                  {member.first_name?.charAt(0)}
                  {member.last_name?.charAt(0)}
                </div>
              )}
            </div>

            <div style={styles.identity}>
              <div style={styles.nameRow}>
                <h2 style={styles.name}>
                  {member.first_name} {member.last_name}
                </h2>

                <span
                  style={
                    member.status === "Active"
                      ? styles.statusActive
                      : styles.statusInactive
                  }
                >
                  ● {member.status}
                </span>
              </div>

              <p style={styles.employeeId}>
                Employee ID :
                <strong> {member.employee_id}</strong>
              </p>

              <div style={styles.badges}>
                <span style={styles.roleBadge}>
                  👔 {member.role_name || "No Role"}
                </span>

                <span style={styles.departmentBadge}>
                  🏢 {member.department_name || "No Department"}
                </span>
              </div>
            </div>
          </div>
                    </div>


          <div style={styles.divider}></div>


          <div style={styles.contentSection}>


            <div style={styles.sectionHeader}>

              <h2 style={styles.sectionTitle}>
                Employee Information
              </h2>


              <p style={styles.sectionDescription}>
                Personal details and employment information
              </p>

            </div>




            <div style={styles.infoGrid}>


              <Info
                icon="📧"
                title="Email Address"
                value={member.email}
              />



              <Info
                icon="📱"
                title="Phone Number"
                value={member.phone || "Not Provided"}
              />



              <Info
                icon="🏢"
                title="Department"
                value={
                  member.department_name || "No Department"
                }
              />



              <Info
                icon="👔"
                title="Position / Role"
                value={
                  member.role_name || "No Role"
                }
              />



              <Info
                icon="📅"
                title="Joined Date"
                value={
                  member.created_at
                    ? new Date(
                        member.created_at
                      ).toLocaleDateString()
                    : "N/A"
                }
              />



              <Info
                icon="🆔"
                title="Employee Number"
                value={
                  member.employee_id || "N/A"
                }
              />


            </div>


          </div>





          <div style={styles.summarySection}>


            <div style={styles.summaryCard}>


              <div style={styles.summaryIcon}>
                👤
              </div>


              <div>

                <h3>
                  Account Status
                </h3>


                <p>
                  {member.status}
                </p>

              </div>


            </div>





            <div style={styles.summaryCard}>


              <div style={styles.summaryIcon}>
                🏢
              </div>


              <div>

                <h3>
                  Department
                </h3>


                <p>
                  {
                    member.department_name ||
                    "Not Assigned"
                  }
                </p>

              </div>


            </div>





            <div style={styles.summaryCard}>


              <div style={styles.summaryIcon}>
                ⭐
              </div>


              <div>

                <h3>
                  Role
                </h3>


                <p>
                  {
                    member.role_name ||
                    "Not Assigned"
                  }
                </p>

              </div>


            </div>


          </div>





          <div style={styles.actionSection}>


            <button

              style={styles.editButton}

              onClick={()=>navigate(
                `/members/edit/${member.id}`
              )}

            >

              ✏ Edit Employee

            </button>





            <button

              style={styles.deleteButton}

              onClick={deleteEmployee}

            >

              🗑 Delete Employee

            </button>

          </div>

        </div>

      

    </DashboardLayout>
  );


}






function Info({icon,title,value}){


  return(


    <div style={styles.infoCard}>


      <div style={styles.infoIcon}>

        {icon}

      </div>



      <div style={styles.infoContent}>


        <h4>

          {title}

        </h4>



        <p>

          {value}

        </p>


      </div>


    </div>


  );


}
const styles = {


  page: {

    maxWidth: "1200px",

    margin: "0 auto",

    padding: "25px",

  },




  loadingContainer: {

    minHeight: "400px",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",

    background: "#ffffff",

    borderRadius: "20px",

    boxShadow:
      "0 10px 35px rgba(0,0,0,0.08)",

    padding: "50px",

  },




  loader: {

    width: "55px",

    height: "55px",

    borderRadius: "50%",

    border:
      "5px solid #e2e8f0",

    borderTop:
      "5px solid #2563eb",

    animation:
      "spin 1s linear infinite",

    marginBottom: "20px",

  },




  loadingTitle: {

    fontSize: "24px",

    color: "#0f172a",

    marginBottom: "8px",

  },




  loadingText: {

    color: "#64748b",

    fontSize: "15px",

  },





  errorCard: {

    background: "#ffffff",

    padding: "50px",

    borderRadius: "22px",

    textAlign: "center",

    boxShadow:
      "0 15px 40px rgba(0,0,0,0.08)",

  },





  errorIcon: {

    fontSize: "50px",

    marginBottom: "15px",

  },





  errorTitle: {

    color: "#991b1b",

    fontSize: "26px",

    marginBottom: "10px",

  },





  errorText: {

    color: "#64748b",

    marginBottom: "25px",

  },





  backButton: {

    background:
      "linear-gradient(135deg,#334155,#475569)",

    color: "#ffffff",

    border: "none",

    padding: "13px 25px",

    borderRadius: "12px",

    cursor: "pointer",

    fontWeight: "600",

    fontSize: "15px",

    transition: "0.3s",

  },






  profileCard: {

    background: "#ffffff",

    borderRadius: "28px",

    overflow: "hidden",

    boxShadow:
      "0 20px 55px rgba(15,23,42,0.12)",

  },





  cover: {

    height: "230px",

    position: "relative",

    background:
      "linear-gradient(135deg,#1e3a8a,#2563eb,#38bdf8)",

    overflow: "hidden",

  },





  coverOverlay: {

    position: "absolute",

    inset: 0,

    background:
      "linear-gradient(90deg,rgba(15,23,42,.65),rgba(37,99,235,.2))",

  },





  coverContent: {

    position: "relative",

    zIndex: 2,

    height: "100%",

    display: "flex",

    alignItems: "center",

    padding: "40px",

    color: "white",

  },





  coverBadge: {

    display: "inline-block",

    background:
      "rgba(255,255,255,.2)",

    backdropFilter:
      "blur(8px)",

    padding: "8px 18px",

    borderRadius: "30px",

    fontSize: "13px",

    fontWeight: "600",

    marginBottom: "15px",

  },





  coverTitle: {

    fontSize: "36px",

    margin: "0 0 10px",

    fontWeight: "700",

  },





  coverSubtitle: {

    maxWidth: "600px",

    lineHeight: "1.6",

    opacity: "0.9",

    fontSize: "15px",

  },





  profileHeader: {

    display: "flex",

    alignItems: "center",

    gap: "35px",

    padding: "0 40px 35px",

    marginTop: "-75px",

    position: "relative",

    flexWrap: "wrap",

  },





  avatarWrapper: {

    position: "relative",

    zIndex: 3,

  },





  photo: {

    width: "160px",

    height: "160px",

    borderRadius: "50%",

    objectFit: "cover",

    border:
      "7px solid white",

    boxShadow:
      "0 10px 30px rgba(0,0,0,.2)",

  },





  avatar: {

    width: "160px",

    height: "160px",

    borderRadius: "50%",

    background:
      "linear-gradient(135deg,#0f172a,#334155)",

    color: "white",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "48px",

    fontWeight: "700",

    border:
      "7px solid white",

    boxShadow:
      "0 10px 30px rgba(0,0,0,.2)",

  },
    
  identity: {

    flex: 1,

    minWidth: "280px",

  },




  nameRow: {

    display: "flex",

    alignItems: "center",

    gap: "15px",

    flexWrap: "wrap",

    marginBottom: "10px",

  },




  name: {

    fontSize: "32px",

    color: "#0f172a",

    margin: 0,

    fontWeight: "750",

  },




  employeeId: {

    color: "#64748b",

    fontSize: "15px",

    marginBottom: "18px",

  },




  badges: {

    display: "flex",

    gap: "12px",

    flexWrap: "wrap",

  },





  roleBadge: {

    background: "#dbeafe",

    color: "#1d4ed8",

    padding: "9px 18px",

    borderRadius: "25px",

    fontSize: "14px",

    fontWeight: "600",

  },





  departmentBadge: {

    background: "#ede9fe",

    color: "#6d28d9",

    padding: "9px 18px",

    borderRadius: "25px",

    fontSize: "14px",

    fontWeight: "600",

  },





  statusActive: {

    background: "#dcfce7",

    color: "#15803d",

    padding: "8px 16px",

    borderRadius: "25px",

    fontSize: "14px",

    fontWeight: "700",

  },





  statusInactive: {

    background: "#fee2e2",

    color: "#b91c1c",

    padding: "8px 16px",

    borderRadius: "25px",

    fontSize: "14px",

    fontWeight: "700",

  },






  divider: {

    height: "1px",

    background: "#e2e8f0",

    margin: "0 40px",

  },





  contentSection: {

    padding: "35px 40px",

  },





  sectionHeader: {

    marginBottom: "25px",

  },





  sectionTitle: {

    margin: 0,

    fontSize: "25px",

    color: "#0f172a",

  },





  sectionDescription: {

    color: "#64748b",

    marginTop: "8px",

    fontSize: "14px",

  },





  infoGrid: {

    display: "grid",

    gridTemplateColumns:

      "repeat(auto-fit,minmax(280px,1fr))",

    gap: "22px",

  },






  infoCard: {

    background: "#f8fafc",

    border: "1px solid #e2e8f0",

    borderRadius: "18px",

    padding: "22px",

    display: "flex",

    alignItems: "center",

    gap: "18px",

    transition: "0.3s",

  },






  infoIcon: {

    width: "52px",

    height: "52px",

    borderRadius: "15px",

    background: "#ffffff",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "25px",

    boxShadow:
      "0 5px 15px rgba(0,0,0,.08)",

  },





  infoContent: {

    overflow: "hidden",

  },





  infoContent_h4: {

    margin: 0,

  },





  summarySection: {

    display: "grid",

    gridTemplateColumns:

      "repeat(auto-fit,minmax(250px,1fr))",

    gap: "20px",

    padding:

      "0 40px 35px",

  },






  summaryCard: {

    background:
      "linear-gradient(135deg,#f8fafc,#ffffff)",

    border:

      "1px solid #e2e8f0",

    padding: "22px",

    borderRadius: "20px",

    display: "flex",

    alignItems: "center",

    gap: "18px",

  },





  summaryIcon: {

    width: "55px",

    height: "55px",

    borderRadius: "16px",

    background: "#eff6ff",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "25px",

  },





  actionSection: {

    padding:

      "25px 40px 40px",

    display: "flex",

    gap: "15px",

    flexWrap: "wrap",

  },






  editButton: {

    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",

    color: "white",

    border: "none",

    padding: "15px 30px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "15px",

    boxShadow:
      "0 8px 20px rgba(37,99,235,.25)",

  },






  deleteButton: {

    background:
      "linear-gradient(135deg,#dc2626,#b91c1c)",

    color: "white",

    border: "none",

    padding: "15px 30px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "15px",

    boxShadow:
      "0 8px 20px rgba(220,38,38,.25)",

  }


};





export default MemberProfile;