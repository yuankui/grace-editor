import React, { FunctionComponent } from 'react';
import {Value} from "./Value";
import {Input as AInput} from 'antd';


const Input: FunctionComponent<Value<string>> = (props) => {
    return <AInput value={props.value} onChange={e => props.onChange(e.target.value)}/>;
};

export default Input;
