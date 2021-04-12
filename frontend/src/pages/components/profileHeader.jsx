import { Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css";

const doLogout = (event) => {
  event.preventDefault();

  localStorage.removeItem("user_data");
  window.location.href = "/";
};

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
            <Button className="sign-out-btn" onClick={doLogout}>
              Sign Out
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ProfileHeader;
