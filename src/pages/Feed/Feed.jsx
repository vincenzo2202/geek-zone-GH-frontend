import React, { useEffect } from 'react';
import './Feed.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logout, selectToken } from '../userSlice';
import { getAllFeeds } from '../../services/apiCalls';
import { FeedCard } from '../../common/FeedCard/FeedCard';
import { jwtDecode } from 'jwt-decode';
import { CreateFeedCard } from '../../common/CreateFeed/CreateFeedCard';

export const Feed = () => {
    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenDecoded = jwtDecode(rdxToken);

    const [feed, setFeed] = useState([])
    const [stop, setStop] = useState(false)

    useEffect(() => {
        getAllFeeds(rdxToken)
            .then(
                response => {
                    if (response.data.data.length > 0) {
                        setFeed(response.data.data);
                        setStop(true)
                    } else {
                        setFeed([]);
                    }
                })
            .catch(error => console.log(error));
    }, [stop]);

    console.log(stop);
    const handleDeleteFeed = (id) => {
        setFeed(prevFeed => prevFeed.filter(feedItem => feedItem.id !== id));
        setStop(!stop)
        console.log('actualizado');
    }

    return (
        <div className="feed-body">
            <div className='feed-background'>
                <div className='left-feed-banner'>

                    <img className='content-left-banner' src='../../src/assets/banner_english.gif' alt='banner_english' />

                </div>
                <div className='center-feed'>
                    <div className='create-feed-card'>
                        <CreateFeedCard />
                    </div>
                    <div className='line-div'>Here are all the posts </div>
                    {feed.length > 0
                        ? (
                            // esto no sive el onclick
                            <div className="feed-container"  > 
                                {[...feed].reverse().map(feedItem => (
                                    <FeedCard
                                        key={feedItem.id}
                                        userPhoto={feedItem.user.photo}
                                        user_id={feedItem.user_id}
                                        userName={feedItem.user.name}
                                        userLast_name={feedItem.user.last_name}
                                        title={feedItem.title}
                                        content={feedItem.content}
                                        photo={feedItem.photo}
                                        feedId={feedItem.id}
                                        onDeleteFeed={handleDeleteFeed}
                                        likes={feedItem.likes}
                                    />

                                ))}
                            </div>
                        ) : (
                            <div>Loading</div>
                        )}
                </div>
                <div className='right-feed-banner'>

                    <img className='content-right-banner' src='../../src/assets/banner_english.gif' alt='banner_english' />

                </div>
            </div>
        </div>
    );

};