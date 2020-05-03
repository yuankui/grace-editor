import React, {FunctionComponent, ReactNode, useRef} from 'react';
import {Popover as Pop} from '@material-ui/core';
import useTheme from "../../../../hooks/useTheme";

interface Props {
    content: ReactNode,
    onClose: () => void,
    visible: boolean,
}

const Popover: FunctionComponent<Props> = (props) => {
    const ref = useRef<any>();
    const theme = useTheme();

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
            style={theme as any}
            className='app-popover'
        >
            {props.content}
        </Pop>
    </>;
};

export default Popover;
