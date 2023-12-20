import React, { useState, useEffect } from "react";
import "./Profile.css"
import { getMyFeed, getMyFollowers, getMyFollowings, getProfile } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { FeedCard } from "../../common/FeedCard/FeedCard"; 
import { jwtDecode } from "jwt-decode";
import { CreateFeedCard } from "../../common/CreateFeed/CreateFeedCard";


export const Profile = () => {

    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken); 

    const [user, setUser] = useState({});
    const [stop, setStop] = useState(false)
    const [feed, setMyFeed] = useState([])

    useEffect(() => {
        if (rdxToken) {
            getProfile(rdxToken)
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

    useEffect(() => {
        if (rdxToken) {
            getMyFeed(rdxToken)
                .then(
                    response => {
                        if (response.data.data.length > 0) {
                            setMyFeed(response.data.data);
                        } else {
                            setMyFeed([]);
                        }
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, []);

    let followers = [];
    let followings = [];

    if (user.followers) {
        for (let i = 0; i < user.followers.length; i++) {
            followers.push(user.followers[i]);
        }
    }

    if (user.followings) {
        for (let i = 0; i < user.followings.length; i++) {
            followings.push(user.followings[i]);
        }
    }

    const FollowersClick = () => {
        navigate('/follow');
    }

    const handleDeleteFeed = (id) => {
        setMyFeed(prevFeeds => prevFeeds.filter(feed => feed.id !== id));
    } 
console.log(feed);
    return (

        <div className="profile-body-main">
            {
                user
                    ? (
                        <>
                            <div className="profile-main">
                                <div className="left-banner-profile">
                                    <div className="profile-info-profile-main"> 
                                        <div className="div-photo-profile" ><img src={user.photo} alt="User" /></div>
                                        <div className="text-box">
                                        <div className="my-profile-info-text name">{user.name} {user.last_name}</div> 
                                        <div className="my-profile-info-text">Email: {user.email}</div>
                                        <div className="my-profile-info-text">Phone: {user.phone_number}</div>
                                        <div className="my-profile-info-text">City: {user.city}</div>
                                        </div>
                                        <div className="followers-box" >
                                            <div className="followers-container" onClick={FollowersClick}> { followers.length || 0}
                                            <div>followers</div>
                                            </div>
                                            <div className="followers-container" onClick={FollowersClick}>{followings.length || 0}
                                            <div>followings</div>
                                            </div>
                                        </div>
                                        <div className="update-profile">
                                            <LinkButton
                                                className={"class-button"}
                                                path={"/UpdateProfile"}
                                                title={"Update"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="my-feed">
                                    <div className="fixed-top-center">
                                        <h1>Hi, {user.name}!</h1>
                                        <div className='create-feed-card'>
                                            <CreateFeedCard />
                                        </div>
                                    </div>
                                    <div className='line-div'>Here are all your the posts </div>
                                    <div className="feed-container">
                                        {
                                            [...feed].reverse().map((feed, index) => (
                                                <FeedCard
                                                    key={index}
                                                    feedId={feed.id}
                                                    title={feed.title}
                                                    content={feed.content}
                                                    photo={feed.photo}
                                                    userPhoto={feed.user.photo}
                                                    userName={feed.user.name}
                                                    userLast_name={feed.user.last_name}
                                                    user_id={feed.user.user_id}
                                                    onDeleteFeed={handleDeleteFeed}
                                                    likes={feed.likes}
                                                />
                                            ))}
                                    </div>
                                </div>
                                <div className="right-banner"> 
                                </div>
                            </div>

                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
        </div>
    );
};