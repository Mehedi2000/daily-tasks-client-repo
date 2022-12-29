import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const task = form.task.value;
    const img = form.img.value;
    // console.log(task, img);

    const addTask = {
      task,
      img,
    };
    // console.log(addTask);
    fetch("http://localhost:8000/addTask", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addTask),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("Task addded successfully");
        navigate("/media");
      });
  };
  return (
    <div className="container">
      <h2 className="fw-bold text-center mt-5">Please add task !!</h2>
      <form className="mt-5 text-center" onSubmit={handleSubmit}>
        <input
          className="mb-2 py-2 px-3 rounded-2"
          type="text"
          name="task"
          placeholder="Enter Your Task"
          required
        />
        <br />
        <input
          className=" py-2 px-3 rounded-2"
          type="text"
          name="img"
          placeholder="Photo Url"
          required
        />
        <br />
        <Button className="mt-3" type="submit" variant="success">
          Submit
        </Button>
        {/* <button type="submit">Update User</button> */}
      </form>
    </div>
  );
};

export default AddTask;
