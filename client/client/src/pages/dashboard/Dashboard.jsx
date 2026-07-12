
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
                  <div style={styles.activityList}>
                    {dashboard.activities.map(
                      (activity, index) => (
                        <div
                          key={index}
                          style={styles.activityCard}
                        >
                          <div
                            style={styles.activityDot}
                          />

                          <div
                            style={
                              styles.activityContent
                            }
                          >
                            <strong>
                              {activity.action}
                            </strong>

                            <p>
                              {activity.created_at}
                            </p>
                          </div>
                        </div>
                      )
                    )}
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
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8,#1e3a8a)",
    borderRadius: 24,
    padding: "40px",
    color: "#fff",
    marginBottom: 35,
    boxShadow:
      "0 20px 45px rgba(37,99,235,.28)",
    flexWrap: "wrap",
    gap: 20,
  },

  welcomeBadge: {
    display: "inline-block",
    padding: "8px 18px",
    background: "rgba(255,255,255,.15)",
    borderRadius: 999,
    fontSize: 14,
    marginBottom: 16,
    fontWeight: 600,
  },

  heroTitle: {
    margin: 0,
    fontSize: 38,
    fontWeight: 800,
    letterSpacing: ".5px",
  },

  heroSubtitle: {
    marginTop: 12,
    color: "#dbeafe",
    fontSize: 16,
  },

  heroCircle: {
    width: 95,
    height: 95,
    borderRadius: "50%",
    background: "rgba(255,255,255,.18)",
    border: "4px solid rgba(255,255,255,.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    fontWeight: 700,
  },
    loadingCard: {
    background: "#ffffff",
    borderRadius: 24,
    padding: "70px 40px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(15,23,42,.08)",
  },

  loadingIcon: {
    fontSize: 56,
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: 24,
    marginBottom: 35,
  },

  card: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "28px",
    boxShadow: "0 12px 35px rgba(15,23,42,.08)",
    transition: "all .3s ease",
    cursor: "pointer",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: 18,
  },

  cardIcon: {
    width: 65,
    height: 65,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 30,
    flexShrink: 0,
  },

  cardLabel: {
    color: "#64748b",
    fontSize: 15,
    marginBottom: 8,
    fontWeight: 600,
  },

  cardValue: {
    fontSize: 38,
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1,
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 24,
    alignItems: "stretch",
  },

  panel: {
    background: "#ffffff",
    borderRadius: 22,
    padding: 28,
    boxShadow: "0 12px 35px rgba(15,23,42,.08)",
    display: "flex",
    flexDirection: "column",
    minHeight: 470,
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  panelTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: "#0f172a",
  },

  panelBadge: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
  },

  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 18,
    marginTop: 5,
  },

  actionCard: {
    textDecoration: "none",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: "24px",
    color: "#0f172a",
    transition: ".25s",
  },

  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28,
    marginBottom: 18,
  },

  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    overflowY: "auto",
    flex: 1,
    paddingRight: 5,
  },

  activityCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    padding: "18px",
    background: "#f8fafc",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
  },

  activityDot: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: "#2563eb",
    marginTop: 8,
    flexShrink: 0,
  },

  activityContent: {
    flex: 1,
  },

  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#64748b",
  },

  emptyIcon: {
    fontSize: 70,
    marginBottom: 18,
  },

};

export default Dashboard;