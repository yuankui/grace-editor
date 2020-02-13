import React, { FunctionComponent } from 'react';
import {Value} from "../Value";
import {Input} from "antd";

interface Props extends Value<string>{
    enable?: boolean,
}

const StringField: FunctionComponent<Props> = (props) => {
    return <>
        <Input disabled={!props.enable} value={props.value} onChange={e => props.onChange(e.target.value)}/>
    </>;
};

export default StringField;
