import {notification } from "antd";

export const openSuccessNotification = msg => {
    const args = {
        message: msg,
        description: "",
        top: 54,
        className: "success-notification-top",
    };
    notification.open(args);
};

export const openFailureNotification = msg => {
    const args = {
        message: msg,
        description: "",
        top: 54,
        className: "failure-notification-top",
    };
    notification.open(args);
};

