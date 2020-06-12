import React, {FunctionComponent, useState} from 'react';
import {useMindMapContext} from "./MindMapContext";

interface Props {
    nodeId: string,
}

const nodeStyle = {
    borderRadius: 5,
    borderWidth: 2,
    fillColor: '#FFFFFF',
    borderColor: 'white',
    fontSize: 16,
};

const defaultRect = {
    left: 0,
    top: 0,
    height: 20,
    width: 60
};

const NodeFrame: FunctionComponent<Props> = ({nodeId}) => {
    const {eventBus, nodeInfoMap} = useMindMapContext();
    const nodeInfo = nodeInfoMap.get(nodeId);

    const {rect = defaultRect} = nodeInfo;

    // 矩形背景
    return <rect x={rect.left}
                 y={rect.top}
                 onClick={e => {
                     eventBus.emit('NodeClick', {
                         nodeId,
                     });
                     e.stopPropagation();
                 }}
                 onDoubleClick={e => {
                     eventBus.emit("NodeDoubleClick", {
                         nodeId,
                     });
                     e.stopPropagation();
                 }}
                 fill={nodeStyle.fillColor}
                 stroke={nodeStyle.borderColor}
                 strokeWidth={nodeStyle.borderWidth}

                 width={rect.width}
                 height={rect.height}
                 rx={nodeStyle.borderRadius}
                 ry={nodeStyle.borderRadius}
    />;
};

export default NodeFrame;
