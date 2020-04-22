import React from "react";

interface Props {
    value: string,
}

const JsonKey: React.FC<Props> = (props) => {
    return <span>
        <span className='json-type-key'>{"\""}{props.value}{"\""}</span>
        <span className='json-type-sep'>: </span>
    </span>
};

export default JsonKey;