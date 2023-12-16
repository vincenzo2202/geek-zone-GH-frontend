import React from "react";
import "./UserCard.css"
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector  } from "react-redux";
import { selectToken } from "../../pages/userSlice";
import { profile } from "../../pages/profileSlice";

export const CardUser = ({name,last_name, photo, phone_number, email, userid, city, role, id}) => {

    const rdxToken = useSelector(selectToken);
    const tokenDecoded = jwtDecode(rdxToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const goTOUserProfile = (id) => { 
        dispatch(profile(id));
        navigate(`/userProfile/${id}`);
        console.log(id);
    }

    return (
        <div className="card-worker" userid={userid}  dragable="false" onClick={()=>goTOUserProfile(id)}> 
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
