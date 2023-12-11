
import React, { useEffect, useState } from 'react';
import './Header.css';
import { LinkButton } from '../LinkButton/LinkButton'; 
import { logout } from '../../pages/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const Header = () => {

    const dispatch = useDispatch();
    // const rdxToken = useSelector(selectToken);
    // const [decodedToken, setDecodedToken] = useState(null); 
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (rdxToken) {
    //         try {
    //             const decoded = jwtDecode(rdxToken);

    //             setDecodedToken(decoded);
    //         } catch (error) {
    //             console.error("Error decoding token:", error);
    //         }
    //     }
    // }, [rdxToken]);


    const logOutMe = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <>
            <div className='button-container'>
                <LinkButton
                    className={"header-button"}
                    path={"/"}
                    title={"Home"}
                />
                <LinkButton
                    className={"header-button"}
                    path={"/register"}
                    title={"Register"}
                />
                <LinkButton
                    className={"header-button"}
                    path={"/login"}
                    title={"Login"}
                />
                <LinkButton
                    className={"header-button"}
                    path={"/profile"}
                    title={"Profile"}
                />

                <div className='header-button' onClick={logOutMe}>
                    <LinkButton
                        classButton={"linkButtonDesign"}
                        path={"/login"}
                        title={"log out"}
                    />
                </div>
            </div>
        </>
    )
}