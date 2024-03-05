// TaskCard.js

import React from "react";
import Checkmark from "./Checkmark";

const TaskCard = ({
    _id,
    task_name,
    task_description,
    task_due_date,
    priority,
    task_tags,
    onComplete,
    isComplete,
}) => {
    return (
        <div className="max-w-sm p-4 bg-white border border-gray-100 rounded-lg shadow mx-2">
            <div className="flex justify-between">
                <h6 className="mb-3 text-md font-semibold tracking-tight text-gray-900 truncate">
                    {task_name}
                </h6>
                <div className="-mt-1">
                    <Checkmark
                        onToggle={() => onComplete(_id)}
                        isComplete={isComplete}
                    />
                </div>
            </div>

            <p className="mb-1 font-normal text-gray-500 truncate">
                {task_description}
            </p>
            <p className="mb-4 text-sm text-gray-500">
                Due:&nbsp;
                {new Date(task_due_date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                })+ ' @ ' + new Date(task_due_date).toLocaleTimeString("en-US", {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true // Use false for 24-hour format
                })}
            </p>

            <div className="mb-2 text-sm font-medium">
                {task_tags.map((tag, index) => {
                    return (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                            {tag}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskCard;
