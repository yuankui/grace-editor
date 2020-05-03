import React, {FunctionComponent, ReactNode, useRef} from 'react';
import {Popover as Pop} from '@material-ui/core';

interface Props {
    content: ReactNode,
    onClose: () => void,
    visible: boolean,
}

const Popover: FunctionComponent<Props> = (props) => {
    const ref = useRef<any>();
    return <>
        <span ref={ref}>{props.children}</span>
        <Pop
            open={props.visible}
            anchorEl={ref.current}
            onClose={props.onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {props.content}
        </Pop>
    </>;
};

export default Popover;
