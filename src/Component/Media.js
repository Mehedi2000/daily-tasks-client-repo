import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Media = () => {
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/addTask`);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center mb-5">This is Media Route</h2>

      <div className="d-sm-inline-flex d-lg-flex gap-2">
        {tasks.map((singleTask) => (
          <Card key={singleTask._id} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={singleTask.img}
              style={{ height: "10rem" }}
            />
            <Card.Body>
              <Card.Title>{singleTask.task}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Media;
