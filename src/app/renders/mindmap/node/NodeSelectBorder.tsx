import React, {FunctionComponent} from 'react';
import {useNodeContext} from "./NodeContext";

interface Props {
    select: boolean,
}

const NodeSelectBorder: FunctionComponent<Props> = (props) => {
    const nodeContext = useNodeContext();
    const {nodePos, nodeSize} = nodeContext;
    const {height: nodeHeight, width: nodeWidth} = nodeSize;
    const selectWidth = 2;
    const selectColor = '#BDDCFF';

    const select = props.select;
    const borderRadius = 5;

    // 选择边框
    const border = <rect x={nodePos.x - selectWidth}
                         y={nodePos.y - nodeSize.height /2 - selectWidth}
                         fill={'transparent'}
                         stroke={select ? selectColor : 'rgba(0,0,0,0)'}
                         strokeWidth={selectWidth}
                         width={nodeWidth + 2 * selectWidth}
                         height={nodeHeight + 2 * selectWidth}
                         rx={borderRadius + selectWidth}
                         ry={borderRadius + selectWidth}
    />;
    return <>
        {border}
    </>;
};

export default NodeSelectBorder;
