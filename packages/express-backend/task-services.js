import mongoose from "mongoose";
import taskModel from "./tasks.js";
import dotenv from "dotenv"

mongoose.set("debug", true);
dotenv.config()
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getTask(id) {
    let promise;
    if (id === undefined) {
      promise = taskModel.find();
    } else {
      promise = findTaskByUserId(id);
    }
    return promise;
}

function getWeekTasks(userId, currentDate){
      if (currentDate !== undefined && !(currentDate instanceof Date) || isNaN(currentDate)) {
        throw new Error("Invalid currentDate. Please provide a valid Date object.");
    }

    let promise;

    // Calculate the first Sunday from the current day
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the week (Sunday)

    // Calculate the end of the week (7 days later)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    // Define the aggregation pipeline
    const pipeline = [
        {
            $match: {
                userid: mongoose.Types.ObjectId(userId),
                task_due_date: {
                    $gte: startOfWeek,
                    $lt: endOfWeek
                }
            }
        }
    ];

    promise = taskModel.aggregate(pipeline);
    return promise
}

function findTaskByUserId(id) {
    return taskModel.find({ userid: id });
  }

function addTask(task) {
    const taskToAdd = new taskModel(task);
    const promise = taskToAdd.save();
    return promise;
}

export default {
    addTask,
    getWeekTasks,
    getTask,
    findTaskByUserId
  };