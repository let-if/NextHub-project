
const db = require("../config/db");

const getDashboard = (req, res) => {
  const statistics = {};

  // =========================
  // TOTAL MEMBERS
  // =========================
  db.query(
    "SELECT COUNT(*) AS total FROM users",
    (err, users) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to load users statistics",
        });
      }

      statistics.users = users[0].total;

      // =========================
      // TOTAL ASSETS (Resources)
      // =========================
      db.query(
        "SELECT COUNT(*) AS total FROM assets",
        (err, assets) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to load assets statistics",
            });
          }

          statistics.resources = assets[0].total;

          // =========================
          // TOTAL WORK REQUESTS
          // =========================
          db.query(
            "SELECT COUNT(*) AS total FROM work_requests",
            (err, requests) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: "Failed to load request statistics",
                });
              }

              statistics.requests = requests[0].total;

              // =========================
              // TOTAL PENDING REQUESTS
              // =========================
              db.query(
                "SELECT COUNT(*) AS total FROM work_requests WHERE status='Pending'",
                (err, pending) => {
                  if (err) {
                    return res.status(500).json({
                      success: false,
                      message: "Failed to load pending requests",
                    });
                  }

                  statistics.pending = pending[0].total;

                  // =========================
                  // RECENT ACTIVITIES
                  // =========================
                  db.query(
                    `
                    SELECT
                      action,
                      module,
                      created_at
                    FROM activities
                    ORDER BY created_at DESC
                    LIMIT 10
                    `,
                    (err, activities) => {
                      if (err) {
                        return res.status(500).json({
                          success: false,
                          message: "Failed to load recent activities",
                        });
                      }

                      res.json({
                        success: true,
                        statistics,
                        activities,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

module.exports = {
  getDashboard,
};