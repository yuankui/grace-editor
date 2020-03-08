import React, { FunctionComponent } from 'react';

interface Props {
    props: any,
}

const Anchor: FunctionComponent<Props> = (props) => {
    return <a {...props.props} href='#'>
        {props.children}
    </a>;
};

export default Anchor;
