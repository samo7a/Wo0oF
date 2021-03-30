// import React from "react";
import logo from "../img/logo.png";
import dogLogin from "../img/good-dog.jpeg";
import "./css/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from "react";

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

  const [showResetPassword, setShowResetPassword] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleShowConfirmation = () => {
    setShowConfirmation(true);
    setShowResetPassword(false);
  }

  return (
    <Container fluid className= "vh-100 overflow-hidden">

      {/* Logo */}
      <Row className="justify-content-center header-color">
          <img src={logo} className="Login-logo"/>
      </Row>

      {/* Description */}
      <Row className="background justify-content-center">
        <p className="login-text">
          Let us help you find your new best friend. Woof helps connect dogs
          with the people that can provide them a loving home.
        </p>
      </Row>

      <Row className="background">
        {/* Card Form */}
        <Col className="justify-content-center">
          <Card className="w-50 h-100 mx-auto">
            <Card.Body>
              <Form.Group className ="newPasswordTextbox" controlId="formPassword">
                <Form.Control type="password" placeholder="New Password" />
              </Form.Group>

              <Form.Group className ="confirmNewPasswordTextbox" controlId="formPassword">
                <Form.Control type="password" placeholder="Confirm New Password" />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Dont touch */}
      <Row className="background vh-100">
      </Row>
    </Container>
  );
}

export default ResetPassword;
