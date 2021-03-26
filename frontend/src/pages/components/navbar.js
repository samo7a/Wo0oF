import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button } from 'react-bootstrap';
import '../css/navbar.css';

function NavbarProfile() {
    return(
        <div className="bkgd-color w-100">
            <div className="center">
                <Button className="nav-btn m-right" onclick="">Profile</Button>
                <Button className="nav-btn" onclick="">Messages</Button>
            </div>
        </div>
    );
}

export default NavbarProfile;