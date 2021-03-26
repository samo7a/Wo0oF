import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { useState } from "react";
import ProfileHeader from './components/profileHeader';
import Header from './components/header';
import NavbarProfile from './components/navbar';
import DogCard from './components/dogCard';
import EditProfile from './components/editProfile';

function Home() {
    return(
        <Container fluid className="vh-100 overflow-hidden">
            <Row>
                <ProfileHeader name="Chris"/>
                <Header name="Home"/>
            </Row>
            <Row>
                <Col sm={4}>
                    <Row>
                        <NavbarProfile />
                    </Row>
                    <Row>
                        <EditProfile />
                    </Row>
                </Col>
                <Col sm={8}>
                    <Row>
                        <DogCard name="Max" />
                    </Row>
                </Col>
            </Row>

            {/* 
                Dynamically create messages with
                profile header 
            */}

        </Container>
    );
}

export default Home;