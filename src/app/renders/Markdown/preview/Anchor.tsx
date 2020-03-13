import React, { FunctionComponent } from 'react';
import open from 'open';

interface Props {
    title: string,
    href: string,
}

const Anchor: FunctionComponent<Props> = (props) => {
    return <a {...props} onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        open(props.href);
    }}>
        {props.children}
    </a>;
};

export default Anchor;
