import React, {FunctionComponent} from 'react';
import {Point} from "../model/Point";
import {useNodeContext} from "./NodeContext";

interface Props {
    end: Point,
}

const NodeEdge: FunctionComponent<Props> = (props) => {
    let nodeContext = useNodeContext();
    const {parentStart} = nodeContext;
    if (parentStart == null) {
        return null;
    }

    const c = 30;
    const {x: x1, y: y1} = parentStart;
    const {x: x2, y: y2} = props.end;

    const cx1 = x1 + c;
    const cy1 = y1;

    const cx2 = x2 - c;
    const cy2 = y2;

    return <path d={`M ${x1} ${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`}
                 className='edge'
                 stroke={'#ff5f8c'}/>; // TODO color
};

export default NodeEdge;
