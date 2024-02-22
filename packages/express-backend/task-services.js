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
    getTask,
    findTaskByUserId
  };