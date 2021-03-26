import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../css/buttons.css';
import 'font-awesome/css/font-awesome.min.css';

function LikeButton() {
    return (
        <div>
            <Button className="like-button"><i class="fa fa-check"></i></Button>
        </div>
    );
}

export default LikeButton;