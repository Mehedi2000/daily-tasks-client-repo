import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "react-bootstrap/Button";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const task = useLoaderData();

  const [singleTask, setSingleTask] = useState(task);
  const handleUpdateTask = (event) => {
    event.preventDefault();
    console.log(singleTask);
    fetch(`http://localhost:8000/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(singleTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Task updated");
          console.log(data);
        }
      });
  };
  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newTask = { ...singleTask };
    newTask[field] = value;
    setSingleTask(newTask);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold">
        Please Update : <span className="text-primary">{task.task}</span>
      </h2>
      <form className="mt-5 text-center" onSubmit={handleUpdateTask}>
        <input
          className="mb-2 py-2 px-3 rounded-2"
          onChange={handleInputChange}
          defaultValue={task.task}
          type="text"
          name="task"
          id=""
          placeholder="name"
          required
        />
        <br />
        <Button className="mt-3" type="submit" variant="success">
          Update Task
        </Button>
      </form>
    </div>
  );
};

export default Update;
