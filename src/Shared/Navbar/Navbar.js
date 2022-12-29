import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const NavbarTop = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const [task, setTask] = useState("");

  const [submited, setSubmited] = useState("false");

  useEffect(() => {
    const keyDownHandler = (event) => {
      // console.log("User pressed:", event.key);
      if (event.key === "Enter") {
        event.preventDefault();
        const form = event.target;
        const email = user?.email;
        console.log(form.value, email);
        const task = {
          email,
          task: form.value,
        };
        console.log(email, task);

        fetch("http://localhost:8000/tasks", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(task),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              toast.success("Task Added Successfully");
            } else {
              toast.error(data.message);
            }
          });
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [user?.email]);

  return (
    <Navbar className="py-3" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand className="fs-2 fw-bold" href="#">
          Daily Tasks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Nav.Link className="fs-5 fw-semibold" href="#action1">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#action2" className="fs-5 fw-semibold">
              <Link to="/add-task">Add Task</Link>
            </Nav.Link>
            <Nav.Link href="#action2" className="fs-5 fw-semibold">
              <Link to="/my-task">My Task</Link>
            </Nav.Link>

            <Nav.Link href="#action2" className="fs-5 fw-semibold">
              <Link to="/completed-task">Completed Task</Link>
            </Nav.Link>
            {user?.uid ? (
              <Nav.Link
                onClick={handleLogOut}
                href="#action2"
                className="fs-5 fw-semibold"
              >
                <Link to="">LogOut</Link>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="#action2" className="fs-5 fw-semibold">
                  <Link to="/login">LogIn</Link>
                </Nav.Link>
                <Nav.Link href="#action2" className="fs-5 fw-semibold">
                  <Link to="/register">Register</Link>
                </Nav.Link>
              </>
            )}
          </Nav>

          {user?.uid ? (
            <>
              <Form className="d-flex">
                <Form.Control
                  name="task"
                  type="search"
                  onBlur={(event) => setTask(event.target.value)}
                  placeholder="Added Tasks"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </>
          ) : (
            <>
              <p className="text-danger fs-5 fw-semibold">
                please At First Login then Added Task
              </p>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
