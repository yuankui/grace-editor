import React, { FunctionComponent } from 'react';
import open from 'open';

interface Props {
    props: {
        title: string,
        href: string,
    },
}

const Anchor: FunctionComponent<Props> = (props) => {
    return <a {...props.props} onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        open(props.props.href);
    }}>
        {props.children}
    </a>;
};

export default Anchor;
