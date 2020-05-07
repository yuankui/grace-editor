import React, { FunctionComponent } from 'react';

interface Props {
    href: string,
}

const Link: FunctionComponent<Props> = (props) => {
    return <a href={props.href} onClick={e=> {
        open(props.href);
        e.stopPropagation();
        e.preventDefault();
    }}>
        {props.children}
    </a>;
};

export default Link;
