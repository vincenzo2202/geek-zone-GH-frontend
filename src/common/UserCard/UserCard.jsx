import React from "react";
import "./UserCard.css"

export const CardUser = ({ name,last_name, photo, phone_number, email, key, city, role }) => {

    return (
        <div className="card-worker" key={key} dragable="false"> 
            <img className="worker" src={photo} alt={photo} /> 
            <div className="desc-user">
                <div className="name">{name}</div>
                <div className="last_name">{last_name}</div>
                <div className="email">{email}</div>
                <div className="phone">{phone_number}</div>
                <div className="city">{city}</div>
                <div className="role">{role}</div>
            </div> 
        </div>
    )
}
