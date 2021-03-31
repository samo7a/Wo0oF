import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../img/logo.png";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { useState } from "react";
import ProfileHeader from './components/profileHeader';
import Header from './components/header';
import NavbarProfile from './components/navbar';
import DogCard from './components/dogCard';
import EditProfile from './components/editProfile';
import DogManager from './components/dogManager';
import EditDog from './components/editDog';

function Home() {
    return(
        <Container fluid className="vh-100 overflow-hidden">
            <Header name="Iwanna Dog" />
            <NavbarProfile />   
        </Container>
    );
}

export default Home;