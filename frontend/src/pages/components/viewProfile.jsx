import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button} from 'react-bootstrap';
import '../css/editProfile.css';
import goodDog from "../../img/good-dog.jpeg";

function ViewProfile(props) {
    return (
        <>
            <Row className="justify-content-center">
                <img className="profile-pic" src={goodDog} />
            </Row>
            <Row>
                <h4>Name:</h4>
                <p>{props.fname} {props.lname}</p>
            </Row>
            <Row>
                <h4>Email:</h4>
                <br />
                <p>{props.email}</p>
            </Row>
            <Row>
                <h4>Bio:</h4>
                <br />
                <p>{props.bio}</p>
            </Row>
        </>
    );
}

export default ViewProfile;