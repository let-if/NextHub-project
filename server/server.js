
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;


// Serve uploaded profile images

app.use(
    "/uploads",
    express.static("uploads")
);



db.getConnection((err, connection)=>{

    if(err){

        console.error(
            "❌ Database connection failed:",
            err.message
        );

        process.exit(1);

    }


    console.log(
        "✅ MySQL Connected Successfully"
    );


    connection.release();



    app.listen(PORT,()=>{

        console.log(
            `🚀 Server running on http://localhost:${PORT}`
        );

    });


});