import React from "react";
import { Input, Form, Select } from "antd";

const { Option } = Select;

const FormInput = (props) => {
    const { getFieldDecorator, label, rules, name, placeholder } = props;
    let disabled = false;
    if (props.disabled) disabled = props.disabled;

    const getInitialValue = () => {
        if (props.value) {
            return props.value;
        } else {
            return null;
        }
    };

    return (
        <Form.Item label={label}>
            {getFieldDecorator(name, {
                rules: rules,
                initialValue: getInitialValue(),
            })(<Input placeholder={placeholder} disabled={disabled} />)}
        </Form.Item>
    );
};

const FormInputPswd = props => {

    const { getFieldDecorator, label, rules, name, placeholder } = props;
    let disabled = false;
    if (props.disabled) disabled = props.disabled;

    const getInitialValue = () => {
        if (props.value) {
            return props.value;
        } else {
            return null;
        }
    };

    return (
        <Form.Item label={label}>
            {getFieldDecorator(name, {
                rules: rules,
                initialValue: getInitialValue(),
            })(<Input.Password placeholder={placeholder} disabled={disabled} />)}
        </Form.Item>
    );

};


const FormInputMobile = (props) => {
    const { getFieldDecorator, label, name, placeholder } = props;
    const prefixSelector = getFieldDecorator("prefix", {
        initialValue: "91",
    })(
        <Select style={{ width: 70 }}>
            <Option value="91">+91</Option>
            <Option value="1">+1</Option>
        </Select>
    );
    return (
        <Form.Item label={label}>
            {getFieldDecorator(name, {
                rules: [{ required: true, message: "Please input your phone number!" }],
            })(<Input addonBefore={prefixSelector} id={"mobile-no"} placeholder={placeholder} />)}
        </Form.Item>
    );
};


export {
    FormInput,
    FormInputMobile,
    FormInputPswd
};
