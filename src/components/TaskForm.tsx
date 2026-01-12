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


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ title, description, status });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "#16a34a"; // Green
            case "In Progress":
                return "#f59e0b"; // Orange
            default:
                return "#9ca3af"; // Grey/Pending
        }
    };

    const handleStatusSelect = (selectedStatus: TaskStatus) => {
        setStatus(selectedStatus);
        setIsDropdownOpen(false);
    };

    const statusOptions: TaskStatus[] = ["Pending", "In Progress", "Completed"];

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
                        <div
                            className="custom-select-container"
                            tabIndex={0}
                            onBlur={() =>
                                setTimeout(() => setIsDropdownOpen(false), 200)
                            }
                        >
                            <div
                                className="custom-select-trigger"
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                            >
                                <div className="status-indicator">
                                    <span
                                        className="status-dot"
                                        style={{
                                            backgroundColor:
                                                getStatusColor(status),
                                        }}
                                    ></span>
                                    {status}
                                </div>
                                <ChevronDown
                                    size={20}
                                    color="var(--text-gray)"
                                />
                            </div>
                            {isDropdownOpen && (
                                <div className="custom-options">
                                    {statusOptions.map((option) => (
                                        <div
                                            key={option}
                                            className={`custom-option ${
                                                option === status
                                                    ? "selected"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleStatusSelect(option)
                                            }
                                        >
                                            <span
                                                className="status-dot"
                                                style={{
                                                    backgroundColor:
                                                        getStatusColor(option),
                                                }}
                                            ></span>
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
