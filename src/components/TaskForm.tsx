import React, { useState } from "react";
import { Task, TaskStatus } from "../types/task";
import { ArrowLeft, ChevronDown } from "lucide-react";

interface Props {
    mode: "ADD" | "EDIT";
    initialData?: Task;
    onSave: (task: Partial<Task>) => void;
    onCancel: () => void;
}

export const TaskForm: React.FC<Props> = ({
    mode,
    initialData,
    onSave,
    onCancel,
}) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(
        initialData?.description || ""
    );
    const [status, setStatus] = useState<TaskStatus>(
        initialData?.status || "Pending"
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ title, description, status });
    };

    return (
        <div className="form-container">
            <div className="app-header">
                <button className="back-btn" onClick={onCancel}>
                    <ArrowLeft size={24} color="white" />
                </button>
                <h1>{mode === "ADD" ? "Add Task" : "Edit Task"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="main-content">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <textarea
                        placeholder="Enter the description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field textarea"
                        rows={4}
                    />
                </div>

                {/* Only show Status dropdown in Edit mode, or remove condition to show always */}
                {mode === "EDIT" && (
                    <div className="form-group custom-select-wrapper">
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as TaskStatus)
                            }
                            className="input-field select-field"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <ChevronDown className="select-icon" size={20} />
                    </div>
                )}

                <div className="button-group">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-outline"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {mode === "ADD" ? "ADD" : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};
