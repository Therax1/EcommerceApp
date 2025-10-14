const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "ecomapp"
});

// Signup endpoint
app.post('/inscription', (req, res) => {
    
    console.log("Données reçues:", req.body); // Ajoute cette ligne
    const { name, email, password } = req.body;
    console.log("Name:", name, "Email:", email); // Et cette ligne

    const sql = "INSERT INTO users (noms, email, mot_de_passe) VALUES (?, ?, ?)";
    const values = [name, email, password]; // Destructure directly here

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error during signup:", err.message);
            return res.json({ success: false, message: "Signup failed" });
        }
        console.log("User signed up successfully");
        return res.json({ success: true, message: "Signup successful" });
    });
});

app.post('/connexion', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ? AND `mot_de_passe` = ?";
    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }

        if (data.length > 0) {   
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
