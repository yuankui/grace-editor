import React from 'react';
import {Checkbox} from "antd";
import {Value} from "../Value";

interface Props<T> extends Value<T> {
    component: React.FunctionComponent<Value<T>> | React.ComponentClass<Value<T>>,
}

function Nullable<T>(props: Props<T>) {
    const Com = props.component;
    const enable = {
        enable: props.value !== undefined,
    };

    return <div className='nullable-value'>
        <Checkbox checked={enable.enable} onChange={e => {
            if (e.target.checked) {
                props.onChange(null as any);
            } else {
                props.onChange(undefined as any);
            }
        }}/>
        <Com {...props} {...enable}/>
    </div>;
}

export default Nullable;
