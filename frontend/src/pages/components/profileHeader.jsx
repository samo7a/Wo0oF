import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css";
import profilePic from "../../img/def-pic.jpg";

function ProfileHeader(props) {
  return (
    <>
      <Col sm={12} className="bkgd-color1">
        <Row className="justify-content-start h-100">
          <Col sm={4}>
            <p className="profile-header-name">{props.name}</p>
          </Col>
          <Col sm={4}>
            <p className="header-name">{props.page}</p>
          </Col>
          <Col sm={4} className="pt-1">
            <Link to="/" className="sign-out-btn">
              Sign Out
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ProfileHeader;
