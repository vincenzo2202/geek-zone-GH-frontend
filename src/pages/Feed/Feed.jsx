import React, { useEffect } from 'react';
import './Feed.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logout, selectToken } from '../userSlice';
import { getAllFeeds } from '../../services/apiCalls';
import { FeedCard } from '../../common/FeedCard/FeedCard';
import { jwtDecode } from 'jwt-decode';
import { CreateFeeCard } from '../../common/CreateFeed/CreateFeedCard';
export const Feed = () => {
    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenDecoded = jwtDecode(rdxToken);


    const [feed, setFeed] = useState([])

    useEffect(() => {
        if (rdxToken && tokenDecoded.exp > Date.now() / 1000) {
            getAllFeeds(rdxToken)
                .then(
                    response => {
                        if (response.data.data.length > 0) {
                            setFeed(response.data.data);
                        } else {
                            setFeed([]);
                        }
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
            dispatch(logout());
        }
    }, [ ]); // aqui si solo sigo al feed entra en bucle infinito
console.log(feed);

    const handleDeleteFeed = (id) => {
        setFeed(CreateFeeCard.id !== id);
    }

    return (
        <div className="feed-body">
            <div className='create-feed-card'>
                <CreateFeeCard />
            </div>
            <div className='feed-background'>
                {feed.length > 0
                    ? (
                        <div className="feed-container">
                            {[...feed].reverse().map(feedItem => (
                                <FeedCard
                                    key={feedItem.id}
                                    userPhoto={feedItem.user.photo}
                                    user_id={feedItem.user.user_id}
                                    userName={feedItem.user.name}
                                    userLast_name={feedItem.user.last_name}
                                    title={feedItem.title}
                                    content={feedItem.content}
                                    photo={feedItem.photo}
                                    feedId={feedItem.id}
                                    onDeleteFeed={handleDeleteFeed}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>Loading</div>
                    )}
            </div>
        </div>
    );

};