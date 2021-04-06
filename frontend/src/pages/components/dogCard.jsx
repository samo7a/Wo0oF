import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useState } from "react";
import "../css/dogcard.css";
import goodDog from "../../img/goodest-dog.jpg";
import "font-awesome/css/font-awesome.min.css";
import "../css/buttons.css";

function DogCard(props) {
  const [isFlipped, setFlipped] = useState(false);
  const flipCard = () => setFlipped(!isFlipped);

  return (
    <Container fluid className="vh-100 bkgd-card-color">
      <Row className="justify-content-center">
        <Button className="flip-btn" onClick={flipCard}>
          {!isFlipped ? (
            <Card border="light" bg="light" className="dog-card">
              <Card.Img variant="top" src={goodDog} alt="Card Image" />
              <Card.Body className="center">
                <Card.Text className="dog-card-title">{props.name}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <Card border="light" bg="light" className="dog-card">
              <ListGroup className="dog-card-text">
                <ListGroupItem>Name: {props.name}</ListGroupItem>
                <ListGroupItem>Gender: {props.gender}</ListGroupItem>
                <ListGroupItem>Traits: {props.traits}</ListGroupItem>
                <ListGroupItem>Location: {props.location}</ListGroupItem>
                <ListGroupItem>Miscellaneous: {props.misc}</ListGroupItem>
              </ListGroup>
            </Card>
          )}
        </Button>
      </Row>
      <Row className="justify-content-center mt-4">
        {/* People would feel guilty disliking dogs so I changed it to heart or skip */}
        <Button className="like-button">
          <i class="fa fa-heart"></i>
        </Button>
        <Button className="dislike-button">
          <i class="fa fa-arrow-right"></i>
        </Button>
      </Row>
    </Container>
  );
}

export default DogCard;
