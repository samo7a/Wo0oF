import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { useState } from "react";
import ProfileHeader from './components/profileHeader';
import Header from './components/header';
import NavbarProfile from './components/navbar';
import DogCard from './components/dogCard';

function Home() {

    return (
        <Container fluid className="vh-100 overflow-hidden">
            <Row>
                <ProfileHeader name="Chris" />
                <Header name="Home" />
            </Row>
            <Row>
                {/* Left column displaying The navigation bar
                and profile or chat under it*/}
                <Col sm={4}>
                    <NavbarProfile />
                </Col>
                {/* Right Column showing home for owner or adopter*/}
                <Col sm={8}>
                    <Row>
                        <DogCard name="Max" />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;