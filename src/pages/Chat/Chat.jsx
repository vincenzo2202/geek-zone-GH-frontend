import './Chat.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { createChat, getAllUsers, getMyChats } from '../../services/apiCalls';

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
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        getMyChats(rdxToken)
            .then(
                response => {
                    setMyChats(response.data.data);

                })
            .catch(error => console.log(error));
        getAllUsers(rdxToken)
            .then(
                response => {
                    setAllUsers(response.data.data);
                })
            .catch(error => console.log(error));
    }, []);


    const newChat = (id) => {
        let chatData = {
            "name": `Chat with ${id}`,
            "user_id": [id]
        }
        createChat(rdxToken, chatData)
            .then(
                response => {
                    console.log('chat created');
                    setIsModalOpen(false);
                    getMyChats(rdxToken)
                        .then(
                            response => {
                                setMyChats(response.data.data);
                            })
                        .catch(error => console.log(error));
                })
            .catch(error => console.log(error));
    }

    return (
        <div className='chat-body'>
            <div className='chat-container'>
                <div className='chat-list-container'>
                    <div className='chat-list-users'>
                        <Button className='toggle-select-user' type="" onClick={showModal}>
                            New Chat
                        </Button>
                        <Modal title="Select a user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='modal-container'>
                            <div className='modal-box'>
                            {
                                allUsers.length > 0
                                    ?
                                    allUsers.map(user => {
                                        return (
                                            <div className='user-list' key={user.id} onClick={() => newChat(user.id)} onOk={() => newChat(user.id)}>
                                                <div className='user-list-name'>{user.name} {user.last_name}</div>
                                            </div>
                                        )
                                    })
                                    : <div>There are any user</div>

                            }
                            </div>
                        </Modal>
                    </div>
                    <div className='chat-list-rooms'  >
                        {
                            myChats.map(chat => {
                                return (
                                    <div className='chat-list-room' key={chat.id} >
                                        <div className='chat-list-room-name' key={chat.id}> {chat.members_info[1].name} {chat.members_info[1].last_name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='chat-conversation-container'>
                    <div className='messages-container'>
                        <div className='chat-with-name'>Pepe</div>
                        <div className='message-second-container'>
                            <div className='message-container'>
                                {
                                    <>
                                        <div className='message-text-gray'>Recibidos</div>
                                        <div className='message-text-green'>Enviados </div>
                                    </>
                                }
                            </div>
                        </div>
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