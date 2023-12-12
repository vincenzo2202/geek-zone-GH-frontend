import React, { useEffect } from 'react';
import './Feed.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectToken } from '../userSlice';
import { getAllFeeds } from '../../services/apiCalls';
import { FeedCard } from '../../common/FeedCard/FeedCard';

export const Feed = () => {
    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(rdxToken);

    const [feed, setFeed] = useState([])

    useEffect(() => {
        if (rdxToken) {
            getAllFeeds(rdxToken)
                .then(
                    response => {
                        setFeed(response.data.data);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, []); // aqui si solo sigo al feed entra en bucle infinito

    console.log(feed);

    return (
        <div className="feed-body">
            {feed.length > 0 ? (
                <div className="feed-container">
                    {feed.map(feedItem => (
                        <FeedCard
                            key={feedItem.id}
                            userPhoto={feedItem.user.photo}
                            user_id={feedItem.user.user_id}
                            userName={feedItem.user.name}
                            userLast_name={feedItem.user.last_name}
                            title={feedItem.title}
                            content={feedItem.content}
                            photo={feedItem.photo}
                        />
                    ))}
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );

};