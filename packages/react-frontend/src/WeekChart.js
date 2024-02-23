import React from "react";
import { PiArrowSquareLeftThin, PiArrowSquareRightThin } from "react-icons/pi";

const WeekChart = () => {
    const daysOfWeek = [
        "Mon 19",
        "Tue 20",
        "Wed 21",
        "Thu 22",
        "Fri 23",
        "Sat 24",
        "Sun 25",
        "Overdue",
    ];

    return (
        <div className="bg-white px-4 max-w lg:mx-auto lg:px-8">
            <div className="flex flex-col mx-12">
                <div className="flex flex-row space-x-10">
                    <p className="text-4xl font-bold text-gray-800">
                        February 2024
                    </p>
                    <button
                        type="button"
                        class="py-3 px-8 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 "
                    >
                        Add Task
                    </button>
                </div>
                <div className="flex space-x-1 mt-4">
                    <PiArrowSquareLeftThin size={"30px"} />
                    <button
                        type="button"
                        class="-mt-1 px-4 text-sm text-gray-900 focus:outline-none bg-white rounded-md border border-gray-500 hover:bg-gray-100 hover:text-blue-700 "
                    >
                        Today
                    </button>

                    <PiArrowSquareRightThin size={"30px"} />
                </div>
            </div>

            <div className="flex mt-8">
                {daysOfWeek.map((day) => (
                    <div key={day} className="flex-1 w-52 border-r-2 py-2">
                        <p className="text-xl text-center font-semibold text-gray-800 mb-4 truncate">
                            {day}
                        </p>
                        {/* dynamic */}
                        <div className="h-96"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekChart;
