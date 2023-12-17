import { useSelector } from 'react-redux';
import { DeleteLink } from '../DeleteLink/DeleteLink';
import './EventCard.css';
import { selectToken } from '../../pages/userSlice';
import { jwtDecode } from 'jwt-decode';
import { deleteEvent, getAllJoinedEvents, joinEvent, unjoinEvent } from '../../services/apiCalls';
import { LinkButton } from '../LinkButton/LinkButton';
import { useEffect, useState } from 'react';

export const EventCard = ({ eventId, title, content, date, time, creator }) => {

    const rdxToken = useSelector(selectToken);
    const tokenDecoded = jwtDecode(rdxToken);

    const deletedEvent = (id) => {
        deleteEvent(rdxToken, id)
            .then(response => {
                props.onDeleteFeed(id);
            })
            .catch(error => console.log(error));
    }
    // obtengo a todos los usuarios que se unieron a un evento
    const [joinUsers, setJoinUsers] = useState([]);

    useEffect(() => {
        getAllJoinedEvents(rdxToken, eventId)
            .then(response => {
                if (response.data.data && response.data.data.length > 0) {
                    setJoinUsers(response.data.data);
                } else {
                    setJoinUsers([]);
                }
            })
            .catch(error => console.log(error));

        // if (isJoined) {
        //     handleJoin();
        // }
    }, []) 

    // compruebo si estoy unido a un evento
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        for (let i = 0; i < joinUsers.length; i++) {
            if (joinUsers[i].user_id == parseInt(tokenDecoded.sub)) {
                setIsJoined(true);
                break;
            } else {
                setIsJoined(false);
            }
        }
    }, [joinUsers]);


    const handleJoin = () => {
        if (!isJoined) {
            joinEvent(rdxToken, eventId)
                .then(response => { 
                    setIsJoined(true);
                })
                .catch(error => console.log(error));
        } else if (isJoined) {
            unjoinEvent(rdxToken, eventId)
                .then(response => { 
                    setIsJoined(false);
                })
                .catch(error => console.log(error));
        }
    }



    return (
        <div className='card-event'>
            <div className='delete-card-event'>
                {
                    parseInt(tokenDecoded.sub, 10) === creator &&
                    <DeleteLink
                        deleted={() => deletedEvent(eventId)}
                        title={<div className="button-delete-comment" >
                            <img className="del" src="https://cdn-icons-png.flaticon.com/512/58/58326.png" alt="" />
                        </div>}
                    />
                }
            </div>
            <div className="event-card" >
                <div className='event-info' key={eventId}>
                    <div className='desc'>Title: </div>
                    <div className="event-title">{title}</div>
                    <div className='desc'>Content: </div>
                    <div className="event-content">{content}</div>
                    <div className='desc'>Date: </div>
                    <div className="event-date">{date}</div>
                    <div className='desc'>Time: </div>
                    <div className="event-time">{time}</div>

                </div>

            </div>
            <div className='join-event'>
                <button className='join-event-button' onClick={() => handleJoin()}> {!isJoined ? 'Join' : 'Withdraw'}
                </button>
            </div>

        </div>
    )
};