const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jwngma@006@", // use your password
    database: "testdb"
});

connection.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err);
    } else {
        console.log("Connected to MySQL!");
    }
});

// Serve HTML form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

// Handle form submission
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(query, [username, email, password], (err, results) => {
        if (err) {
            res.send("Error: " + err.message);
        } else {
            res.send("Registration successful!");
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
