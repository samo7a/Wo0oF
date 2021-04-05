import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../css/dogmanager.css';
import 'font-awesome/css/font-awesome.min.css';
import DogProfile from './dogProfile';

function DogManager() {
    //usestate

    return (
        <Container fluid className="vh-100 bkgd-manager-color">
            <Button className="add-button">Add Dog <i class="fa fa-plus-square"></i></Button>
            <Row className="justify-content-center">
                <DogProfile />
            </Row>
        </Container>
    );
}

export default DogManager;