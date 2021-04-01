import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from "react";
import '../css/editProfile.css';
import goodDog from "../../img/good-dog.jpeg";

function EditDog() {
    return(
       <div>
            <Row className="justify-content-center">
                <img className="profile-pic" src={goodDog}/>
            </Row>
            
            <p>Name: Max</p>
            <p>Gender: Male</p>
            <p>Traits: Good boy</p>
            <p>Location: ...</p>
            <p>Miscellaneous: Enjoys pets</p>

            <Row className="justify-content-center">
                <Button>Edit Dog</Button>
                <Button>Delete Dog</Button>
                <Link to="/home">Go Back</Link>
            </Row>
        </div>
    );
}

export default EditDog;