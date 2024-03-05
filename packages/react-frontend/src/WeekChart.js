import { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import AddExperienceModal from "../src/components/addTaskModal";
import TaskCard from "./components/TaskCard";

const WeekChart = () => {
    const dummyData = [
        {
            id: 1,
            tasks: [
                {
                    _id: "task1",
                    task_name: "Garden work",
                    task_description:
                        "Fix the plants, add water, and plant new seeds",
                    task_due_date: "2024-03-05T08:00:00.000Z",
                    task_tags: ["home"],
                    task_completed: false,
                },
            ],
        },
        { id: 2, tasks: [] }, // No tasks on Monday
        {
            id: 3,
            tasks: [
                {
                    _id: "task2",
                    task_name: "Team meeting",
                    task_description: "Discuss new features, retrospective",
                    task_due_date: "2024-03-07T10:00:00.000Z",
                    task_tags: ["work", "urgent"],
                    task_completed: false,
                },
                {
                    _id: "task2b",
                    task_name: "Team meeting 2",
                    task_description: "Discuss new features, retrospective",
                    task_due_date: "2024-03-07T10:00:00.000Z",
                    task_tags: ["work", "urgent"],
                    task_completed: false,
                },
                {
                    _id: "task2c",
                    task_name: "Team meeting 3",
                    task_description: "Discuss new features, retrospective",
                    task_due_date: "2024-03-07T10:00:00.000Z",
                    task_tags: ["work"],
                    task_completed: false,
                },
            ],
        },
        { id: 4, tasks: [] }, // No tasks on Wednesday
        {
            id: 5,
            tasks: [
                {
                    _id: "task3",
                    task_name: "Grocery shopping at target",
                    task_description:
                        "Milk, eggs, water, bread, rice, chicken, onion, apples, banana",
                    task_due_date: "2024-03-09T12:00:00.000Z",
                    task_tags: ["errands"],
                    task_completed: false,
                },
                {
                    _id: "task3b",
                    task_name: "Grocery shopping at TJ",
                    task_description:
                        "Milk, eggs, water, bread, rice, chicken, onion, apples, banana",
                    task_due_date: "2024-03-09T12:00:00.000Z",
                    task_tags: ["errands"],
                    task_completed: false,
                },
                {
                    _id: "task3c",
                    task_name: "Grocery shopping at Whole foods",
                    task_description:
                        "Milk, eggs, water, bread, rice, chicken, onion, apples, banana",
                    task_due_date: "2024-03-09T12:00:00.000Z",
                    task_tags: ["errands"],
                    task_completed: false,
                },
            ],
        },
        {
            id: 6,
            tasks: [
                {
                    _id: "task4",
                    task_name: "Call plumber",
                    task_description: "Tell them to come ASAP!",
                    task_due_date: "2024-03-10T15:00:00.000Z",
                    task_tags: ["home", "urgent"],
                    task_completed: false,
                },
            ],
        },
        {
            id: 7,
            tasks: [
                {
                    _id: "task5",
                    task_name: "Visit parents",
                    task_description:
                        "Make sure to buy a present for them, maybe a new plant!",
                    task_due_date: "2024-03-11T18:00:00.000Z",
                    task_tags: ["family"],
                    task_completed: false,
                },
            ],
        },
    ];

    const [showModal, setShowModal] = useState(false);

    // current week's data
    const [currentWeek, setCurrentWeek] = useState([]);

    const [displayDates, setDisplayDates] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    const now = new Date();
    const overdueTasks = currentWeek.flatMap((day) =>
        day.tasks.filter(
            (task) => new Date(task.task_due_date) < now && !task.task_completed
        )
    );

    // mount the week
    useEffect(() => {
        updateWeek(new Date());
    }, []);

    // update the week base on the current day
    const updateWeek = (currentDate) => {
        const weekStart = startOfWeek(currentDate); //sunday
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(day.getDate() + i);
            dates.push(day);
        }
        setDisplayDates(dates);
        setCurrentWeek(getTasksForWeek(dates));
    };

    // first day of the week
    const startOfWeek = (date) => {
        const diff = date.getDate() - date.getDay();
        return new Date(date.setDate(diff));
    };

    //get tasks for the week
    const getTasksForWeek = (weekDates) => {
        const tasks = dummyData.filter((day) =>
            weekDates.some((date) => {
                const jsDay = date.getDay();
                const adjustedDay = jsDay === 0 ? 7 : jsDay;
                return adjustedDay === day.id;
            })
        );
        return tasks;
    };

    // previous week
    const goToPreviousWeek = () => {
        const newDate = new Date(
            displayDates[0].setDate(displayDates[0].getDate() - 7)
        );
        updateWeek(newDate);
    };

    // next week
    const goToNextWeek = () => {
        const newDate = new Date(
            displayDates[0].setDate(displayDates[0].getDate() + 7)
        );
        updateWeek(newDate);
    };

    const handleTaskCompletion = (taskId) => {
        // check if already done
        const isTaskDone = doneTasks.some((task) => task._id === taskId);

        if (isTaskDone) {
            //if moving it from done back into the calender
            const taskToMove = doneTasks.find((task) => task._id === taskId);

            //upadate the done list
            const updatedDoneTasks = doneTasks.filter(
                (task) => task._id !== taskId
            );

            // find the day the task is due
            const taskDay = new Date(taskToMove.task_due_date).getDay();
            console.log(taskDay);
            const dayIndex = taskDay === 0 ? 6 : taskDay;

            const updatedWeek = [...currentWeek];
            updatedWeek[dayIndex].tasks = [
                ...updatedWeek[dayIndex].tasks,
                { ...taskToMove, task_completed: false },
            ];

            setDoneTasks(updatedDoneTasks);
            setCurrentWeek(updatedWeek);
        } else {
            // move task doneTasks
            let taskToMove;
            const updatedWeek = currentWeek.map((day) => {
                const updatedTasks = day.tasks.filter((task) => {
                    //return false and remove from updated tasks
                    if (task._id === taskId) {
                        taskToMove = task;
                        return false;
                    }
                    return true;
                });
                return { ...day, tasks: updatedTasks };
            });

            if (taskToMove) {
                setDoneTasks([
                    ...doneTasks,
                    { ...taskToMove, task_completed: true },
                ]);
            }
            setCurrentWeek(updatedWeek);
        }
    };

    return (
        <>
            <div className="bg-white px-4 max-w lg:mx-auto lg:px-8">
                <div className="flex flex-col mx-12">
                    <div className="flex flex-row space-x-10">
                        <p className="text-4xl font-bold text-gray-800">
                            February 2024
                        </p>
                        <button
                            type="button"
                            className="-mt-1 py-3 px-8 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            Add Task
                        </button>
                    </div>

                    <AddExperienceModal
                        isOpen={showModal}
                        setShowModal={setShowModal}
                    />

                    <div className="flex space-x-1 mt-4">
                        <GoArrowLeft size={"30px"} onClick={goToPreviousWeek} />
                        <button
                            type="button"
                            className="-mt-1 px-4 text-sm text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100"
                        >
                            Today
                        </button>

                        <GoArrowRight size={"30px"} onClick={goToNextWeek} />
                    </div>
                </div>

                <div className="flex mt-8">
                    {displayDates.map((date, index) => {
                        const dayTasks =
                            currentWeek.find(
                                (day) => day.id === (index + 1) % 8
                            )?.tasks || [];
                        return (
                            <div
                                key={index}
                                className={`flex-1 min-w-52 py-2 ${
                                    index !== 6 ? "border-r" : ""
                                }`}
                            >
                                <p className="text-xl text-center font-semibold mb-4">
                                    {date.toLocaleDateString("en-US", {
                                        weekday: "short",
                                        day: "numeric",
                                    })}
                                </p>
                                <div className="overflow-y-auto h-96 space-y-5 justify-center">
                                    {dayTasks.map((task) => (
                                        <TaskCard
                                            key={task._id}
                                            {...task}
                                            onComplete={handleTaskCompletion}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div>
                    <div className="m-12">
                        <p className="text-xl font-semibold mb-4">Done</p>
                        <div className="flex overflow-x-scroll w-full space-x-1 py-3">
                            {doneTasks.map((task) => (
                                <div className="max-w-[16rem] shrink-0">
                                    <TaskCard
                                        key={task._id}
                                        {...task}
                                        onComplete={handleTaskCompletion}
                                        isComplete={task.task_completed}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="m-12">
                        <p className="text-xl font-semibold mb-4 text-red-500">
                            Overdue
                        </p>
                        <div className="flex overflow-x-scroll w-full space-x-1 py-3">
                            {overdueTasks.map((task) => (
                                <div className="max-w-[16rem] shrink-0">
                                    <TaskCard
                                        key={task._id}
                                        {...task}
                                        onComplete={handleTaskCompletion}
                                        isComplete={task.task_completed}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeekChart;
