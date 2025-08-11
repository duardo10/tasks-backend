const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/database");
const consign = require("consign");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// consign
consign()
    .include("./config/passport.js")
    .then("./config/middlewares.js")
    .then("./api")
    .then("./config/routes.js")
    .into(app);

app.db = db;

// Rotas
app.get("/", (req, res) => {
  res.status(200).send("API de Tarefas - Backend funcionando!");
});

// GET - Listar todas as tarefas
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await db("tasks").select("*");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

// POST - Criar nova tarefa
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const [task] = await db("tasks").insert({
      title,
      description,
      completed: false
    }).returning("*");
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

// PUT - Atualizar tarefa
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const [task] = await db("tasks")
      .where({ id })
      .update({
        title,
        description,
        completed,
        updated_at: db.fn.now()
      })
      .returning("*");
    
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

// DELETE - Deletar tarefa
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db("tasks").where({ id }).del();
    
    if (!deleted) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});