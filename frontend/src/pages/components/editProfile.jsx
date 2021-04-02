import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { Container, Row } from 'react-bootstrap';
import { useState } from "react";
import '../css/editProfile.css';
import profilePic from "../../img/def-pic.jpg";


function EditProfile() {
    const [isEditing, setEditMode] = useState(false);

    return (
        <Container fluid className="">
            {isEditing ?
                <>
                    <Row className="justify-content-center">
                        <img className="profile-pic" src={profilePic} />
                    </Row>

                    <Form.Group className="first_name">
                        <Form.Control placeholder="First Name" />
                    </Form.Group>

                    <Form.Group className="last_name">
                        <Form.Control placeholder="Last Name" />
                    </Form.Group>

                    <Form.Group className="email">
                        <Form.Control placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="biography">
                        <Form.Control placeholder="Biography" />
                    </Form.Group>
                    <Row className="justify-content-center">
                        <Button className="edit-prof-btn" onClick={() => setEditMode(false)}>
                            Confirm
                        </Button>
                    </Row>
                </>
                :
                <>
                    <Row className="justify-content-center">
                        <img className="profile-pic" src={profilePic} />
                    </Row>
                    <p>Name: </p>
                    <br />
                    <p>Email: </p>
                    <br />
                    <p>Location: </p>
                    <br />
                    <p>Bio: </p>
                    <br />
                    <Row className="justify-content-center">
                        <Button className="edit-prof-btn" onClick={() => setEditMode(true)}>
                            Edit Profile
                        </Button>
                    </Row>
                </>
            }
        </Container>
    );
}

export default EditProfile;