import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import DogCard from './components/dogCard';
import Header from './components/header';
import NavbarProfile from './components/navbar';

function Home() {
    return(
        <Container fluid className="vh-100">
            <Header name="Iwanna Dog" />
            <NavbarProfile /> 
            <Row>
                <DogCard name="Max" />  
            </Row>
        </Container>
    );
}

export default Home;