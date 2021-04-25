import "../css/navbar.css";
import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import EditProfile from "./editProfile";
import "font-awesome/css/font-awesome.min.css";
import LikedPage from "./likedPage";

function NavbarProfile({ isOwner, updateLikedDogs }) {
  const [showProfile, setShowProfile] = useState(false);
  const [isProfileClicked, setProfileClicked] = useState(false);
  const [isLikedClicked, setLikedClicked] = useState(true);

  return isOwner ? (
    <>
      <Row className="bkgd-color justify-content-center" style={{ height: "5vh" }}>
        <Col sm={4} className="center">
          <Button
            className={isProfileClicked ? "nav-btn-clicked" : "nav-btn"}
            onClick={() => {
              setProfileClicked(true);
              setLikedClicked(false);
              setShowProfile(true);
            }}
          >
            Profile
          </Button>
        </Col>
        <Col sm={4} className="center">
          <Button
            className={isLikedClicked ? "nav-btn-clicked " : "nav-btn "}
            onClick={() => {
              setProfileClicked(false);
              setLikedClicked(true);
              setShowProfile(false);
            }}
          >
            Likes
          </Button>
        </Col>
      </Row>
      <Row>{showProfile ? <EditProfile /> : <LikedPage />}</Row>
    </>
  ) : (
    <>
      <Row className="bkgd-color justify-content-center" style={{ height: "5vh" }}>
        <Col sm={4} className="center">
          <Button
            className={isProfileClicked ? "nav-btn-clicked" : "nav-btn"}
            onClick={() => {
              setProfileClicked(true);
              setLikedClicked(false);
              setShowProfile(true);
            }}
          >
            Profile
          </Button>
        </Col>
        <Col sm={4} className="center">
          <Button
            className={isLikedClicked ? "nav-btn-clicked " : "nav-btn "}
            onClick={() => {
              setProfileClicked(false);
              setLikedClicked(true);
              setShowProfile(false);
            }}
          >
            Likes
          </Button>
        </Col>
      </Row>
      <Row>{showProfile ? <EditProfile /> : <LikedPage updateLikedDogs={updateLikedDogs} />}</Row>
    </>
  );
}

export default NavbarProfile;
