import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Landing = () => {
    return (
        <div className="LandingPageContainer">
            <nav>
                <div className="navHeader">
                    <h2>LinguameetAi</h2>
                </div>

                <div className="navList">
                    <Link to="/guest">Join as Guest</Link>
                    <Link to="/auth">Register</Link>
                    <Link to="/auth">Login</Link>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1>
                        <span style={{ color: "#D97500" }}>
                            Connect
                        </span>{" "}
                        to your loved ones
                    </h1>

                    <p>Cover the distance by LinguameetAi CrossX</p>

                    <Link to="/auth">Get Started</Link>
                </div>

                <div>
                    <img src="/mobile.png" alt="LinguaMeet AI" />
                </div>
            </div>
        </div>
    );
};

export default Landing;