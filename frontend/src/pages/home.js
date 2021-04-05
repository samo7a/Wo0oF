import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from './components/profileHeader';
import NavbarProfile from './components/navbar';
import DogCard from './components/dogCard';
import DogManager from './components/dogManager';

function Home() {

    return (
        <Container fluid className="vh-100 overflow-hidden">
            <Row>
                <ProfileHeader name="Name" page="Home" />
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
                        {/* <DogCard name="Murry" /> */}
                        <DogManager />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;