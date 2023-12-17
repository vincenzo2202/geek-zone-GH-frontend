
import React, { useEffect, useState } from 'react';
import './Header.css';
import { LinkButton } from '../LinkButton/LinkButton';
import { logout, selectToken } from '../../pages/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const Header = () => {

    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);
    const [decodedToken, setDecodedToken] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {

        if (rdxToken !== null) {
            try {
                const decoded = jwtDecode(rdxToken);
                setDecodedToken(decoded);
                if (decoded.exp < Date.now() / 1000) {
                    dispatch(logout());
                    navigate("/");
                }

            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            navigate("/");
            dispatch(logout());
        }
    }, [rdxToken]);




    const logOutMe = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <>
            <div className='button-container'>

                {
                    rdxToken
                        ? (
                            <>
                                <LinkButton
                                    className={"header-button"}
                                    path={"/feed"}
                                    title={"Feeds"}
                                />
                                <LinkButton
                                    className={"header-button"}
                                    path={"/profile"}
                                    title={"Profile"}
                                />
                                <LinkButton
                                    className={"header-button"}
                                    path={"/users"}
                                    title={"Community"}
                                />

                                <LinkButton
                                    className={"header-button"}
                                    path={"/event"}
                                    title={"Events"}
                                />
                                <div className='header-button' onClick={logOutMe}>
                                    <LinkButton
                                        classButton={"linkButtonDesign"}
                                        path={"/login"}
                                        title={"Log Out"}
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
                                <LinkButton
                                    className={"header-button"}
                                    path={"/"}
                                    title={"Home"}
                                />
                            </>
                        )}




            </div>
        </>
    )
}