import React, { FunctionComponent } from 'react';

interface Props {
    x: number,
    y: number,
    width: number,
    height: number,
}

const Frame: FunctionComponent<Props> = (props) => {
    const p1 = {
        cx: props.x,
        cy: props.y,
    };
    const p2 = {
        cx: props.x + props.width,
        cy: props.y,
    };
    const p3 = {
        cx: props.x,
        cy: props.y + props.height,
    };
    const p4 = {
        cx: props.x + props.width,
        cy: props.y + props.height,
    };

    return <>
        <circle {...p1} r={1} fill='green'/>
        <circle {...p2} r={1} fill='green'/>
        <circle {...p3} r={1} fill='green'/>
        <circle {...p4} r={1} fill='green'/>
    </>;
};

export default Frame;
