import React from "react";
import TypeFactory from "./types/TypeFactory";

interface Props {
    value: object,
    onChange: (value: any) => void,
}
const JsonView: React.FC<Props> = props => {
    const JsonType = TypeFactory(props.value);
    return <div className='json-view'>
        <JsonType value={props.value} prefix={null} suffix={null} onChange={(v) => props.onChange(v)}/>
    </div>
};

export default JsonView;