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

  const handleCloseResetPassword = () => setShowResetPassword(false);
  const handleShowResetPassword = () => setShowResetPassword(true);

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
              <Form>
                <Form.Group className ="emailTextbox" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>

                <Form.Group className ="passwordTextbox" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Row className="justify-content-center">
                  <Link className="login-btn" to="/home">Login</Link>
                </Row>
                <Row className="justify-content-center">
                  <Button className="signup-btn" onClick={handleShowSignUp}>Sign Up</Button>
                </Row>
                <Row className="justify-content-center">
                  <Button className="frgtpwd" onClick={handleShowResetPassword}>
                    Forgot your password? 
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Dog Photo */}
        <Col className="justify-content-center">
          <div className="w-50 h-100 mx-auto">
            <img src={dogLogin} className="w-100 h-100" />
          </div>
        </Col>
      </Row>
      
      {/* Dont touch */}
      <Row className="background vh-100">
      </Row>

      {/* Signup */}
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up For Woof</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form.Group className ="firstNameTextbox" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="First Name" />
          </Form.Group>

          <Form.Group className ="lastNameTextbox" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Last Name" />
          </Form.Group>

          <Form.Group className ="emailTextbox" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email Address" />
          </Form.Group>

          <Form.Group className ="passwordTextbox" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I Am An Owner" />
          </Form.Group>

        </Modal.Body>
        
        <Modal.Footer className="justify-content-center">
            <Button className="signup-btn">Sign Up</Button>
        </Modal.Footer>
      </Modal>

      {/* Reset Password Modal */}
      <Modal show={showResetPassword} onHide={handleCloseResetPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Your Password</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <p>
            Enter your email and we'll send you a confirmation code to reset your password.
          </p>
          <Form.Group className ="emailTextbox" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email Address" />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer className="justify-content-center">
            <Button className="signup-btn" onClick={handleShowConfirmation}>Reset Password</Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password Reset</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <p>
            Enter your confirmation code to reset your password.
          </p>

          <Form.Group className ="newPasswordTextbox" controlId="formPassword">
            <Form.Control type="password" placeholder="New Password" />
          </Form.Group>

          <Form.Group className ="confirmNewPasswordTextbox" controlId="formPassword">
            <Form.Control type="password" placeholder="Confirm New Password" />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer className="justify-content-center">
            <Button className="signup-btn" onClick={handleCloseConfirmation}>Confirm Password</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Login;
