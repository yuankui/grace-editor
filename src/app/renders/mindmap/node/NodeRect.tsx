import React, {FunctionComponent} from 'react';
import {useNotifier} from "../hooks/useListener";
import {useNodeContext} from "./NodeContext";

interface Props {
}

const NodeRect: FunctionComponent<Props> = () => {
    let nodeContext = useNodeContext();
    const {nodePos, nodeConf, nodeStyle} = nodeContext;
    const {height: nodeHeight, width: nodeWidth} = nodeConf;
    const {id: nodeId} = nodeConf;
    // 矩形背景
    const notifier = useNotifier();
    return <rect x={nodePos.x}
                 y={nodePos.y - nodeHeight / 2}
                 onClick={e => {
                     notifier('NodeClick', nodeId);
                     e.stopPropagation();
                 }}
                 onDoubleClick={e => {
                     notifier("NodeDoubleClick", nodeId);
                     e.stopPropagation();
                 }}
                 fill={nodeStyle.fillColor}
                 stroke={nodeStyle.borderColor}
                 strokeWidth={nodeStyle.borderWidth}

                 width={nodeWidth}
                 height={nodeHeight}
                 rx={nodeStyle.borderRadius}
                 ry={nodeStyle.borderRadius}
    />;
};

export default NodeRect;
