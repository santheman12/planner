import React, { useState } from 'react';


const AddTask = () => {
  const [task, setTask] = useState({
    userid: '',
    task_name: '',
    task_due_date: '',
    task_description: '',
    task_tags: [],
    task_completed: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Assuming your backend expects task details in JSON format
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          task_tags: task.task_tags.split(",").map(tag => tag.trim()), // Assuming task_tags is a string of comma-separated values
        }),
      });
  
      if (response.ok) {
        // Task successfully added to the backend and, consequently, MongoDB Atlas
        setTask({ userid: '', task_name: '', task_due_date: '', task_description: '', task_tags: [], task_completed: false }); // Reset form
      } else {
        const errorText = await response.text(); // Or .json() if your backend sends a JSON response
        console.error('Failed to add task. Status:', response.status, 'Response:', errorText);
        // Handle server errors (e.g., invalid input or server issues)
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <input
          type="text"
          name="userid"
          value={task.userid}
          onChange={handleChange}
          placeholder="User ID (must be a number)"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="task_name"
          value={task.task_name}
          onChange={handleChange}
          placeholder="Task Name"
          required
        />
      </div>
      <div>
        <select name="task_due_date" value={task.task_due_date} onChange={handleChange} required>
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <div>
        <textarea
          name="task_description"
          value={task.task_description}
          onChange={handleChange}
          placeholder="Task Description"
        />
      </div>
      <div>
        <input
          type="text"
          name="task_tags"
          value={task.task_tags}
          onChange={handleChange}
          placeholder="Task Tags (comma-separated)"
        />
      </div>
      <div>
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
};

export default AddTask;
