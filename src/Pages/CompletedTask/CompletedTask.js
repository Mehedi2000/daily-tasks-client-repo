import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const CompletedTask = () => {
  const task = useLoaderData();

  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/tanstack/query").then((res) =>
        res.json()
      ),
  });

  const handleDeleteTask = (single) => {
    console.log(single);
    fetch(`http://localhost:8000/completedTask/${single._id}`, {
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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 fw-bold">
        Completed Task : <span className="text-primary">{task.task}</span>
      </h2>
      <div className="d-flex mb-3 gap-2 justify-content-center">
        <div className="bg-secondary rounded-2">
          <p className="fs-5 py-2 px-3 text-light fw-bold">{task.task}</p>
        </div>
        <Link>
          <Button
            variant="outline-danger"
            onClick={() => handleDeleteTask(task)}
          >
            Delete
          </Button>
        </Link>
        <Link to={"/my-task"}>
          <Button variant="outline-success">Not Complete</Button>
        </Link>
      </div>
    </div>
  );
};

export default CompletedTask;
