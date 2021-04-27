import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import bp from "./bp";
import "./css/confirmPassword.css";
import logo from "../img/logo.png";

function EmailVerification() {
  // set this to true when u get a response by doing setConfirmed(true);
  const [isConfirmed, setConfirmed] = useState(false);
  const [code, setCode] = useState(""); // this is where the code is saved
  let resposne; // this is where you would save the response

  const doVerifyEmail = async (event) => {
    event.preventDefault();

    var obj = { emailToken: code };
    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("verifyEmail"),
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
            setConfirmed(true);
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

  return (
    <Container fluid className="page-color vh-100">
      <Row className="justify-content-center header-color">
        <img src={logo} className="Login-logo" alt="Woof logo" />
      </Row>
      <Row className="justify-content-center">
        <Container fluid className="confirm-container">
          <Row className="justify-content-center">
            <h4 className="instructions">To verify your email enter your confirmation code.</h4>
          </Row>
          <Row className="justify-content-center">
            <Form>
              <Form.Group className="confirmCodeTextbox" controlId="formPassword">
                {/* u can change the ref to whatever u need*/}
                {/* <Form.Label style={{ color: "white" }}>Confirmation Code:</Form.Label> */}
                <Form.Control type="text" placeholder="Confirmation Code" onChange={(c) => setCode(c.target.value)} />
              </Form.Group>
              {/* onClick call the verify email thing, just change the name */}
              <Button className="confirm-btn" onClick={doVerifyEmail}>
                Confirm
              </Button>
            </Form>
          </Row>
          {/* if is code is confirmed this will result true and display the span, all you have to do is save the response in a variable in and display it inside the span using the jsx {} */}
          <Row className="justify-content-center">
            {isConfirmed ? <span className="instructions-alert">Your email has been verified, you may now close this page.</span> : <span> </span>}
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default EmailVerification;
