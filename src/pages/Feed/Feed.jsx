import React, { useEffect } from 'react';
import './Feed.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectToken } from '../userSlice';
import { getAllFeeds } from '../../services/apiCalls';

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
           {feed.length > 0
           ?( <div className="feed-container"> SI viene el feed</div>
           )
           :( <div>Loading</div>)
           }
        </div>
    );

};