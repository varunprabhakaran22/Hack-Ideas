import React from "react";
import { G_URL } from "../../constants/constants";
import { check_login, logout_user } from "../../utils/login.util";

const Header = props => {
    let is_logged_in = check_login();
    let getRurl = () => {
        let rurl = window.location.href.replace(window.location.origin, "");
        rurl = rurl.length && rurl[0] === "/" ? rurl.slice(1) : rurl;
        return rurl;
    };

    return (
        <>
            <div className="navbar-container lr-pad-d lr-pad-m f-d f-v-c">
                <div className="brand-logo c-pointer" onClick={() => (window.location.href = G_URL)}>
                    <h1>HACK IDEAS</h1>
                </div>

                <div className="right-nav-container f-d f-v-c">
                    {!is_logged_in ? (
                        <div className="nav-right f-d f-v-c hide-m">
                            <div
                                className="sign-in-btn nav-item c-pointer"
                                onClick={() =>
                                    (window.location.href = `${process.env.PUBLIC_URL}/login/?rurl=${getRurl()}`)
                                }
                            >
                                Log In
                            </div>
                            <div
                                className="sign-up-btn nav-item c-pointer"
                                onClick={() =>
                                    (window.location.href = `${process.env.PUBLIC_URL}/signup/?rurl=${getRurl()}`)
                                }
                            >
                                Sign Up
                            </div>
                        </div>
                    ) : (
                        <div className="nav-right f-d f-v-c hide-m">
                            <div className="sign-up-btn nav-item c-pointer" onClick={() => logout_user()}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx={'true'}>
                {`
                    .navbar-container {
                        height: 54px;
                        width: 100vw;
                        background: #ffffff;
                        box-shadow: var(--peaky-shadow-nav);
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 1000;
                    }

                    .navbar-container h1 {
                        margin: 0;
                    }
                    .navbar-container .brand-logo {
                        margin-right: 2.4rem;
                    }

                    .navbar-container .nav-right .sign-in-btn,
                    .navbar-container .nav-right .sign-up-btn {
                        text-decoration: none;
                        color: var(--carbon);
                        cursor: pointer;
                    }

                    .about-us a {
                        text-decoration: none;
                        color: black;
                    }

                    .right-nav-container {
                        margin-left: auto;
                    }

                    .sign-up-btn {
                        border-radius: 4px;
                        background: #f05136;
                        padding: 8px 16px !important;
                        color: #ffffff !important;
                        border-radius: var(--peaky-br-2);
                    }

                    img {
                        height: 24px;
                    }

                    .rounded-image {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        cursor: pointer;
                    }

                    .nav-item {
                        margin-left: 2rem;
                    }

                    .bell-icon {
                        width: 18px;
                        height: 18px;
                        background-size: contain;
                    }

                    .profile-menu-container {
                        display: flex;
                        flex-direction: column;
                        background: #ffffff;
                        width: 200px;
                        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
                        z-index: 1010;
                    }

                    .profile-menu-container .menu-item {
                        text-decoration: none;
                        color: black;
                        height: 50px;
                        padding: 1rem;
                        transition: all 0.4s;
                        text-align: right;
                        cursor: pointer;
                    }

                    .profile-menu-container .menu-item:hover {
                        background: #0000000d;
                    }

                    .profile-menu-container .logout-btn {
                        color: var(--facered);
                    }
                `}
            </style>
        </>
    );
};

export default Header;
