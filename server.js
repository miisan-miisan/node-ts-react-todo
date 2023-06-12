const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json(newTodo);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
