import React, {FunctionComponent} from 'react';
import {useNodeContext} from "./NodeContext";
import RectNode from "./RectNode";
import {createEmptyNode} from "../createEmptyNode";
import {NodeConf} from "../model";
import {defaultGutter} from "../Constants";
import {useMindMapContext} from "../context/MindMapContext";

interface Props {
}

// 横坐标便宜
const xShift = 100;
const ChildrenNodes: FunctionComponent<Props> = (props) => {
    const {eventBus} = useMindMapContext();
    let nodeContext = useNodeContext();
    const {
        nodeConf,
        nodePos,
        textSize,
        onNodeConfChange,
    } = nodeContext;
    const children = nodeConf.children || [];

    // 计算各个节点的位置
    const heights = children.map(child => {
        return child.groupHeight;
    });
    let childrenYs = computeChildrenYs(nodePos.y, heights);

    const anchorRight = nodePos.x + textSize.width;

    if (nodeConf.collapse) {
        return null;
    }

    eventBus.useListener('DeleteChildNode', ({parentId, nodeId}) => {
        if (parentId !== nodeConf.id) return;

        const newChildren = children.filter((v) => {
            return v.id !== nodeId
        });
        onNodeConfChange({
            ...nodeConf,
            children: newChildren,
        })
    }, [children, onNodeConfChange, nodeConf])
    // 计算子节点
    const childrenEl = children.map(
        (value, index) => {
            const childY = childrenYs[index];
            const childPos = {
                x: nodePos.x + value.width + xShift,
                y: childY,
            };
            return <RectNode key={value.id}
                             pos={childPos}
                             onAddSibling={() => {

                                 let newChild: NodeConf;
                                 const newChildren = children.flatMap((v, i) => {
                                     if (i === index) {
                                         newChild = createEmptyNode();
                                         return [value, newChild];
                                     } else {
                                         return [v];
                                     }
                                 });
                                 onNodeConfChange({
                                     ...nodeConf,
                                     children: newChildren,
                                 })

                                 setTimeout(() => {

                                     eventBus.emit('NodeClick', {
                                         nodeId: newChild.id
                                     })
                                 }, 100);
                             }}
                             start={{
                                 x: anchorRight,
                                 y: nodePos.y,
                             }}
                             onNodeConfChange={node => {

                                 const newChildren = children.map((v, i) => {
                                     if (i === index) {
                                         return node;
                                     } else {
                                         return v;
                                     }
                                 });

                                 onNodeConfChange({
                                     ...nodeConf,
                                     children: newChildren,
                                 })
                             }}
                             nodeConf={value}/>
        }
    );


    return <>
        {childrenEl}
    </>
};

function computeChildrenYs(center: number, heights: Array<number>) {

    if (heights == null || heights.length === 0) {
        return [];
    }
    const res = [0];
    let last = 0;
    let total = heights[0];
    for (let i = 1; i < heights.length; i++) {
        const current = last + (heights[i] + heights[i - 1]) / 2 + defaultGutter;
        res.push(current);
        last = current;
        total = total + heights[i] + defaultGutter;
    }

    const avg = (total) / 2;

    return res.map(r => r + heights[0] / 2 - avg + center);
}

export default ChildrenNodes;
