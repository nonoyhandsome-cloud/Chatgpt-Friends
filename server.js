const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Database Setup
const db = new sqlite3.Database('./friends.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the SQLite database.');
});

// Initialize Table
db.run(`CREATE TABLE IF NOT EXISTS chatgpt_friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    website TEXT
)`);

// --- REST API ENDPOINTS ---

// GET all friends (with optional search by name)
app.get('/api/friends', (req, res) => {
    const search = req.query.search;
    let sql = "SELECT * FROM chatgpt_friends";
    let params = [];

    if (search) {
        sql += " WHERE name LIKE ?";
        params.push(`%${search}%`);
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET a single friend by ID
app.get('/api/friends/:id', (req, res) => {
    db.get("SELECT * FROM chatgpt_friends WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// POST (Add) a new friend
app.post('/api/friends', (req, res) => {
    const { name, email, phone, website } = req.body;
    db.run(
        `INSERT INTO chatgpt_friends (name, email, phone, website) VALUES (?, ?, ?, ?)`,
        [name, email, phone, website],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// PUT (Update) a friend
app.put('/api/friends/:id', (req, res) => {
    const { name, email, phone, website } = req.body;
    db.run(
        `UPDATE chatgpt_friends SET name = ?, email = ?, phone = ?, website = ? WHERE id = ?`,
        [name, email, phone, website, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Updated successfully" });
        }
    );
});

// DELETE a friend
app.delete('/api/friends/:id', (req, res) => {
    db.run("DELETE FROM chatgpt_friends WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});