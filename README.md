#  Kanban Board Project (React + Vite)

Live Site:  
 https://sriyareddy21.github.io/Kanban_Board/

Repository:  
 https://github.com/sriyareddy21/Kanban_Board

---

##  Project Overview

This is a **Kanban Board web application** built using **React** and **Vite**.  
It helps users visually manage tasks by organizing them into columns such as **To Do**, **In Progress**, and **Done**.

The project is deployed using **GitHub Pages** and focuses on real-world concepts like:
- React state management
- Component-based UI design
- Vite build configuration
- Debugging deployment issues
- Feature enhancement (Search Bar)

---

##  Features

-  Task cards grouped in columns
-  Move tasks across columns
-  **Search tasks across all columns (NEW)**
-  Fast development using Vite
-  Live deployment on GitHub Pages
-  Clean and maintainable code

---

##  Technologies Used

- React
- Vite
- JavaScript (ES6)
- HTML & CSS
- Git & GitHub
- GitHub Pages

---

##  Project Structure

```
Kanban_Board/
│
├── docs/                 # Production build (used by GitHub Pages)
│   ├── index.html
│   └── assets/
│
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── public/
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

##  Code Explanation (Important Files)

## `main.jsx`
- Entry point of the React app
- Mounts the React app to the DOM

## `App.jsx`
- Holds the main application logic
- Maintains state for tasks and search input
- Handles filtering logic for search
- Renders columns and cards

## `components/`
- Contains reusable UI components such as:
  - Board
  - Column
  - Card

## `vite.config.js`
Critical for GitHub Pages deployment:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Kanban_Board/",
  build: {
    outDir: "docs",
    emptyOutDir: true
  },
  plugins: [react()]
})
```

---

##  Search Bar Feature (Latest Enhancement)

### Feature Overview
A **Search Bar** allows users to search tasks in real time across all columns.

- Case-insensitive search
- Instant filtering as the user types
- Improves usability for large task lists

---

## How It Works

1. Search input is stored in React state
2. Tasks are filtered using JavaScript `filter()`
3. Only matching tasks are rendered

---

## Core Logic Example

```js
const [searchQuery, setSearchQuery] = useState("");

const filteredTasks = tasks.filter(task =>
  task.title.toLowerCase().includes(searchQuery.toLowerCase())
);
```

---

## Search Input UI

```jsx
<input
  type="text"
  placeholder="Search tasks..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

---

##  Issue Faced: 404 Errors After Deployment

### Problem
Static files were loading from the root path (`/`) instead of the repository path.

### Root Cause
GitHub Pages serves apps from:
```
/Kanban_Board/
```
but Vite assumed:
```
/
```

---

## Solution
- Configured correct `base` path in Vite
- Unified build output to `docs`
- Cleaned old build folders

This resolved all deployment issues.

---

## How to Run Locally

```bash
git clone https://github.com/sriyareddy21/Kanban_Board.git
cd Kanban_Board
npm install
npm run dev
```

---

## Build & Deploy

```bash
npm run build
git add .
git commit -m "Deploy updated build"
git push
```

GitHub Pages settings:
- Branch: `main`
- Folder: `/docs`

---

## Recent Changes Summary

- Added task search functionality
- Introduced new React state for search input
- Implemented real-time task filtering
- Fixed GitHub Pages deployment issues
- Cleaned Vite build configuration

---

## Project Summary

> “I built a Kanban board using React and Vite, added a real-time search feature using state and filtering, and resolved GitHub Pages deployment issues by configuring the correct base path and build directory.”

---

##  Key Learnings

- React controlled components
- State-based filtering
- Deployment debugging
- GitHub Pages limitations

-----



