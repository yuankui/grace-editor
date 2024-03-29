import React, {FunctionComponent, ReactNode} from 'react';

interface Props {
    title: ReactNode,
    width?: number,
}

const FieldLabel: FunctionComponent<Props> = (props) => {
    const style = props.width != null ? {
        flexBasis: props.width
    } : {};

    return <div className='field-label'>
        <div className='field-label-title' style={style}>
            {props.title}
        </div>
        <div className='field-label-value'>
            {props.children}
        </div>
    </div>;
};

export default FieldLabel;
