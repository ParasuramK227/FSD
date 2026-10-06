const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve HTML files from public folder
// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // change if different
    password: "", // set your MySQL password
    database: "eventdb"
});
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});
// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
// ➕ Create Event
app.post("/add-event", (req, res) => {
    const { name, date, location, description } = req.body;
    const sql = "INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, date, location, description], (err, result) => {
        if (err) throw err;
        res.send("Event added successfully! <a href='/'>Go Back</a>");
    });
});
// Read Events
app.get("/events", (req, res) => {
    db.query("SELECT * FROM events", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
// Update Event
app.post("/update-event", (req, res) => {
    const { id, name, date, location, description } = req.body;
    const sql = "UPDATE events SET name=?, date=?, location=?, description=? WHERE id=?";
    db.query(sql, [name, date, location, description, id], (err, result) => {
        if (err) throw err;
        res.send("Event updated successfully! <a href='/'>Go Back</a>");
    });
});
// ❌ Delete Event
app.post("/delete-event", (req, res) => {
    const { id } = req.body;
    const sql = "DELETE FROM events WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send("Event deleted successfully! <a href='/'>Go Back</a>");
    });
});
// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});