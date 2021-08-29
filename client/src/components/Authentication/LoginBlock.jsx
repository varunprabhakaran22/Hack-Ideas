import React, { Component } from "react";
import { Form, Button, notification } from "antd";
import { FormInput, FormInputPswd } from "../../components/Form/Input";
import { commonRules, email_rules } from "../../components/Form/CommonRules";
import { __setCookie } from "../../utils/cookie.util";
import axios from "axios";
import { G_API_URL, FP_COOKIE_PREFIX } from "../../constants/constants";
class LoginBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            loggedIn: false,
        };
    }

    openSuccessNotification = msg => {
        const args = {
            message: msg,
            description: "",
            top: 54,
            className: "success-notification-top",
        };
        notification.open(args);
    };

    openFailureNotification = msg => {
        const args = {
            message: msg,
            description: "",
            top: 54,
            className: "failure-notification-top",
        };
        notification.open(args);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });

                let data = {
                    data: values,
                };

                axios
                    .post(G_API_URL + "user/login", data)
                    .then(response => {
                        if (response.data.status === 1) {
                            this.openSuccessNotification("Login successfully");
                            __setCookie(FP_COOKIE_PREFIX, response.data.token, 1, "month");
                            window.location.href = `${process.env.PUBLIC_URL}/`;
                        } else {
                            this.openFailureNotification("Login Failed");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <div className="login-block">
                    <h1 className="h1-heading"> Login </h1>
                    <Form onSubmit={this.handleSubmit} className="editAd-form">
                        <FormInput
                            label={`Email Id`}
                            name="email_id"
                            placeholder="Enter Email"
                            value={this.state.email ? this.state.email : ""}
                            getFieldDecorator={getFieldDecorator}
                            rules={email_rules}
                        />

                        <FormInputPswd
                            label={`Password`}
                            name="password"
                            placeholder="Enter Password"
                            getFieldDecorator={getFieldDecorator}
                            value={this.state.password ? this.state.password : ""}
                            rules={commonRules("Alias")}
                        />

                        <Button className="signup-form-btn f-v-c f-h-c" type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form>
                </div>
                <style jsx>
                    {`
                        .btn-outline-primary {
                            display: inline-block
                            color: var(--facered);
                            border: 1px solid var(--facered) ;
                            padding: 0.5rem;
                            cursor: pointer;
                            width:100px;
                        }
                        
                        .btn-outline-primary:hover {
                          color: #fff;
                          background-color: #f05136;
                          border-color: #f05136;
                        }

                        .ant-notification {
                            left: 0 !important;
                            right: 0 !important;
                            margin: 0 !important;
                            max-width: unset !important;
                            width: 100%;
                            z-index: 999;
                            color: white;
                        }
                        .ant-notification-notice {
                            border-radius: 0;
                            box-shadow: 0 3px 6px 0 rgba(0,0,0,0.1);
                            padding: 1rem 10rem;
                        }
    
                        .ant-notification-notice-message {
                            color: var(--dove);
                            margin-bottom: 0;
                        }
    
                        .ant-notification-notice-close {
                            right: 156px;
                        }
                    `}
                </style>
            </>
        );
    }
}

const Login = Form.create({ name: "" })(LoginBlock);
export default Login;
