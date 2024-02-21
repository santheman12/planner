import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User Id'
    },
    task_name: {
      type: String,
      required: true,
      trim: true,
    },
    task_due_date: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        if (!days.includes(value)) {
          throw new Error("Invalid day, must be a day of the week.");
        }
      },
    },
    task_description: {
      type: String,
      required: false, // Assuming not required, adjust as necessary
      trim: true,
    },
    task_tags: [{
      type: String,
      required: false, // Assuming not required, adjust as necessary
      trim: true,
    }],
    task_completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "tasks" } // Define the collection name
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
