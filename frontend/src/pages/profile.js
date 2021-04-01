import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import goodDog from '../img/good-dog.jpeg';
import ViewProfile from './components/viewProfile';
import Header from './components/header';
import NavbarProfile from './components/navbar';
import './css/profile.css';
import React, { useState } from 'react'
import EditProfile from './components/editProfile';


function Profile() {
    const [isEditing, setEditing] = useState(false);
    const handleEditing = () => setEditing(!isEditing);

    return(
        <Container fluid className="vh-100 profile-page-back">
            <Header name="Iwanna Dog" />
            <NavbarProfile /> 
            <Row className="justify-content-center">
                <Col md={6}>
                    <Container fluid className="vw-50 profile-page-front">
                        { !isEditing ?
                            <>
                                <ViewProfile fname="Dog" lname="Adopter" email="example@email.com" bio="About me"/>
                                <Row className="justify-content-center">
                                    <Button className="update_profile_button" onClick={handleEditing}>
                                        Edit Profile
                                    </Button>
                                </Row>
                            </>
                            :
                            <>
                                <EditProfile />
                                <Row className="justify-content-center">
                                    <Button className="update_profile_button" onClick={handleEditing}>
                                        Confirm
                                    </Button>
                                </Row>
                            </>
                        }
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;