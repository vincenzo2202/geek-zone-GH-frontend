
import React from 'react';
import './Header.css';
import { LinkButton } from '../LinkButton/LinkButton';

export const Header = () => {

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
            </div>
        </>
    )
}