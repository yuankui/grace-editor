import React, {ChangeEventHandler, FunctionComponent} from 'react';
import {Input as AntInput} from 'antd';

interface Props {
    placeholder?: string,
    defaultValue: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}

const Input: FunctionComponent<Props> = (props) => {
    return <AntInput {...props}/>;
};

export default Input;
