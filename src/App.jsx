import React, { useEffect, useState, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import "./App.css";

const columns = ["Task", "In Progress", "Challenges", "Completed"];

const GOOGLE_SHEET_API =
  "https://script.google.com/macros/s/AKfycbyaBDKa1wrC7ZaO1PPr0NDvZxR1tEsuUYXxR6s5kW8BRtJbU5BFXKcqNCOVnA5_KPVBug/exec";

/* ---------- TIMESTAMP ID (YYYY-MM-DD HH:MM:SS) ---------- */
const generateTaskId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("kanban-theme") || "light"
  );

  const [tasks, setTasks] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("kanban-tasks"));
    return {
      Task: saved?.Task || [],
      "In Progress": saved?.["In Progress"] || [],
      Challenges: saved?.Challenges || [],
      Completed: saved?.Completed || [],
    };
  });

  const [dragged, setDragged] = useState(null);

  /* 🔍 SEARCH STATE (ONLY ADDITION) */
  const [searchTerm, setSearchTerm] = useState("");

  /* ---------- GOOGLE SHEET SYNC ---------- */
  const syncWithGoogleSheet = useCallback(async (tasksData) => {
    const flatTasks = [];

    Object.keys(tasksData).forEach((columnName) => {
      tasksData[columnName].forEach((task) => {
        flatTasks.push({
          id: task.id,
          text: task.text,
          column: task.column || "",
          updatedColumn: task.updatedColumn || "",
        });
      });
    });

    const body = new URLSearchParams({
      data: JSON.stringify(flatTasks),
    });

    try {
      const res = await fetch(GOOGLE_SHEET_API, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const text = await res.text();
      console.log("Sheet response:", text);
    } catch (e) {
      console.error("Sheet sync failed:", e);
    }
  }, []);

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("kanban-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
    syncWithGoogleSheet(tasks);
  }, [tasks, syncWithGoogleSheet]);

  /* ---------- ACTIONS ---------- */
  const addTask = (column) => {
    const text = prompt("Enter task title");
    if (!text) return;

    setTasks((prev) => ({
      ...prev,
      [column]: [
        ...prev[column],
        {
          id: generateTaskId(),
          text,
          column,
          updatedColumn: "",
        },
      ],
    }));
  };

  const editTask = (column, id) => {
    const text = prompt("Edit task");
    if (!text) return;

    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((t) =>
        t.id === id ? { ...t, text } : t
      ),
    }));
  };

  const deleteTask = (column, id) => {
    if (!window.confirm("Delete task?")) return;

    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((t) => t.id !== id),
    }));
  };

  /* ---------- DRAG & DROP ---------- */
  const onDrop = (newColumn) => {
    if (!dragged || dragged.column === newColumn) return;

    const movedTask = {
      ...dragged.task,
      column: dragged.column,
      updatedColumn: newColumn,
    };

    setTasks((prev) => ({
      ...prev,
      [dragged.column]: prev[dragged.column].filter(
        (t) => t.id !== dragged.task.id
      ),
      [newColumn]: [...prev[newColumn], movedTask],
    }));

    setDragged(null);
  };

  /* ---------- SEARCH FILTER ---------- */
  const filterTasks = (column) =>
    tasks[column].filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  /* ---------- UI ---------- */
  return (
    <div className="app">
      <header className="header">
        <div></div>
        <h1 className="title">Kanban Board</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>

      {/* 🔍 SEARCH BAR */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="board">
        {columns.map((column) => (
          <div
            key={column}
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(column)}
          >
            <h2>{column}</h2>

            {filterTasks(column).map((task) => (
              <div
                key={task.id}
                className="task web-task"
                draggable
                onDragStart={() => setDragged({ task, column })}
              >
                <div className="web-task-title">{task.text}</div>

                <div className="web-task-actions">
                  <button onClick={() => editTask(column, task.id)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTask(column, task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <button className="add-btn" onClick={() => addTask(column)}>
              + Add Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

