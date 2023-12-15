import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CustomInput } from '../CustomInput/CustomInput';
import './CreateEventCard.css';
import { createEvent } from '../../services/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../pages/userSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { validator } from '../../services/validations';

export const CreateEventCard = () => {

  const rdxToken = useSelector(selectToken);
  const tokenDecoded = jwtDecode(rdxToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);

  };
  const handleCancel = () => {
    setOpen(false);
  };

  const [eventInput, setEventInput] = useState({
    title: '',
    content: '', 
    event_date: '',
    event_time: '',
  });
 
   
  const [eventInputError, setEventInputError] = useState({
    titleError: '',
    contentError: '',
    event_dateError: '',
    event_timeError: '',
  });

  const functionHandler = (e) => {
    setEventInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const SendEvent = () => {
    if (eventInput.comment !== '') {
      console.log(eventInput);
      createEvent(rdxToken, eventInput)
        .then(
          response => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setOpen(false);
            }, 3000);
            setEventInput(prevState => ({
              ...prevState,
              title: '',
              content: '', 
              event_date: '',
              event_time: '',
            }));
            // TODO // apaño para que se actualice el event
            history.go(0);//TODO

          })
        .catch(error => console.log(error));
    }
  }

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setEventInputError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  }

  return (
    <>
      <Button className='button-open-modal-event' type="" onClick={showModal}>
        What's on your mind?
      </Button>
      <Modal
        open={open}
        title="What's on your mind?"
        onOk={SendEvent}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={SendEvent}>
            Send
          </Button>
        ]}
      >
        <div className='inputs-card-modal'>
          <CustomInput
            design={'input-create-event-title'}
            type={'text'}
            name={'title'}
            placeholder={'Title'}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            design={'input-create-event-text'}
            type={'content'}
            name={'content'}
            placeholder={'Write your post here'}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            design={'input-create-event-date'}
            type={'date'}
            name={'event_date'}
            placeholder={'Date'}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            design={'input-create-event-time'}
            type={'time'}
            name={'event_time'}
            placeholder={'Time'}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
        </div>

      </Modal>
    </>
  );
}; 