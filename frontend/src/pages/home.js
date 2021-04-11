import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import ProfileHeader from "./components/profileHeader";
import NavbarProfile from "./components/navbar";
import DogCard from "./components/dogCard";
import DogManager from "./components/dogManager";

function Home() {
  const storage = require("../tokenStorage.js");
  const jwt = require("jsonwebtoken");

  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });

  var userID = ud.payload.userId;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;
  const fullName = firstName + " " + lastName;
  var isOwner = ud.payload.isOwner;

  return (
    <Container fluid className="vh-100 overflow-hidden">
      <Row>
        <ProfileHeader name={fullName} page="Woof" />
      </Row>
      <Row>
        {/* Left column displaying The navigation bar
                and profile or chat under it*/}
        <Col sm={3}>
          <NavbarProfile />
        </Col>
        {/* Right Column showing home for owner or adopter*/}
        <Col sm={9}>
          <Row>{isOwner === false ? <DogCard name="Murry" /> : <DogManager />}</Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
