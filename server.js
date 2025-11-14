const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",       // your MySQL password
    database: "eventDB"
});

// Check connection
db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// POST API - Save registration
app.post("/register", (req, res) => {
    const { name, email, mobile, event } = req.body;

    const sql = "INSERT INTO registrations (name, email, mobile, event_name) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, mobile, event], (err, result) => {
        if (err) throw err;
        res.send("Registration stored in database!");
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
