import React, { useState, useEffect } from "react";
import "./Profile.css"
import { getMyFeed, getMyFollowers, getMyFollowings, getProfile } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { FeedCard } from "../../common/FeedCard/FeedCard";
import { Follow } from "../Follow/Follow";


export const Profile = () => {

    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);

    const [user, setUser] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        photo: ""
    });

    const [stop, setStop] = useState(false)

    const [myFollowers, setMyFollowers] = useState([])
    const [myFollowings, setMyFollowings] = useState([])

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
            getMyFollowers(rdxToken)
                .then(
                    response => {
                        setMyFollowers(response.data.dataSize);
                    })
                .catch(error => console.log(error));

            getMyFollowings(rdxToken)
                .then(
                    response => {
                        setMyFollowings(response.data.dataSize);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/login");
        }
    }, [rdxToken, myFollowers, myFollowings, stop, navigate]);

    const [feed, setMyFeed] = useState([])

    useEffect(() => {
        if (rdxToken) {
            getMyFeed(rdxToken)
                .then(
                    response => {
                        setMyFeed(response.data.data);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, [feed]);

    console.log(feed);

    const FollowersClick = () => {
        navigate('/follow');
    }


    return (
        <div className="profile-body">
            {
                user
                    ? (
                        <>
                            <div className="profile">

                                <div className="left-banner">
                                    <div className="div-photo" ><img src={user.photo} alt="User" /></div>
                                    <div>Name: {user.name}</div>
                                    <div>Email: {user.email}</div>
                                    <div>Phone: {user.phone_number}</div>
                                    <div>City: {user.city}</div> 
                                    <div className="followers-box" >
                                        <div className="followers-container" onClick={FollowersClick}>followers: {myFollowers}</div>
                                        <div className="followers-container" onClick={FollowersClick}>followings: {myFollowings}</div>
                                    </div> 
                                    <div className="update-profile">
                                        <LinkButton
                                            className={"class-button"}
                                            path={"/UpdateProfile"}
                                            title={"Update"}
                                        />
                                    </div>
                                </div>
                                <div className="my-feed">
                                    <h1>Hi, {user.name}!</h1>
                                    {
                                        feed.map((feed, index) => (
                                            <FeedCard
                                                key={index}
                                                feedId={feed.id}
                                                title={feed.title}
                                                content={feed.content}
                                                photo={feed.photo}
                                                userPhoto={feed.user.photo}
                                                userName={feed.user.name}
                                                userLast_name={feed.user.last_name}
                                                user_id={feed.user.id}
                                            />
                                        ))}
                                </div>
                                <div className="right-banner">
                                    hola
                                </div>
                            </div>

                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
        </div>
    );
};