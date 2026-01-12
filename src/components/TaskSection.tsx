import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
    title: string;
    count: number;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const TaskSection: React.FC<Props> = ({
    title,
    count,
    children,
    defaultOpen = true,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    // If no tasks in this section, hide it completely (optional, currently just returns null)
    if (count === 0) return null;

    return (
        <div className="accordion-section">
            <div
                className="accordion-header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="section-title">
                    {title} ({count})
                </span>
                {isOpen ? (
                    <ChevronUp size={20} className="text-blue" />
                ) : (
                    <ChevronDown size={20} className="text-blue" />
                )}
            </div>
            <div className={`accordion-wrapper ${isOpen ? "open" : ""}`}>
                <div className="accordion-inner">
                    <div className="accordion-content">{children}</div>
                </div>
            </div>
        </div>
    );
};
