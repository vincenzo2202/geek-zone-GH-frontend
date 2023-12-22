
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
    const navigate = useNavigate();

    const [decodedToken, setDecodedToken] = useState(null);


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

    const [isNavVisible, setNavVisible] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isNavVisible);
    };

    const closeNav = () => {
        setNavVisible(false);
    }

    const goTo = () => {
        if (rdxToken) {
            navigate("/feed")
        } else {
            navigate("/")
        }
    }

    return (
        <>
            <div className='logo-header' >
                <img className='logo-header' src='../../src/assets/logo5.png' alt='logo' onClick={goTo} />
            </div>

            <div className='button-container' >

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
                                <LinkButton
                                    className={"header-button"}
                                    path={"/chat"}
                                    title={"Chat"}
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
            <div className='navbar-bar'>
                <label className={`menuButton ${isNavVisible ? 'checked' : ''}`} htmlFor="check" >
                    <input type="checkbox" id="check" onChange={handleCheckboxChange} checked={isNavVisible} onClick={() => setNavVisible(!isNavVisible)} />
                    <span className="top"></span>
                    <span className="mid"></span>
                    <span className="bot"></span>
                </label>
            </div>
            {isNavVisible && (

                <div className='button-container-toggle' >

                    {
                        rdxToken
                            ? (
                                <>
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/feed"}
                                        title={"Feeds"}
                                        emit={closeNav}
                                    />
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/profile"}
                                        title={"Profile"}
                                        emit={closeNav}
                                    />
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/users"}
                                        title={"Community"}
                                        emit={closeNav}
                                    />
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/event"}
                                        title={"Events"}
                                        emit={closeNav}
                                    />
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/chat"}
                                        title={"Chat"}
                                        emit={closeNav}
                                    />
                                    <div className='header-button' onClick={logOutMe}>
                                        <LinkButton
                                            classButton={"linkButtonDesign"}
                                            path={"/login"}
                                            title={"Log Out"}
                                            emit={closeNav}
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
                                        emit={closeNav}
                                    />
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/login"}
                                        title={"Login"}
                                        emit={closeNav}
                                    />
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/"}
                                        title={"Home"}
                                        emit={closeNav}
                                    />
                                </>
                            )}




                </div>

            )}
        </>
    )
}