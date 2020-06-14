import React, {FunctionComponent} from 'react';
import {useNodeContext} from "./NodeContext";
import {useMindMapContext} from "../context/MindMapContext";

interface Props {
}

const NodeRect: FunctionComponent<Props> = () => {
    let nodeContext = useNodeContext();
    const {eventBus} = useMindMapContext();
    const {anchorLeft, nodeConf, nodeStyle} = nodeContext;
    const {height: nodeHeight, width: nodeWidth} = nodeConf;
    const {id: nodeId} = nodeConf;
    // 矩形背景
    return <rect x={anchorLeft.x}
                 y={anchorLeft.y - nodeHeight / 2}
                 onClick={e => {
                     eventBus.emit('NodeClick', {
                         nodeId,
                     });
                     console.log('node-click', nodeConf)
                     e.stopPropagation();
                 }}
                 onDoubleClick={e => {
                     eventBus.emit("NodeDoubleClick", {
                         nodeId
                     });
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
