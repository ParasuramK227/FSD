import React, { useEffect, useState } from 'react';
const API = 'http://localhost:5000/todos';
function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    useEffect(() => {
        fetch(API)
            .then(r => r.json())
            .then(setTodos)
            .catch(console.error);
    }, []);
    async function addTodo(e) {
        e.preventDefault();
        if (!title.trim()) return;
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        const newTodo = await res.json();
        setTodos(prev => [...prev, newTodo]);
        setTitle('');
    }
    async function toggleTodo(todo) {
        const res = await fetch(`${API}/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !todo.completed })
        });
        const updated = await res.json();
        setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    }
    async function deleteTodo(id) {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        setTodos(prev => prev.filter(t => t.id !== id));
    }
    return (
        <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>Todo App (React + Node JSON persistence)</h2>
            <form onSubmit={addTodo} style={{ marginBottom: 20 }}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Add todo..."
                    style={{ padding: '8px', width: '70%' }}
                />
                <button type="submit" style={{ padding: '8px 12px', marginLeft: 8 }}>Add</button>
            </form>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map(todo => (
                    <li key={todo.id} style={{ padding: 10, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={!!todo.completed}
                            onChange={() => toggleTodo(todo)}
                            style={{ marginRight: 10 }}
                        />
                        <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                        <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 10 }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default App;