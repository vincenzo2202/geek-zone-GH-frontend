import './Chat.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { getMyChats } from '../../services/apiCalls';

export const Chat = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const [myChats, setMyChats] = useState([]);

    useEffect(() => {
        getMyChats(rdxToken)
            .then(
                response => { 
                    setMyChats(response.data.data); 
                    
            })
            .catch(error => console.log(error));
    }, []);

console.log(myChats);
    return (
        <div className='chat-body'>
            <div className='chat-container'>
                <div className='chat-list-container'>
                    <div className='chat-list-users'> 
                            <Button className='toggle-select-user' type="" onClick={showModal}>
                                New Chat
                            </Button>
                            <Modal title="Select a user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <div>Aqui va el usuario</div>
                            </Modal> 
                    </div> 
                    <div className='chat-list-rooms'  >
                        {
                            myChats.map(chat => {
                                return (
                                    <div className='chat-list-room'key={chat.id} >
                                        <div className='chat-list-room-name' key={chat.id}>{chat.members_info[1].name} {chat.members_info[1].last_name}</div>  
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='chat-conversation-container'>
                    <div className='messages-container'>
                    </div>
                    <div className='message-input-container'>
                        <input className='input-text-chat' type="text" placeholder="Enter text here..." />
                        <button className='button-chat-send'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}