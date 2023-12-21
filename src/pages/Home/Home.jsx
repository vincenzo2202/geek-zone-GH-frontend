import React from 'react';
import './Home.css';

import '../../assets/logo5.png';
export const Home = () => {
    return (
        <div className='home-body'>
            <div className='title-home'>
                <div className='logo-geek-zone-home'><img className='logo-geek-zone-home' src="../../src/assets/logo5.png" alt="logo-geek-zone-home" />  </div>
                <div className='title-geek-zone'>Más que una academia,<br/> somos una comunidad</div>
            </div>
        </div>
    );
};