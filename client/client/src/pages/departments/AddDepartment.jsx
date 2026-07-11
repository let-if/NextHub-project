import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createDepartment } from "../../services/departmentService";

function AddDepartment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    department_name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.department_name.trim()) {
      setSuccess(false);
      setMessage("Department name is required.");
      return;
    }

    try {
      setLoading(true);

      const result = await createDepartment(form);

      setSuccess(true);

      setMessage(result.message);

      setTimeout(() => {
        navigate("/departments");
      }, 1200);
    } catch (error) {
      setSuccess(false);

      setMessage(
        error.response?.data?.message ||
          "Failed to create department."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={styles.page}>

        <div style={styles.header}>

          <div>

            <h1 style={styles.title}>
              Add Department
            </h1>

            <p style={styles.subtitle}>
              Create a new department for your organization.
            </p>

          </div>

          <Link
            to="/departments"
            style={styles.backButton}
          >
            ← Back
          </Link>

        </div>

        <div style={styles.card}>

          <div style={styles.icon}>
            🏢
          </div>

          <h2 style={styles.cardTitle}>
            Department Information
          </h2>

          <p style={styles.cardSubtitle}>
            Fill in the information below.
          </p>

          {message && (
            <div
              style={{
                ...styles.alert,
                background: success
                  ? "#dcfce7"
                  : "#fee2e2",
                color: success
                  ? "#166534"
                  : "#b91c1c",
                border: success
                  ? "1px solid #86efac"
                  : "1px solid #fca5a5",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label style={styles.label}>
              Department Name
            </label>

            <input
              type="text"
              name="department_name"
              placeholder="Example: Information Technology"
              value={form.department_name}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>
              Description
            </label>

            <textarea
              name="description"
              rows={6}
              placeholder="Enter department description..."
              value={form.description}
              onChange={handleChange}
              style={styles.textarea}
            />
                        <div style={styles.buttonGroup}>

              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => navigate("/departments")}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.saveButton,
                  opacity: loading ? 0.8 : 1,
                }}
              >
                {
                  loading
                    ? "Creating Department..."
                    : "Create Department"
                }
              </button>

            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

const styles = {

  page: {
    width: "100%",
    padding: "10px 0 30px",
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
    fontWeight: "700",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "8px",
    color: "#64748b",
    fontSize: "15px",
  },

  backButton: {
    background: "#e2e8f0",
    color: "#0f172a",
    textDecoration: "none",
    padding: "12px 22px",
    borderRadius: "12px",
    fontWeight: "600",
  },

  card: {
    maxWidth: "760px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 18px 45px rgba(15,23,42,.08)",
  },

  icon: {
    width: "90px",
    height: "90px",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "42px",
    color: "#fff",
    marginBottom: "20px",
  },

  cardTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: "28px",
    fontWeight: "700",
  },

  cardSubtitle: {
    marginTop: "8px",
    color: "#64748b",
    marginBottom: "30px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "18px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    resize: "vertical",
    fontSize: "15px",
    boxSizing: "border-box",
    minHeight: "150px",
  },

  alert: {
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontWeight: "500",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "35px",
    flexWrap: "wrap",
  },

  cancelButton: {
    padding: "14px 24px",
    borderRadius: "12px",
    border: "none",
    background: "#e2e8f0",
    color: "#0f172a",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },

  saveButton: {
    padding: "14px 26px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    boxShadow: "0 12px 25px rgba(37,99,235,.30)",
  },

};

export default AddDepartment;