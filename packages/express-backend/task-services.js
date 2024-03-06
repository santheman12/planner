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
    currentDate = new Date(currentDate);
    
    if (currentDate !== undefined && !(currentDate instanceof Date) || isNaN(currentDate)) {
      throw new Error("Invalid currentDate. Please provide a valid Date object.");
    }

    let promise;
    // Calculate the first Sunday from the current day
    const startOfWeek = new Date(currentDate);
  
   // console.log(startOfWeek.getDay())
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getUTCDay()); // Set to the first day of the week (Sunday)

    // Calculate the end of the week (7 days later)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    // Define the aggregation pipeline
    const pipeline = [
        {
            $match: {
                userid: new mongoose.Types.ObjectId(userId),
                task_due_date: {
                    $gte: startOfWeek,
                    $lt: endOfWeek
                }
            }
        },
        {
          $group: {
              _id: { $dayOfWeek: { date: "$task_due_date", timezone: "UTC" } },
              tasks: { $push: "$$ROOT" } // push documents into an array for each day
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