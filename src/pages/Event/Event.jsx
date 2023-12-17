import { useDispatch, useSelector } from 'react-redux';
import './Event.css';
import { selectToken } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllEvents  } from '../../services/apiCalls';
import { CreateEventCard } from '../../common/CreateEventCard/CreateEventCard';
import { EventCard } from '../../common/EventCard/EventCard';
import { jwtDecode } from 'jwt-decode';

export const Event = () => {

    const rdxToken = useSelector(selectToken);
    const tokenDecoded = jwtDecode(rdxToken);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [event, setEvent] = useState([])
    const [role, setRole] = useState('');

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
    }, [rdxToken, navigate]);

    return (
        <div className="event-body">
            <div className='create-event-modal'>
                {
                    tokenDecoded.role === "admin" || tokenDecoded.role === "super_admin" &&
                    <CreateEventCard />
                }
            </div>
            <div className='line-div'>Here are all the events </div>
            <div className='event-background'>
                {
                    [...event].reverse().map((event, index) => (
                        <EventCard
                            key={index}
                            eventId={event.id}
                            title={event.title}
                            content={event.content}
                            date={event.event_date}
                            time={event.event_time}
                            creator={event.user_id}
                            role={role}
                        />
                    ))}
            </div>
        </div>
    )
};