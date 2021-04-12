import { useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/dogcard.css";
import "font-awesome/css/font-awesome.min.css";
import goodDog from "../../img/good-dog.jpeg";

function DogCard({ dog, removeDogCard }) {
  const [isFlipped, setFlipped] = useState(false);
  const flipCard = () => setFlipped(!isFlipped);

  return (
    <>
      <Button className="flip-btn" onClick={flipCard}>
        {!isFlipped ? (
          <Card className="dog-card">
            <Card.Img className="dog-card-img" variant="top" src={goodDog} alt="Card Image" />
            <Card.Body className="center">
              <Card.Text className="dog-card-title">{dog.Name}</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <Card border="light" bg="light" className="dog-card">
            <Card.Body className="dog-card-text">
              <ListGroup>
                <ListGroupItem>Name: {dog.Name}</ListGroupItem>
                <ListGroupItem>Gender: {dog.Sex}</ListGroupItem>
                <ListGroupItem>Breed: {dog.Breed}</ListGroupItem>
                <ListGroupItem>Age: {dog.Age}</ListGroupItem>
                {/* <ListGroupItem>Weight: {dog.Weight}</ListGroupItem> */}
                <ListGroupItem>Height: {dog.Height}</ListGroupItem>
                <ListGroupItem>Bio: {dog.Bio}</ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </Button>
      <Button className="like-button" onClick={() => removeDogCard(dog._id)}>
        <i className="fa fa-heart"></i>
      </Button>
      <Button className="dislike-button" onClick={() => removeDogCard(dog._id)}>
        <i className="fa fa-arrow-right"></i>
      </Button>
    </>
  );
}

export default DogCard;
