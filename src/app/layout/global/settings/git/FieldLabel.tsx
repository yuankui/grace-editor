import React, {FunctionComponent} from 'react';

interface Props {
    title: string,
}

const FieldLabel: FunctionComponent<Props> = (props) => {
    return <div className='field-label'>
        <div className='field-label-title'>
            {props.title}
        </div>
        <div className='field-label-value'>
            {props.children}
        </div>
    </div>;
};

export default FieldLabel;
