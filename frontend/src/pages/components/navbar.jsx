import "../css/navbar.css";
import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import EditProfile from "./editProfile";
import ChatSelection from "./chatSelection";
import "font-awesome/css/font-awesome.min.css";
import LikedPage from "./likedPage";
// import { set } from 'mongoose';

function NavbarProfile({ isOwner }) {
  const [showChat, setShowChat] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [isProfileClicked, setProfileClicked] = useState(false);
  const [isChatClicked, setChatClicked] = useState(true);
  const [isLikedClicked, setLikedClicked] = useState(false);

  return isOwner ? (
    <>
      <Row className="bkgd-color justify-content-center">
        <Col sm={3} className="center">
          <Button
            className={isProfileClicked ? "nav-btn-clicked" : "nav-btn"}
            onClick={() => {
              setShowChat(false);
              setProfileClicked(true);
              setChatClicked(false);
              setShowProfile(true);
            }}
          >
            Profile
          </Button>
        </Col>
        <Col sm={3} className="center">
          <Button
            className={isChatClicked ? "nav-btn-clicked " : "nav-btn "}
            onClick={() => {
              setShowChat(true);
              setChatClicked(true);
              setProfileClicked(false);
              setShowProfile(false);
            }}
          >
            Chat
          </Button>
        </Col>
      </Row>
      <Row>{showChat ? <ChatSelection /> : <EditProfile />}</Row>
    </>
  ) : (
    <>
      <Row className="bkgd-color justify-content-center">
        <Col sm={3} className="center">
          <Button
            className={isProfileClicked ? "nav-btn-clicked" : "nav-btn"}
            onClick={() => {
              setShowChat(false);
              setProfileClicked(true);
              setChatClicked(false);
              setLikedClicked(false);
              setShowProfile(true);
            }}
          >
            Profile
          </Button>
        </Col>
        <Col sm={3} className="center">
          <Button
            className={isLikedClicked ? "nav-btn-clicked " : "nav-btn "}
            onClick={() => {
              setShowChat(false);
              setChatClicked(false);
              setProfileClicked(false);
              setLikedClicked(true);
              setShowProfile(false);
            }}
          >
            Likes
          </Button>
        </Col>
        <Col sm={3} className="center">
          <Button
            className={isChatClicked ? "nav-btn-clicked " : "nav-btn "}
            onClick={() => {
              setShowChat(true);
              setChatClicked(true);
              setProfileClicked(false);
              setLikedClicked(false);
              setShowProfile(false);
            }}
          >
            Chat
          </Button>
        </Col>
      </Row>
      <Row>{showChat ? <ChatSelection /> : showProfile ? <EditProfile /> : <LikedPage />}</Row>
    </>
  );
}

export default NavbarProfile;
