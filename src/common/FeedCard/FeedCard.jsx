import { useEffect, useState } from 'react';
import './FeedCard.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../pages/userSlice';
import { useNavigate } from 'react-router-dom';
import { getCommentsByFeedID } from '../../services/apiCalls';
 

export const FeedCard = ({ feedId, userPhoto, user_id, userName, userLast_name, title, content, photo }) => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const [comment, setComment] = useState([]) 
    const [collapsed, setCollapsed] = useState(true);
    
    const toggleCollapse = () => {
        if (collapsed) {
            console.log(feedId);
            getCommentsByFeedID(rdxToken,feedId)
                .then(
                    response => {
                        setComment(response.data.data[0].comment);
                        console.log(response);
                    })
                .catch(error => console.log(error));
        }
        setCollapsed(collapsed);
    };
    console.log(comment);

    return (
        <div className='card'>
            <div className="feed-card" key={feedId}>
                <div className='user-info'>
                    <img className="pic-avatar" src={userPhoto} alt={userPhoto} />
                    <div className="user-name">{userName}</div>
                    <div className="user-lastname">{userLast_name}</div>
                    <div className='desc'>User ID: </div>
                    <div className="user-id"> {user_id}</div>
                </div>
                <div className='feed-info'>
                    <div className='desc'>Title: </div>
                    <div className="feed-title">{title}</div>
                    <div className='desc'>Content: </div>
                    <div className="feed-content">{content}</div>
                </div>
                {
                    photo
                        ? (
                            <>
                                <div className='desc'>Photo:  </div>
                                <img className="pic-feed" src={photo} alt={photo} />
                            </>
                        )
                        : (<div ></div>)
                }
            </div>


            <button className="button-spoiler" onClick={toggleCollapse}>
                {collapsed ? "comments" : "comments"}
            </button>

            {collapsed && (
                <div className="comments">
                    {comment.map((comment, index) => (
                        <div className='comment-card' key={index}>
                            <div className='comment-info'>
                                <div className="comment-content">{comment.comment}</div>
                             
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div >
    )
}; 