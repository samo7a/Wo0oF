import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";
import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import EditProfile from "./editProfile";
import Chat from "./chat";
import "font-awesome/css/font-awesome.min.css";
import LikedDogs from "./likedDogs";
// import { set } from 'mongoose';

function NavbarProfile() {
  const [showChat, setShowChat] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [isProfileClicked, setProfileClicked] = useState(false);
  const [isChatClicked, setChatClicked] = useState(true);
  const [isDogsClicked, setDogsClicked] = useState(false);

  return (
    <>
      <Row className="bkgd-color justify-content-center">
        <Col sm={3} className="center">
          <Button
            className={isProfileClicked ? "nav-btn-clicked" : "nav-btn"}
            onClick={() => {
              setShowChat(false);
              setProfileClicked(true);
              setChatClicked(false);
              setDogsClicked(false);
              setShowProfile(true);
            }}
          >
            Profile
          </Button>
        </Col>
        <Col sm={3} className="center">
          <Button
            className={isDogsClicked ? "nav-btn-clicked " : "nav-btn "}
            onClick={() => {
              setShowChat(false);
              setChatClicked(false);
              setProfileClicked(false);
              setDogsClicked(true);
              setShowProfile(false);
            }}
          >
            Liked
          </Button>
        </Col>
        <Col sm={3} className="center">
          <Button
            className={isChatClicked ? "nav-btn-clicked " : "nav-btn "}
            onClick={() => {
              setShowChat(true);
              setChatClicked(true);
              setProfileClicked(false);
              setDogsClicked(false);
              setShowProfile(false);
            }}
          >
            Chat
          </Button>
        </Col>
      </Row>
      <Row>{showChat ? <Chat /> : showProfile ? <EditProfile /> : <LikedDogs />}</Row>
    </>
  );
}

export default NavbarProfile;
