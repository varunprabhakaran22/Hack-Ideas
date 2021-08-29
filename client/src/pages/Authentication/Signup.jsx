import React, { Component } from "react";
import { Form, Button, notification } from "antd";
import Header from "../../components/Header/Header";
import { FormInput, FormInputPswd } from "../../components/Form/Input";
import { password, email_rules, commonRules } from "../../components/Form/CommonRules";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";

class SignupBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordHide: "",
            name: "",
        };
    }

    openSuccessNotification = msg => {
        const args = {
            message: msg,
            description: "",
            top: 54,
            duration: 14,
            className: "success-notification-top",
        };
        notification.open(args);
    };

    openFailureNotification = msg => {
        const args = {
            message: msg,
            description: "",
            top: 54,
            duration: 20,
            className: "failure-notification-top",
        };
        notification.open(args);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values["password"] !== values["password_hide"]) this.openFailureNotification("password mismatch");
                else {
                    this.setState({ loading: true });

                    let data = {
                        data: values,
                    };

                    axios
                        .post(G_API_URL + "user/signup", data)
                        .then(response => {
                            if (response.data.status === 1) {
                                this.openSuccessNotification("SignUp successfully");
                                window.location.href = `${process.env.PUBLIC_URL}/login/`;
                            } else if (response.data.status === 409) {
                                this.openFailureNotification("Email already present try Login in");
                            } else {
                                this.openFailureNotification("Signup Failed");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Header />
                <div className="signup-block lr-pad-d lr-pad-m ">
                    <h1 className="h1-heading"> Sign Up </h1>
                    <Form onSubmit={this.handleSubmit} className="editAd-form">
                        <FormInput
                            label={`Name`}
                            name="name"
                            placeholder="Enter Name"
                            value={this.state.name ? this.state.name : ""}
                            getFieldDecorator={getFieldDecorator}
                            rules={commonRules("name")}
                        />
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
                            rules={password}
                        />

                        <FormInputPswd
                            label={`Password`}
                            name="password_hide"
                            placeholder="Re-Enter Password"
                            getFieldDecorator={getFieldDecorator}
                            value={this.state.passwordHide ? this.state.passwordHide : ""}
                            rules={password}
                        />

                        <Button className="signup-form-btn f-v-c f-h-c" type="primary" htmlType="submit">
                            SignUp
                        </Button>
                    </Form>
                </div>
                <style jsx>
                    {`
                        .signup-block{
                            width:45vw;
                            Margin:6rem 0;
                        }
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

const Signup = Form.create({ name: "" })(SignupBlock);
export default Signup;
