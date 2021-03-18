// import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import logo from "../logo.png";
// // import "../App.css";
import { Form, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Home">
      <header className="App-header">
        <img source={logo} className="App-logo" alt="logo" />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </header>
    </div>
  );
}

export default Home;
