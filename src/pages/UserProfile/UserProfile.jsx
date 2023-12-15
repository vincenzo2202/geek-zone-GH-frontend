import React, { useState, useEffect } from "react";
import "./UserProfile.css"
import { getMyFeed, getMyFollowers, getMyFollowings, getProfile, getUserProfile } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate, useParams } from "react-router-dom";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { FeedCard } from "../../common/FeedCard/FeedCard";
import { Follow } from "../Follow/Follow";
import { jwtDecode } from "jwt-decode"; 


export const UserProfile = () => { 
    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken); 
    const { id } = useParams(); 
    const [user, setUser] = useState({ 
    });
console.log(user);
    const [stop, setStop] = useState(false)

    const [myFollowers, setFollowers] = useState([])
    const [myFollowings, setFollowings] = useState([])

    useEffect(() => {
        if (rdxToken) {
            getUserProfile(rdxToken, id)
                .then((response) => { 
               
                    if (stop == false) { 
                       
                        setUser(response.data.data);
                        setStop(true)
                    }
                })
                .catch((error) => {
                    console.log(error);
                }); 
        } else {
            navigate("/login");
        }
    }, [rdxToken, stop, navigate]); 

    const [feed, setFeed] = useState([])

    useEffect(() => {
        if (rdxToken) {
            getUserProfile(rdxToken)
                .then(
                    response => {
                        if (response.data.data.feeds.length > 0) {
                            setFeed(response.data.data.feeds);
                        } else {
                            setFeed([]);
                        }
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, []); 

    const FollowersClick = () => {
        navigate('/follow');
    }

    const handleDeleteFeed = (id) => {
        setFeed(prevFeeds => prevFeeds.filter(feed => feed.id !== id));
    }
 console.log(user.followers);
    return (
        
        <div className="profile-body">
            {
                user
                    ? (
                        <>
                            <div className="profile">
                                <div className="left-banner">
                                    <div className="profile-info"> 
                                    <div className="div-photo" ><img src={user.photo} alt="User" /></div>
                                    <div>Name: {user.name}</div>
                                    <div>Last Name: {user.last_name}</div>
                                    <div>Email: {user.email}</div>
                                    <div>Phone: {user.phone_number}</div>
                                    <div>City: {user.city}</div>  
                                    <div className="followers-box" >
                                        <div className="followers-container" onClick={FollowersClick}>followers: {user.followers || 0}</div>
                                        <div className="followers-container" onClick={FollowersClick}>followings: {user.followings || 0}</div>
                                        
                                    </div> 
                                    </div>
                                </div>
                                <div className="my-feed">
                                    <div className="fixed-top-center">
                                    
                                    <div className='line-div'>Here are all your the posts </div>
                                    <div className="feed-container">
                                        {
                                          user.feeds &&  user.feeds.reverse().map((feed, index) => (
                                                <FeedCard
                                                key={index}
                                                feedId={feed.id}
                                                title={feed.title}
                                                content={feed.content}
                                                photo={feed.photo}
                                                userPhoto={user.photo}
                                                userName={user.name}
                                                userLast_name={user.last_name}
                                                user_id={user.id} 
                                                onDeleteFeed={handleDeleteFeed}
                                                />
                                            ))}
                                    </div>
                                    </div>
                                </div>
                                <div className="right-banner">
                                    Hola
                                </div>
                            </div>

                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
        </div>
    );
};