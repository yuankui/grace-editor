import React, {FunctionComponent} from 'react';
import {Value} from "../Value";
import {InputNumber} from "antd";

interface Props extends Value<number>{
    enable?: boolean,
}

const NumberField: FunctionComponent<Props> = (props) => {
    return <>
        <InputNumber disabled={!props.enable}
                     value={props.value}
                     onChange={num => props.onChange(num as number)}/>
    </>;
};

export default NumberField;
