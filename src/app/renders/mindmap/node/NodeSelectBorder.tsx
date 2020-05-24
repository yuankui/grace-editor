import React, {FunctionComponent} from 'react';
import {useNodeContext} from "./NodeContext";

interface Props {
    select: boolean,
}

const NodeSelectBorder: FunctionComponent<Props> = (props) => {
    const nodeContext = useNodeContext();
    const {nodePos, nodeConf} = nodeContext;
    const {height, width} = nodeConf;
    const selectWidth = 2;
    const selectColor = '#BDDCFF';

    const select = props.select;
    const borderRadius = 5;

    // 选择边框
    const border = <rect x={nodePos.x - selectWidth}
                         y={nodePos.y - height /2 - selectWidth}
                         fill={'transparent'}
                         stroke={select ? selectColor : 'rgba(0,0,0,0)'}
                         strokeWidth={selectWidth}
                         width={width + 2 * selectWidth}
                         height={height + 2 * selectWidth}
                         rx={borderRadius + selectWidth}
                         ry={borderRadius + selectWidth}
    />;
    return <>
        {border}
    </>;
};

export default NodeSelectBorder;
