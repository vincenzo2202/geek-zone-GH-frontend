import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CustomInput } from '../CustomInput/CustomInput';
import './CreateFeedCard.css';
import { createFeed } from '../../services/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../pages/userSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { validator } from '../../services/validations';

export const CreateFeedCard = () => {

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

  const [feedInput, setFeedInput] = useState({
    title: '',
    content: '',
    photo: ''
  });

  const [feedInputError, setFeedInputError] = useState({
    titleError: '',
    contentError: '',
    photoError: ''
  });

  const functionHandler = (e) => {
    setFeedInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const SendFeed = () => {
    if (feedInput.comment !== '') {
      console.log(feedInput);
      createFeed(rdxToken, feedInput)
        .then(
          response => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setOpen(false);
            }, 3000);
            setFeedInput(prevState => ({
              ...prevState,
              title: '',
              content: '',
              photo: ''
            }));
            // TODO // apaño para que se actualice el feed 
            history.go(0);//TODO

          })
        .catch(error => console.log(error));
    }
  }

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setFeedInputError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  }

  return (
    <div className='create-feed-box'>
      <Button className='button-open-modal' type="" onClick={showModal}>
        What's on your mind?
      </Button>
      <Modal
        open={open}
        title="What's on your mind?"
        onOk={SendFeed}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={SendFeed}>
            Send
          </Button>
        ]}
      >
        <div className='inputs-card-modal'>
          <CustomInput
            design={'input-create-feed-title'}
            type={'text'}
            name={'title'}
            placeholder={'Title'}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            design={'input-create-feed-text'}
            type={'content'}
            name={'content'}
            placeholder={'Write your post here'}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            design={'input-create-feed-photo'}
            type={'photo'}
            name={'photo'}
            placeholder={'photo'}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
        </div>

      </Modal>
    </div>
  );
}; 