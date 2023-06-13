const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Il@vech0k0",
  database: "todo_app",
  port: 3306, // ポート番号
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/api/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).json({ error: "Error fetching tasks" });
      return;
    }
    res.json(result);
  });
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  db.query("INSERT INTO tasks (title) VALUES (?)", [title], (err, result) => {
    if (err) {
      console.error("Error saving task:", err);
      res.status(500).json({ error: "Error saving task" });
      return;
    }
    const newTask = { id: result.insertId, title };
    res.json(newTask);
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting task:", err);
      res.status(500).json({ error: "Error deleting task" });
      return;
    }
    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
