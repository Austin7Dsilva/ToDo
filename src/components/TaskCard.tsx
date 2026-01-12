import React from "react";
import { Task } from "../types/task";
import { Edit2, Trash2 } from "lucide-react";

interface Props {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
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

    return (
        <div className="task-card">
            <div className="card-top">
                <div className="icon-circle">L</div>
                <div className="card-header-text">
                    <h3 className="card-title">{task.title}</h3>
                    <div className="status-badge">
                        <span
                            className="status-dot"
                            style={{
                                backgroundColor: getStatusColor(task.status),
                            }}
                        ></span>
                        {task.status}
                    </div>
                </div>
            </div>

            <p className="card-desc">{task.description}</p>

            <div className="card-footer">
                <span className="card-date">{formatDate(task.createdAt)}</span>

                <div className="card-actions">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }}
                        className="action-btn edit"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                        }}
                        className="action-btn delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
