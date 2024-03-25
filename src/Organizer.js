import { useNavigate } from "react-router-dom";

function Organizer(){
    const navigate = useNavigate();

    const handleonClick = () => {
        navigate('create_event');
    }

    return(
        <div>
            <p>Hello</p>
            <button onClick={handleonClick}>Create Event</button>
        </div>
    );
}

export default Organizer