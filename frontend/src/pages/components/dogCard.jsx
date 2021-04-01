import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { useState } from "react";
import LikeButton from './like';
import DislikeButton from './dislike';
import '../css/dogcard.css';
import goodDog from "../../img/good-dog.jpeg";
import 'font-awesome/css/font-awesome.min.css';

function DogCard(props) {
    const [isFlipped, setFlipped] = useState(false);
    const flipCard = () => setFlipped(!isFlipped);

    if (!isFlipped) {
        return(
            <Container fluid className=" bkgd-card-color"> 
                <Row className="justify-content-center">
                    <Card border="light" bg="light" className="dog-card">
                        <Card.Img variant="top" src={goodDog}/>
                        <Card.Body className="center">
                            <Card.Text className="dog-card-title">{props.name}</Card.Text>
                            <Button className="flip-btn" onClick={flipCard}>
                                <i class="fa fa-repeat"></i>
                            </Button>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md={{ span: 3, offset: 3 }}>
                        <DislikeButton />
                    </Col>
                    <Col  md={6}>
                        <LikeButton />
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return(
            <Container fluid className=" bkgd-card-color"> 
                <Row className="justify-content-center">
                    <Card border="light" bg="light" className="dog-card">
                        <ListGroup className="dog-card-text">
                            <ListGroupItem>Name: Max</ListGroupItem>
                            <ListGroupItem>Gender: Male</ListGroupItem>
                            <ListGroupItem>Traits: Good boy</ListGroupItem>
                            <ListGroupItem>Location: ...</ListGroupItem>
                            <ListGroupItem>Miscellaneous: Please adopt me</ListGroupItem>
                        </ListGroup>
                        <Card.Body className="center">
                            <Button className="flip-btn" onClick={flipCard}>
                                <i class="fa fa-repeat"></i>
                            </Button>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md={{ span: 3, offset: 3 }}>
                        <DislikeButton />
                    </Col>
                    <Col  md={6}>
                        <LikeButton />
                    </Col>
                </Row>
            </Container>
        );
    }
    
}

export default DogCard;