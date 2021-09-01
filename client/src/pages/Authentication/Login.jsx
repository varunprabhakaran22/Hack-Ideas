import React, { Component } from "react";
import Header from "../../components/Header/Header";
import LoginBlock from "../../components/Authentication/LoginBlock.jsx";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            isForm: "login",
        };
    }

    render() {
        const { isForm } = this.state;
        return (
            <>
                <Header />
                <div className="login-container lr-pad-d lr-pad-m f-d f-v-c f-h-sb">
                    <div className="login-left-container">
                        {isForm === "login" ? <LoginBlock loginType={"page"} /> : ""}
                        <div className={`aditional-action-con f-d f-vt ${isForm === "reset" ? "hide" : ""}`}>
                            <div className="create-account-block">
                                New to hackIdeas?{" "}
                                <a className="create-new-btn c-pointer" href={"/signup" + this.props.location.search}>
                                    Create a free account
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx={'true'}>
                    {`
                        .login-container {
                            height: calc(100vh - 54px);
                            padding-bottom: 2rem;
                        }

                        .login-container .login-left-container {
                            width: 300px;
                        }

                        .login-right-container .image-container {
                            width: 450px;
                            height: 450px;
                        }

                        .create-new-btn,
                        .forgot-pswd-btn {
                            margin: 1rem 0;
                            color: var(--bluelagoon);
                            transition: all 0.4s;
                        }

                        .create-new-btn {
                            margin-left: 8px;
                        }

                        .create-account-block {
                            margin: 1rem 0;
                        }

                        .create-new-btn:hover,
                        .forgot-pswd-btn:hover {
                            color: #40a9ff;
                        }

                        @media only screen and (max-device-width: 760px) {
                            .login-container .login-left-container {
                                width: 100%;
                            }

                            .create-account-block,
                            .forgot-pswd-btn {
                                align-self: center;
                            }
                        }

                        @media only screen and (max-device-width: 760px) and (orientation: landscape) {
                            .login-container {
                                height: calc(180vh - 54px);
                            }

                            .login-container .login-left-container {
                                width: 60%;
                                margin: 0 auto;
                            }
                        }

                        @media screen and (min-width: 768px) and (max-width: 1024px) {
                            .login-container {
                                height: calc(730px - 54px);
                            }
                        }
                    `}
                </style>
            </>
        );
    }
}

export default Login;
