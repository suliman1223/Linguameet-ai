import React from 'react';
import '../App.css';

const Landing = () => {
    return (
        <div className='LandingPageContainer'>
            <nav>
                <div className="navHeader"><h2>LinguameetAi</h2></div>
                <div className="navList">
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role="button">
                        <p>Login</p>
                    </div>
                </div>
            </nav>
            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color:"#D97500"}}>Connect</span> to you loved one's</h1>
                    <p>Cover the distance by LinguameetAi CrossX</p>
                    <div role="button">
                       <a href='/home'>Get Started</a>
                    </div>
                </div>
                <div>
                    <img src="/mobile.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Landing;