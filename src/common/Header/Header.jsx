
import React, { useEffect, useState } from 'react';
import './Header.css';
import { LinkButton } from '../LinkButton/LinkButton';
import { logout, selectToken } from '../../pages/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getProfile } from '../../services/apiCalls';

export const Header = () => {

    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);
    const [decodedToken, setDecodedToken] = useState(null);
    const navigate = useNavigate();
    const [stop, setStop] = useState(false)

    useEffect(() => {
        if (rdxToken) {
            getProfile(rdxToken)
                .then((response) => {
                    setDecodedToken(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [rdxToken]);


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

                {
                    rdxToken
                        ? (
                            <>
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
                            </>
                        )
                        : (
                            <>
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
                            </>
                        )}




            </div>
        </>
    )
}