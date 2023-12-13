
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
    const tokenDecoded = jwtDecode(rdxToken);


    useEffect(() => {

        if (rdxToken !== null && tokenDecoded.exp > Date.now() / 1000) {
            try {
                const decoded = jwtDecode(rdxToken);
                setDecodedToken(decoded);

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
                                 <LinkButton
                                    className={"header-button"}
                                    path={"/users"}
                                    title={"Community"}
                                />
                                <LinkButton
                                    className={"header-button"}
                                    path={"/feed"}
                                    title={"Feed"}
                                />
                                <LinkButton
                                    className={"header-button"}
                                    path={"/event"}
                                    title={"Event"}
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