import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col, Card} from 'react-bootstrap';
import { useState } from "react";
import '../css/editProfile.css';
import goodDog from "../../img/good-dog.jpeg";


function EditProfile() {
    return(
        <Container fluid className="vh-100"> 
            <Row className="justify-content-center">
                <img className="profile-pic" src={goodDog}/>
            </Row>
            
            <Form.Group className ="first_name">
                <Form.Control placeholder="First Name" />
            </Form.Group>
            
            <Form.Group className ="last_name">
                <Form.Control placeholder="Last Name" />
            </Form.Group>
            
            <Form.Group className ="email">
                <Form.Control placeholder="Email" />
            </Form.Group>

            <Form.Group className ="location">
                <Form.Control placeholder="Location" />
            </Form.Group>
            
            <Form.Group className ="biography">
                <Form.Control placeholder="Biography" />
            </Form.Group>
            
            <Row className="justify-content-center">
                <Button className="update_profile_button">Update Profile</Button>
            </Row>
        </Container>
    );
}

export default EditProfile;