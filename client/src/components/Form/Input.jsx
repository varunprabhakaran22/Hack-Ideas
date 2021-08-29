import React from "react";
import { Input, Form, Select, DatePicker, InputNumber, Radio } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

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

// const FormInputSelect = (props) => {
//     const { getFieldDecorator, label, rules, name, options, placeholder } = props;
//     const select_options = options.map((op, idx) => (
//         <Option value={op} key={idx}>
//             {op}
//         </Option>
//     ));
//     return (
//         <>
//             <Form.Item label={label}>
//                 {getFieldDecorator(name, {
//                     rules: rules,
//                 })(
//                     <Select
//                         placeholder={placeholder}
//                         onChange={
//                             props.onSelectChange
//                                 ? (value) => props.onSelectChange(value, name)
//                                 : (value) => {}
//                         }
//                     >
//                         {select_options}
//                     </Select>
//                 )}
//             </Form.Item>
//         </>
//     );
// };

// const FormInputAutoCompleteRev = (props) => {
//     const { getFieldDecorator, label, rules, name, options, placeholder, onSelectChange } = props;

//     let select_options = <></>;

//     if (name === "dept") {
//         select_options = options.map((op) => {
//             if (op.status === 1)
//                 return (
//                     <Option value={op.name} key={op.name}>
//                         {op.name}
//                     </Option>
//                 );
//         });
//     } else if (name === "group_name") {
//         select_options = options.map((op) => (
//             <Option value={op["group_id"]} key={op["group_id"]}>
//                 {op["group_name"]}
//             </Option>
//         ));
//     } else {
//         select_options = options.map((op, idx) => (
//             <Option value={op} key={idx}>
//                 {op}
//             </Option>
//         ));
//     }

//     return (
//         <>
//             <Form.Item label={label}>
//                 {getFieldDecorator(name, {
//                     rules: rules,
//                 })(
//                     <Select
//                         showSearch
//                         defaultActiveFirstOption={false}
//                         placeholder={placeholder}
//                         onChange={(value) => onSelectChange(value, name)}
//                         optionFilterProp="children"
//                         filterOption={
//                             name === "college"
//                                 ? false
//                                 : (input, option) =>
//                                       option.props.children
//                                           .toLowerCase()
//                                           .indexOf(input.toLowerCase()) >= 0
//                         }
//                         onInputKeyDown={
//                             props.onInputKeyDown ? (e) => props.onInputKeyDown(e, name) : (e) => {}
//                         }
//                     >
//                         {select_options}
//                     </Select>
//                 )}
//             </Form.Item>
//         </>
//     );
// };

// const FormSelectTime = (props) => {
//     const { getFieldDecorator, label, rules, name, placeholder } = props;
//     return (
//         <>
//             <Form.Item label={label}>
//                 {getFieldDecorator(name, {
//                     rules: rules,
//                 })(<DatePicker showTime placeholder={placeholder} />)}
//             </Form.Item>
//         </>
//     );
// };

// const FormRangeTime = (props) => {
//     const { getFieldDecorator, label, rules, name } = props;
//     return (
//         <>
//             <Form.Item label={label}>
//                 {getFieldDecorator(name, {
//                     rules: rules,
//                 })(
//                     <RangePicker
//                         showTime={{ format: "HH:mm" }}
//                         format="YYYY-MM-DD HH:mm"
//                         placeholder={["Start Time", "End Time"]}
//                     />
//                 )}
//             </Form.Item>
//         </>
//     );
// };

// const FormDatePicker = (props) => {
//     const { getFieldDecorator, label, rules, name, placeholder } = props;
//     return (
//         <>
//             <Form.Item label={label}>
//                 {getFieldDecorator(name, {
//                     rules: rules,
//                 })(<DatePicker format="DD/MM/YYYY" placeholder={placeholder} />)}
//             </Form.Item>
//         </>
//     );
// };

// const CustomInputNumber = (props) => {
//     const { placeholder, onChange, label, name } = props;
//     return (
//         <div className={`input-number ${name}`}>
//             <div className="input-label">{label}</div>
//             <InputNumber
//                 min={1}
//                 defaultValue={1}
//                 placeholder={placeholder}
//                 onChange={(e) => onChange(e, "input-number")}
//             />
//         </div>
//     );
// };

// const FormInputRadio = (props) => {
//     const { getFieldDecorator, label, rules, name, values } = props;
//     let radio_options_jsx = values.map((val) => <Radio value={val}>{val}</Radio>);

//     return (
//         <>
//             {name === "spare_time" ? (
//                 <div style={{ fontSize: 16, color: "rgba(0, 0, 0, 0.85)", fontWeight: 500 }}>
//                     {label}
//                 </div>
//             ) : (
//                 <></>
//             )}
//             <Form.Item label={name === "spare_time" ? null : label}>
//                 {getFieldDecorator(name, {
//                     rules: rules,
//                 })(
//                     <Radio.Group
//                         id={name}
//                         key={name}
//                         onChange={props.onRadioChange ? (e) => props.onRadioChange(e, name) : null}
//                     >
//                         {radio_options_jsx}
//                     </Radio.Group>
//                 )}
//             </Form.Item>
//         </>
//     );
// };

// const FormInputNumber = (props) => {
//     const { getFieldDecorator } = props;
//     const { name, label, placeholder, rules, defaultValue } = props;

//     return (
//         <>
//             <Form.Item label={label}>
//                 {getFieldDecorator(`${name}`, {
//                     initialValue: defaultValue,
//                     rules: rules,
//                 })(
//                     <InputNumber
//                         className="form-input-number"
//                         min={0}
//                         id={name}
//                         placeholder={placeholder}
//                     />
//                 )}
//             </Form.Item>
//         </>
//     );
// };

export {
    FormInput,
    FormInputMobile,
    FormInputPswd
    // FormInputSelect,
    // FormInputAutoCompleteRev,
    // FormSelectTime,
    // FormRangeTime,
    // CustomInputNumber,
    // FormDatePicker,
    // FormInputRadio,
    // FormInputNumber,
};
