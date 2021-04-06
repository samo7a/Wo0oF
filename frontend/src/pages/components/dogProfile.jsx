import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/dogmanager.css";
import "font-awesome/css/font-awesome.min.css";
import goodDog from "../../img/good-dog.jpeg";

function DogProfile() {
  const [details, setShow] = useState(false);
  const showDetails = () => setShow(true);
  const hideDetails = () => setShow(false);

  return (
    <>
      <Link to="/dogprofile" className="dog-profile-btn" onClick={showDetails}>
        <Card border="light" bg="light" className="dog-profile-card">
          <Card.Img variant="top" src={goodDog} />
        </Card>
      </Link>
    </>
  );
}

export default DogProfile;
