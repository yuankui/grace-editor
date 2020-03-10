import React, { FunctionComponent } from 'react';

interface Props {
    props: any,
    className: string,
}

const Code: FunctionComponent<Props> = (props) => {
    return <code className='app'>
        {props.children}
    </code>
};

export default Code;
