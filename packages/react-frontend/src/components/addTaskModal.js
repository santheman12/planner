import React from "react";

interface AddExperienceModalProps {
    isOpen: boolean;
    setShowModal: (isOpen: boolean) => void;
}

const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
    isOpen,
    setShowModal,
}) => {
    if (!isOpen) return null;

    // const handleModalState = (e: boolean) => {
    //     setShowModal(e);
    // };
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
                            <form className="px-12 py-8">
                                <div className="grid gap-7 gap-x-12 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Task Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Type task name"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
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
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="tag"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Tag
                                        </label>
                                        <select
                                            id="tag"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        >
                                            <option value="">Select tag</option>
                                            <option value="tag1">Tag 1</option>
                                            <option value="tag2">Tag 2</option>
                                            <option value="tag3">Tag 3</option>
                                            <option value="tag4">Tag 4</option>
                                        </select>
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
