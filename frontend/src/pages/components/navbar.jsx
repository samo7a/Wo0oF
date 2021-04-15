import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";
import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import EditProfile from "./editProfile";
import Chat from "./chat";
import "font-awesome/css/font-awesome.min.css";
// import { set } from 'mongoose';

function NavbarProfile() {
  const [showChat, setShowChat] = useState(true);
  const [isProfileClicked, setProfileClicked] = useState(false);
  const [isChatClicked, setChatClicked] = useState(true);

  return (
    <>
      <Row className="bkgd-color justify-content-center">
        <Col sm={4} className="center">
          <Button
            className={isProfileClicked ? "nav-btn-clicked" : "nav-btn"}
            onClick={() => {
              setShowChat(false);
              setProfileClicked(true);
              setChatClicked(false);
            }}
          >
            Profile
          </Button>
        </Col>
        <Col sm={4} className="center">
          <Button
            className={isChatClicked ? "nav-btn-clicked " : "nav-btn "}
            onClick={() => {
              setShowChat(true);
              setChatClicked(true);
              setProfileClicked(false);
            }}
          >
            Messages
          </Button>
        </Col>
      </Row>
      <Row>{showChat ? <Chat /> : <EditProfile />}</Row>
    </>
  );
}

export default NavbarProfile;
