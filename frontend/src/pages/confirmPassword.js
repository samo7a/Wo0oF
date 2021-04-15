import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import bp from "./bp";
import "./css/confirmPassword.css";
import logo from "../img/logo.png";

function ConfirmPassword() {
  let newPassword;
  let confirmPassword;
  let resetToken;

  const [isMatching, setMatching] = useState(true);

  const doConfirmPwd = async (event) => {
    event.preventDefault();

    if (newPassword.value !== confirmPassword.value) {
      setMatching(false);
    } else {
      var obj = { resetToken: resetToken.value, newPassword: newPassword.value };
      var js = JSON.stringify(obj);

      try {
        // Axios code follows
        var config = {
          method: "post",
          url: bp.buildPath("confirmResetPassword"),
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
    }
  };

  return (
    <Container fluid className="page-color vh-100">
      <Row className="justify-content-center header-color">
        <img src={logo} className="Login-logo" alt="Woof logo" />
      </Row>
      <Row>
        <Container fluid className="confirm-container">
          <Row className="justify-content-center">
            <h4 className="instructions">Enter your new password.</h4>
          </Row>
          <Row className="justify-content-center">
            <Form>
              <Form.Group className="confirmCodeTextbox" controlId="formPassword">
                <Form.Control type="text" placeholder="Confirmation Code" ref={(c) => (resetToken = c)} />
              </Form.Group>

              <Form.Group className="newPasswordTextbox" controlId="formPassword">
                <Form.Control type="password" placeholder="New Password" ref={(c) => (newPassword = c)} />
              </Form.Group>

              <Form.Group className="confirmNewPasswordTextbox" controlId="formPassword">
                <Form.Control type="password" placeholder="Confirm New Password" ref={(c) => (confirmPassword = c)} />
              </Form.Group>

              <Button className="confirm-btn" onClick={doConfirmPwd}>
                Confirm Password
              </Button>
            </Form>
          </Row>
          <Row className="justify-content-center">
            {isMatching ? <span></span> : <span className="instructions-alert">Passwords do not match </span>}
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default ConfirmPassword;
