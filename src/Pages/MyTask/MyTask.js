import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  // const [tasks, setTasks] = useState([]);

  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/tasks?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  // useEffect(() => {
  //   fetch(`http://localhost:8000/tasks?email=${user?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setTasks(data));
  // }, [user?.email]);

  const handleDeleteTask = (single) => {
    console.log(single);
    fetch(`http://localhost:8000/tasks/${single._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Task deleted successfully`);
          refetch();
        }
      });
  };

  // if(isLoading){
  //   return
  // }
  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center mb-5">My Task Are Here !</h2>
      {tasks.map((single) => (
        <div className="d-flex mb-3 gap-2 justify-content-center">
          <div className="bg-secondary rounded-2">
            <p key={single._id} className="fs-5 py-2 px-3 text-light fw-bold">
              {single.task}
            </p>
          </div>
          <Link to={`/update/${single._id}`}>
            <Button variant="outline-primary">Update</Button>
          </Link>
          <Link>
            <Button
              variant="outline-danger"
              onClick={() => handleDeleteTask(single)}
            >
              Delete
            </Button>
          </Link>
          <Link to={`/completed-task/${single._id}`}>
            <Button variant="outline-success">Complete</Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyTask;
