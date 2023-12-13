import React from "react";
import "./FollowCard.css"

export const FollowCard = ({name,last_name, photo, phone_number, email, userid, city, role }) => {

    return (
        <div className="card-follow" userid={userid} dragable="false"> 
            <img className="follow" src={photo} alt={photo} /> 
            <div className="desc-follow">
                <div className="name-follow">{name}</div>
                <div className="last_name-follow">{last_name}</div>
                <div className="email-follow">{email}</div>
                <div className="phone-follow">{phone_number}</div>
                <div className="city-follow">{city}</div>
                <div className="role-follow">{role}</div>
            </div> 
        </div>
    )
}
