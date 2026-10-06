const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'todos.json');

app.use(cors());
app.use(express.json());

async function readTodos() {
    try {
        const raw = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(DATA_FILE, '[]', 'utf8');
            return [];
        }
        throw err;
    }
}

async function writeTodos(todos) {
    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

// GET all
app.get('/todos', async (req, res) => {
    const todos = await readTodos();
    res.json(todos);
});

// CREATE
app.post('/todos', async (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ error: 'title required' });
    }

    const todos = await readTodos();
    const newTodo = {
        id: Date.now().toString(),
        title: title.trim(),
        completed: false
    };

    todos.push(newTodo);
    await writeTodos(todos);
    res.status(201).json(newTodo);
});

// UPDATE (partial allowed)
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todos = await readTodos();
    const idx = todos.findIndex(t => t.id === id);

    if (idx === -1) {
        return res.status(404).json({ error: 'not found' });
    }

    if (title !== undefined) todos[idx].title = title;
    if (completed !== undefined) todos[idx].completed = completed;

    await writeTodos(todos);
    res.json(todos[idx]);
});

// DELETE
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const todos = await readTodos();
    const filtered = todos.filter(t => t.id !== id);

    if (filtered.length === todos.length) {
        return res.status(404).json({ error: 'not found' });
    }

    await writeTodos(filtered);
    res.json({ success: true });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});