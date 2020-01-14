import React from "react";
import TypeFactory from "./types/TypeFactory";

interface Props {
    value: object,
}
const JsonView: React.FC<Props> = props => {
    return <div className='json-view'>
        {TypeFactory(props.value).render(props.value, null, null, () => {
        })}
    </div>
};

export default JsonView;