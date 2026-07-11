





const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dashboardRoutes = require("./routes/dashboard.routes");
const authRoutes = require("./routes/auth.routes");
const requestRoutes = require("./routes/request.routes");
const profileRoutes = require("./routes/profile.routes");
const memberRoutes = require("./routes/member.routes");
const assetRoutes = require("./routes/asset.routes");

const departmentRoutes = require("./routes/department.routes");
const departmentRequestRoutes =
require("./routes/departmentRequest.routes");
const searchRoutes = require("./routes/search.routes");
const statisticsRoutes =
require("./routes/statistics.routes");
const path = require("path");



const app = express();


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());

app.use(morgan("dev"));



app.get("/",(req,res)=>{

    res.json({
        success:true,
        message:"NexusHub API Running"
    });

});



app.use("/api/auth", authRoutes);

app.use(
"/api/requests",
requestRoutes
);
app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"uploads")
    )
);
app.use("/api/auth", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/departments", departmentRoutes);
app.use(

"/api/department-requests",

departmentRequestRoutes

);
app.use("/api/search", searchRoutes);
app.use(
"/api/statistics",
statisticsRoutes
);
module.exports = app;