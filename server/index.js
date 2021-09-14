const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const { dbQuery } = require('./db');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`hello from slash again`);
});

// app.get('/todos', (req, res) => {

// });

app.get("/todos", async (req, res) => {
  console.log(`hello from getting all todos`);
  try {
    const allTodos = await dbQuery("SELECT * FROM todo");
    console.log(`we are in get todos path`);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/todos", async (req, res) => {
  console.log(`we are in post`);
  try {
    const { description } = req.body;
    const newTodo = await dbQuery(
      "INSERT INTO todo (description) VALUES($1)",
      description
    );
    console.log(`we are in the post route`);
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
})
