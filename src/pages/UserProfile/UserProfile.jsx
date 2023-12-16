import React, { useState, useEffect } from "react";
import "./UserProfile.css"
import { follow, getFeedsByUserId, getFollowersById, getMyFeed, getMyFollowers, getMyFollowings, getProfile, getUserProfile, unfollow } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate, useParams } from "react-router-dom";

//Rdx
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { FeedCard } from "../../common/FeedCard/FeedCard";
import { jwtDecode } from "jwt-decode";
import { selectProfile } from "../profileSlice";


export const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);
    const userID = useSelector(selectProfile)
    const decodedtoken = jwtDecode(rdxToken);

    const { id } = useParams();
    const [user, setUser] = useState({});
    const [stop, setStop] = useState(false)
    const [followCheck, setFollowCheck] = useState(false)
    const [feed, setFeed] = useState([]) 

    useEffect(() => {
        if (rdxToken) {
            getUserProfile(rdxToken, id)
                .then((response) => {
                    if (stop == false) {
                        setUser(response.data.data);
                        setStop(true)
                        getFollowersById(rdxToken, userID)
                            .then(response => {
                                const followers = response.data.data;
                                let isFollowing = false;
                                for (let i = 0; i < followers.length; i++) {
                                    if (followers[i].follower_id === parseInt(decodedtoken.sub)) {
                                        isFollowing = true;
                                        break;
                                    }
                                }
                                setFollowCheck(isFollowing);
                            })
                            .catch(error => console.log(error));
                        getFeedsByUserId(rdxToken, userID)
                            .then(response => {
                                setFeed(response.data.data);
                            })
                            .catch(error => console.log(error));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/login");
        }
    }, []);

    const FollowersClick = () => {
        navigate('/follow');
    }

    const handleDeleteFeed = (id) => {
        setFeed(prevFeeds => prevFeeds.filter(feed => feed.id !== id));
    }

    const followOrNot = () => {
        if (followCheck == false) {
            const parseFollowId = parseInt(user.id, 10)
            follow(rdxToken, parseFollowId)
                .then(response => {
                    setUser(prevUser => ({ ...prevUser, followings: [...prevUser.followings, response.data] }))
                    setFollowCheck(true)
                    console.log(response);
                })
                .catch(error => console.log(error));
        } else {
            unfollow(rdxToken, user.id)
                .then(response => {
                    setUser(prevUser => ({
                        ...prevUser,
                        followings: prevUser.followings.filter(following => following.id !== response.data.id)
                    }));
                    setFollowCheck(false)
                    console.log(response);
                })
                .catch(error => console.log(error));
        }
    }

    let likesGetted = [];

    if (user.feeds) {
        for (let i = 0; i < user.feeds.length; i++) {
            for (let j = 0; j < user.feeds[i].likes.length; j++) {
                likesGetted.push(user.feeds[i].likes[j]);
            }
        }
    }

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
                                            <div className="followers-container" onClick={FollowersClick}>followings: {followers.length || 0}</div>
                                            <div className="followers-container" onClick={FollowersClick}>followers: {followings.length || 0}</div>
                                        </div>
                                        <div className="follow.box">
                                            <button className="follow" onClick={() => followOrNot()}>{followCheck == false ? "Follow" : "Unfollow"}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-feed">
                                    <div className="fixed-top-center">

                                        <div className='line-div'>Here are all your the posts </div>
                                        <div className="feed-container">
                                            {
                                                user.feeds && user.feeds.reverse().map((feed, index) => (
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
                                                        likes={feed.likes}
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