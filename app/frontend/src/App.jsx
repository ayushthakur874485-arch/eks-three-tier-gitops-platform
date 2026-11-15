
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTasks() {
    const response = await fetch(`${API}/api/tasks`);
    setTasks(await response.json());
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    setTitle("");
    loadTasks();
  }

  async function deleteTask(id) {
    await fetch(`${API}/api/tasks/${id}`, {
      method: "DELETE"
    });
    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main style={{ maxWidth: 600, margin: "60px auto", fontFamily: "Arial" }}>
      <h1>DevOps Task Manager</h1>
      <p>Three-tier application deployed on Amazon EKS</p>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter a task"
        />
        <button>Add Task</button>
      </form>

      {tasks.map(task => (
        <div key={task._id}>
          {task.title}
          <button onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}

export default App;
