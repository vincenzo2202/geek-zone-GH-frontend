import { useEffect, useState } from 'react';
import './FeedCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../pages/userSlice';
import { useNavigate } from 'react-router-dom';
import { createComment, deleteComment, deleteFeed, getCommentsByFeedID } from '../../services/apiCalls';
import { CustomInput } from '../CustomInput/CustomInput';
import { validator } from '../../services/validations';
import { DeleteLink } from '../DeleteLink/DeleteLink';
import { jwtDecode } from 'jwt-decode';
import { LikeCard } from '../LikeCard/LikeCard';


export const FeedCard = ({ feedId, userPhoto, user_id, userName, userLast_name, title, content, photo, onDeleteFeed, likes }) => {
    const rdxToken = useSelector(selectToken);
    const tokenDecoded = jwtDecode(rdxToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [comment, setComment] = useState([])
    const [collapsed, setCollapsed] = useState(false);
    const [commentInput, setCommentInput] = useState({
        feed_id: feedId,
        comment: '',
    });
    const [commentInputError, setCommentInputError] = useState({}); 
    const toggleCollapse = () => {
        if (collapsed) {
            getCommentsByFeedID(rdxToken, feedId)
                .then(
                    response => {
                        setComment(response.data.data[0].comment);
                    })
                .catch(error => console.log(error));
        }
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (collapsed) {
            getCommentsByFeedID(rdxToken, feedId)
                .then(
                    response => {
                        setComment(response.data.data[0].comment);
                    })
                .catch(error => console.log(error));
        }
    }, [commentInput])
 

    const functionHandler = (e) => {
        setCommentInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        setCommentInputError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const SendComment = () => {
        if (commentInput.comment !== '') { 
            createComment(rdxToken, commentInput)
                .then(
                    response => {
                        setCommentInput(prevState => ({
                            ...prevState,
                            comment: ''
                        }));
                    })
                .catch(error => console.log(error));
        }
    }

    const deleted = (id) => {
        deleteComment(rdxToken, id)
            .then(response => {
                setComment(delComment => delComment.filter(comment => comment.id !== id));

            })
            .catch(error => console.log(error));
    }

    const deletedFeed = (feedId) => {
        deleteFeed(rdxToken, feedId)
            .then(response => {
                console.log(response); 
                onDeleteFeed()

            })
            .catch(error => console.log(error));
    } 
  
    const goTO = () => {
        navigate(`/userProfile/${user_id}`);
    } 

    return (
        <div className='card'>
            <div className="feed-card" key={feedId}>
                <div className='top-banner'>
                    <div className='user-info' onClick={goTO}>
                        <img className="pic-avatar" src={userPhoto} alt={userPhoto} />
                        <div className="user-name">{userName}</div>
                        <div className="user-lastname">{userLast_name}</div>
                    </div>

                    <div className='delete-card'  onClick={onDeleteFeed}>
                        {
                            parseInt(tokenDecoded.sub, 10) == user_id &&
                            <DeleteLink
                                deleted={() => deletedFeed(feedId)}
                                title={<div className="button-delete-comment" >
                                    <img className="del" src="https://cdn-icons-png.flaticon.com/512/58/58326.png" alt="" />
                                </div>}
                            />
                        }
                    </div>

                </div>
                <div className='feed-info'>
                    <div className='desc'>Title: </div>
                    <div className="feed-title">{title}</div>
                    <div className='desc'>Content: </div>
                    <div className="feed-content">{content}</div>
                </div>
                {
                    photo
                        ? (<>
                            <div className='desc'>Photo:  </div>
                            <img className="pic-feed" src={photo} alt={photo} />
                        </>)
                        : (<div ></div>)
                }
            </div>
            <div className='like-card'>
                <LikeCard
                    idfeed={feedId}
                    likes={likes}
                />
            </div>
            <button className="button-spoiler" onClick={toggleCollapse}>
                {!collapsed ? "comments" : "comments"}
            </button>
            {collapsed
                ? (
                    <div className="comments">
                        <div className='input-comment'>
                            <CustomInput
                                design={'input-create-comment'}
                                type={'text'}
                                name={'comment'}
                                placeholder={'Comments'}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                value={commentInput.comment}
                            />
                            <button className="button-send" onClick={SendComment}>Send </button>
                        </div>

                        {comment.length > 0 && [...comment].reverse().map((comment, index) => (

                            <div className='comment-card' key={index}>
                                <div className='comment-info' >
                                    <div className='coment-owner-info'>
                                        <div className="comment-content">{comment.user.name}</div>
                                        <div className="comment-content">{comment.user.last_name}</div>
                                    </div>
                                    <div className="comment-content">{comment.comment}</div>

                                </div>
                                {
                                    parseInt(tokenDecoded.sub, 10) == comment.user.id &&
                                    <DeleteLink
                                        deleted={() => deleted(comment.id)}
                                        title={<div className="button-delete-comment" >
                                            <img className="del" src="https://cdn-icons-png.flaticon.com/512/58/58326.png" alt="" />
                                        </div>}
                                    />
                                }
                            </div>
                        ))}
                    </div>
                )
                : (<div></div>)
            }
        </div >
    )
}; 