import React, { useState } from "react";

interface AddExperienceModalProps {
    isOpen: boolean;
    setShowModal: (isOpen: boolean) => void;
}

const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
    isOpen,
    setShowModal,
}) => {
    const [task, setTask] = useState({
        userid: "",
        task_name: "",
        task_due_date: "",
        task_description: "",
        task_tags: [],
        task_completed: false,
    });

    if (!isOpen) return null;

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function submitForm(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            console.log(task)
            // Assuming your backend expects task details in JSON format
            const response = await fetch(`http://localhost:8000/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...task,
                    task_tags: task.task_tags
                        .split(",")
                        .map((tag) => tag.trim()), // Assuming task_tags is a string of comma-separated values
                }),
            });

            if (response.ok) {
                // Task successfully added to the backend and, consequently, MongoDB Atlas
                alert("Task added successfully!");
                setTask({
                    userid: "",
                    task_name: "",
                    task_due_date: "",
                    task_description: "",
                    task_tags: [],
                    task_completed: false,
                }); // Reset form
            } else {
                const errorText = await response.text(); // Or .json() if your backend sends a JSON response
                console.error(
                    "Failed to add task. Status:",
                    response.status,
                    "Response:",
                    errorText
                );
                // Handle server errors (e.g., invalid input or server issues)
                alert("Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("An error occurred while adding the task.");
        }
    }
    return (
        <>
            <div
                className="fixed inset-0 bg-black z-40 opacity-75"
                onClick={() => setShowModal(false)}
            ></div>

            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/* Content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* Header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                            <h3 className="text-3xl font-semibold">Add Task</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/* Body */}
                        <div className="relative flex-auto">
                            <form className="px-12 py-8" onSubmit={submitForm}>
                                <div className="grid gap-7 gap-x-12 mb-4 grid-cols-2">
                                    <div className="col-span-2 space-y-4">
                                        <label
                                            htmlFor="task_name"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Task Name
                                        </label>
                                        <input
                                            type="text"
                                            name="task_name"
                                            value={task.task_name}
                                            onChange={handleChange}
                                            id="task_name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Type task name"
                                            required
                                        />
                                        <label
                                            htmlFor="userid"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            User Id
                                        </label>
                                        <input
                                            type="text"
                                            name="userid"
                                            value={task.userid}
                                            onChange={handleChange}
                                            id="userid"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Type userid"
                                            required
                                        />
                                        <label
                                            htmlFor="tag"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Due Date
                                        </label>
                                        <select
                                            name="task_due_date"
                                            value={task.task_due_date}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        >
                                            <option value="">Select Day</option>
                                            <option value="Monday">
                                                Monday
                                            </option>
                                            <option value="Tuesday">
                                                Tuesday
                                            </option>
                                            <option value="Wednesday">
                                                Wednesday
                                            </option>
                                            <option value="Thursday">
                                                Thursday
                                            </option>
                                            <option value="Friday">
                                                Friday
                                            </option>
                                            <option value="Saturday">
                                                Saturday
                                            </option>
                                            <option value="Sunday">
                                                Sunday
                                            </option>
                                        </select>
                                    </div>
                                    {/* <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="priority"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Priority
                                        </label>
                                        <select
                                            id="priority"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        >
                                            <option value="">
                                                Select priority
                                            </option>
                                            <option value="low">Low</option>
                                            <option value="moderate">
                                                Moderate
                                            </option>
                                            <option value="high">High</option>
                                            <option value="top">Top</option>
                                        </select>
                                    </div> */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Task Tags
                                        </label>
                                        <input
                                            type="text"
                                            name="task_tags"
                                            value={task.task_tags}
                                            onChange={handleChange}
                                            placeholder="Task Tags (comma-separated)"
                                            className="lock p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Task Description
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            value={task.task_description}
                                            onChange={handleChange}
                                            name="task_description"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Describe the task"
                                        ></textarea>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="py-2 px-8 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                >
                                    Add Task
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddExperienceModal;
