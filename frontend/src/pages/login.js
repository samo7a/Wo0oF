// import React from "react";
import logo from "../img/logo.png";
import dogLogin from "../img/good-dog.jpeg";
import "./css/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const bp = require("../bp.js");
  const storage = require("../tokenStorage.js");

  // Input variables to be sent via JSON
  var email;
  var password;
  var location;
  var firstName;
  var lastName;
  var profilePicture;
  var shortBio;
  var newPassword;
  var confirmPassword;

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { Email: email.value, Password: password.value };
    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("login"),
        headers: {
          "Content-Type": "application/json",
        },

        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;

          if (res.error) {
            console.log(res);
            window.location.href = "/";
          } else {
            storage.storeToken(res);
            window.location.href = "/home";
          }
        })
        .catch(function (error) {
          // setMessage(error);
        });
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const doSignUp = async (event) => {
    event.preventDefault();

    var obj = { Email: email.value, Password: password.value, FirstName: firstName.value, LastName: lastName.value, isOwner: checked };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("signup"),
        headers: {
          "Content-Type": "application/json",
        },

        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;

          if (res.error) {
            console.log(res);
          } else {
            window.location.href = "/";
          }
        })
        .catch(function (error) {
          // setMessage(error);
        });
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const doResetPassword = async (event) => {

    var obj = { Email: email.value };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("resetPassword"),
        headers: {
          "Content-Type": "application/json",
        },

        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;

          if (res.error) {
            console.log(res);
          } else {
            window.location.href = "/";
          }
        })
        .catch(function (error) {
          // setMessage(error);
        });
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

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
    doResetPassword();
  };

  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked);

  return (
    <Container fluid className="vh-100 overflow-hidden">
      {/* Logo */}
      <Row className="justify-content-center header-color">
        <img src={logo} className="Login-logo" />
      </Row>

      {/* Description */}
      <Row className="background justify-content-center">
        <p className="login-text">
          Let us help you find your new best friend. Woof helps connect dogs with the people that can provide them a loving home.
        </p>
      </Row>

      <Row className="background">
        {/* Card Form */}
        <Col className="justify-content-center">
          <Card className="w-50 h-100 mx-auto">
            <Card.Body>
              <Form>
                <Form.Group className="emailTextbox" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email Address " ref={(c) => (email = c)} />
                </Form.Group>

                <Form.Group className="passwordTextbox" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" ref={(c) => (password = c)} />
                </Form.Group>

                <Row className="justify-content-center">
                  <Button className="login-btn" onClick={doLogin}>
                    Login
                  </Button>
                </Row>
                <Row className="justify-content-center">
                  <Button className="signup-btn" onClick={handleShowSignUp}>
                    Sign Up
                  </Button>
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
      <Row className="background vh-100"></Row>

      {/* Signup */}
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up For Woof</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="firstNameTextbox" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="First Name" ref={(c) => (firstName = c)} />
          </Form.Group>

          <Form.Group className="lastNameTextbox" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Last Name" ref={(c) => (lastName = c)} />
          </Form.Group>

          <Form.Group className="emailTextbox" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email Address" ref={(c) => (email = c)} />
          </Form.Group>

          <Form.Group className="passwordTextbox" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" ref={(c) => (password = c)} />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I Am An Owner" onClick={handleClick} checked={checked}/>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button className="signup-btn" onClick={doSignUp}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reset Password Modal */}
      <Modal show={showResetPassword} onHide={handleCloseResetPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Your Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Enter your email and we'll send you an email to reset your password.</p>
          <Form.Group className="emailTextbox" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email Address" ref={(c) => (email = c)} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button className="signup-btn" onClick={handleShowConfirmation}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password Reset</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Enter your new password.</p>

          <Form.Group className="newPasswordTextbox" controlId="formPassword">
            <Form.Control type="password" placeholder="New Password" ref={(c) => (newPassword = c)} />
          </Form.Group>

          <Form.Group className="confirmNewPasswordTextbox" controlId="formPassword">
            <Form.Control type="password" placeholder="Confirm New Password" ref={(c) => (confirmPassword = c)} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button className="signup-btn" onClick={handleCloseConfirmation}>
            Confirm Password
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Login;
