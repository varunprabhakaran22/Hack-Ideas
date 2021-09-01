let email_rules = [
    {
        type: "email",
        message: "The input is not valid E-mail!",
    },
    {
        required: true,
        message: "Please input your E-mail!",
    },
];

let password =  [
    { required: true, message: 'Please input your Password!' },
    { min: 8, message: 'Password must be minimum 8 characters.' },
];

const commonRules = (rule) => {
    return [
        {
            required: true,
            message: `Please input your ${rule}`,
        },
    ];
};

const notRequired = (rule) => {
    return [
        {
            required: false,
            message: `Please input your ${rule}`,
        },
    ];
};

module.exports = { email_rules, commonRules, notRequired, password };
