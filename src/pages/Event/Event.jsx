import { useDispatch, useSelector } from 'react-redux';
import './Event.css';
import { selectToken } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/apiCalls';

export const Event = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [event, setEvent] = useState([])

    useEffect(() => {
        if (rdxToken) {
            getAllEvents(rdxToken)
                .then(
                    response => {
                        setEvent(response.data.data);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, []);

    return (
        <div className="event-body">
            <div className='event-background'>
                <div className="event-container">
                    <h1>Event</h1>
                </div>
            </div>
        </div>
    );
};