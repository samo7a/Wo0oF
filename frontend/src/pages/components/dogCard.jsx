import { useState } from "react";
import { ListGroupItem, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/dogcard.css";
import "font-awesome/css/font-awesome.min.css";
import goodDog from "../../img/good-dog.jpeg";

function DogCard({ dog, removeDogCard }) {
  const [isFlipped, setFlipped] = useState(false);
  const flipCard = () => setFlipped(!isFlipped);

  return (
    <>
      
      {!isFlipped ? (
        <button className="flip-btn" onClick={flipCard}>
          <div className="dog-card" style={{backgroundImage: `url(${goodDog})`}}>
              <h3 className="dog-card-title">{dog.Name}</h3>
          </div>
        </button>
      ) : (
        <button className="flip-btn" onClick={flipCard}>
        <div className="dog-card" style={{fontSize: "22px"}}>
          <ListGroupItem><p>Name: </p>{dog.Name}</ListGroupItem>
          <ListGroupItem><p>Sex: </p>{dog.Sex}</ListGroupItem>
          <ListGroupItem><p>Breed: </p>{dog.Breed}</ListGroupItem>
          <ListGroupItem><p>Age: </p>{dog.Age}</ListGroupItem>
          <ListGroupItem><p>Height: </p>{dog.Height}</ListGroupItem>
          <ListGroupItem><p>Bio: </p>{dog.Bio}</ListGroupItem>
        </div>
        </button>
      )}
      <Row className="justify-content-center">
        <button className="like-button" onClick={() => removeDogCard(dog._id)}>
          <i className="fa fa-heart"></i>
        </button>
        <button className="dislike-button" onClick={() => removeDogCard(dog._id)}>
          <i className="fa fa-arrow-right"></i>
        </button>
      </Row>
    </>
  );
}

export default DogCard;
