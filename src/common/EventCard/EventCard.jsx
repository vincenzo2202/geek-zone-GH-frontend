import { useSelector } from 'react-redux';
import { DeleteLink } from '../DeleteLink/DeleteLink';
import './EventCard.css';
import { selectToken } from '../../pages/userSlice';
import { jwtDecode } from 'jwt-decode';
import { deleteEvent, getAllJoinedEvents, joinEvent, unjoinEvent } from '../../services/apiCalls';
import { LinkButton } from '../LinkButton/LinkButton';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

export const EventCard = ({ eventId, title, content, date, time, creator, role, onDeleteEvent }) => {

    const rdxToken = useSelector(selectToken);
    const tokenDecoded = jwtDecode(rdxToken); 

    const deletedEvent = (eventId) => {
        console.log(eventId);
        console.log(rdxToken);
        deleteEvent(rdxToken, eventId)
            .then(response => {
                console.log('deleted');
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
                    return getAllJoinedEvents(rdxToken, eventId);
                })
                .then(response => {
                    if (response.data.data && response.data.data.length > 0) {
                        setJoinUsers(response.data.data);
                    } else {
                        setJoinUsers([]);
                    }
                })
                .catch(error => console.log(error));
        } else if (isJoined) {
            unjoinEvent(rdxToken, eventId)
                .then(response => {
                    setIsJoined(false);
                    return getAllJoinedEvents(rdxToken, eventId);
                })
                .then(response => {
                    if (response.data.data && response.data.data.length > 0) {
                        setJoinUsers(response.data.data);
                    } else {
                        setJoinUsers([]);
                    }
                })
                .catch(error => console.log(error));
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }; 
    
    return (
        <div className='card-event'> 
            <div className='delete-card-event' onClick={onDeleteEvent}>
                {
                    tokenDecoded.role === "admin" || tokenDecoded.role === "super_admin"  &&
                    <div>
                        <DeleteLink
                            deleted={() => deletedEvent(eventId)}
                            title={<div className="button-delete-comment" >
                                <img className="del" src="https://cdn-icons-png.flaticon.com/512/58/58326.png" alt="" />
                            </div>}
                           
                        />
                    </div>
                }
            </div> 
            <div className="event-card" >
                <div className='event-info' key={eventId}>
                    <div className='event-box'> 
                    <div className='desc'>Date: </div>
                    <div className="event-date">{date}</div>
                    <div className='desc'>Time: </div>
                    <div className="event-time">{time}</div>
                    </div> 
                    <div className='desc'>Title: </div>
                    <div className="event-title">{title}</div>
                    <div className='desc'>Content: </div>
                    <div className="event-content">{content}</div>

                </div>
            </div>
            <div className='modal-event-all-joining'>
                <Button className='button-participants' type="" onClick={showModal}>
                    {joinUsers.length} {joinUsers.length === 1 ? 'Participant' : 'Participants'}
                </Button>
                <Modal title="All Participants" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <ul>
                        {joinUsers.map((joinUser, index) => (
                            <li key={index}>
                                <div>{joinUser.user.name} {joinUser.user.last_name}</div>
                            </li>
                        ))}
                    </ul>
                </Modal>
            </div>
            <div className='join-event'>
                <button className='join-event-button' onClick={() => handleJoin()}> {!isJoined ? 'Join' : 'Withdraw'}
                </button>
            </div>
        </div>
    )
};