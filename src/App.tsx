import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Task, ViewState, TaskStatus } from "./types/task";
import { TaskSection } from "./components/TaskSection";
import { TaskCard } from "./components/TaskCard";
import { TaskForm } from "./components/TaskForm";
import "./App.css";

function App() {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
    const [view, setView] = useState<ViewState>("LIST");
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // --- CRUD Actions ---
    const handleSave = (taskData: Partial<Task>) => {
        if (view === "ADD") {
            const newTask: Task = {
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                title: taskData.title!,
                description: taskData.description || "",
                status: "Pending", // Default for new tasks
            };
            setTasks([newTask, ...tasks]);
        } else if (view === "EDIT" && editingTask) {
            setTasks(
                tasks.map((t) =>
                    t.id === editingTask.id ? { ...t, ...taskData } : t
                )
            );
        }
        setView("LIST");
        setEditingTask(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks(tasks.filter((t) => t.id !== id));
        }
    };

    const startEdit = (task: Task) => {
        setEditingTask(task);
        setView("EDIT");
    };

    // --- Filtering & Grouping ---
    const filteredTasks = useMemo(() => {
        return tasks.filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tasks, searchQuery]);

    const groupedTasks: Record<TaskStatus, Task[]> = {
        "In Progress": filteredTasks.filter((t) => t.status === "In Progress"),
        Pending: filteredTasks.filter((t) => t.status === "Pending"),
        Completed: filteredTasks.filter((t) => t.status === "Completed"),
    };

    // --- Render Views ---
    if (view === "ADD" || view === "EDIT") {
        return (
            <div className="app-container">
                <TaskForm
                    mode={view}
                    initialData={editingTask || undefined}
                    onSave={handleSave}
                    onCancel={() => setView("LIST")}
                />
            </div>
        );
    }

    // --- Main List View ---
    return (
        <div className="app-container">
            <div className="app-header">
                <h1>TO-DO APP</h1>
            </div>

            <div className="main-content">
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search To-Do"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="task-list-wrapper">
                    {/* We iterate over specific status keys to maintain order */}
                    {(
                        ["In Progress", "Pending", "Completed"] as TaskStatus[]
                    ).map((status) => (
                        <TaskSection
                            key={status}
                            title={status}
                            count={groupedTasks[status].length}
                        >
                            {groupedTasks[status].map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={startEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </TaskSection>
                    ))}
                </div>
            </div>

            <button className="fab" onClick={() => setView("ADD")}>
                <Plus size={32} />
            </button>
        </div>
    );
}

export default App;
