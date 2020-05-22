import React, {FunctionComponent} from 'react';
import {useNodeContext} from "./NodeContext";
import RectNode, {defaultNodeHeight} from "./RectNode";
import {createEmptyNode} from "../createEmptyNode";
import {useNotifier} from "../hooks/useListener";
import {NodeConf} from "../model";

interface Props {}

const defaultGutter = 20;
// 横坐标便宜
const xShift = 100;
const ChildrenNodes: FunctionComponent<Props> = (props) => {
    let nodeContext = useNodeContext();
    const {
        nodeConf,
        nodeSize,
        nodePos,
        textSize,
        onNodeConfChange,
        childrenSize,
        updateChildSize,
    } = nodeContext;
    const {width: nodeWidth} = nodeSize;
    const children = nodeConf.children || [];

    // 计算各个节点的位置
    const heights = children.map(child => {
        let id = child.id;
        return childrenSize[id]?.height || defaultNodeHeight;
    });
    let childrenYs = computeChildrenYs(nodePos.y, heights);

    const anchorRight = nodePos.x + textSize.width;

    let notifier = useNotifier();
    // 计算子节点
    const childrenEl = children.map(
        (value, index) => {
            const childY = childrenYs[index];
            const childPos = {
                x: nodePos.x + nodeWidth + xShift,
                y: childY,
            };
            return <RectNode key={value.id}
                             pos={childPos}
                             onSizeChange={(size) => {
                                 setTimeout(() => updateChildSize(value.id, size), 20);
                             }}
                             onDelete={() => {
                                 const newChildren = children.filter((v, i) => {
                                     return index !== i;
                                 });
                                 onNodeConfChange({
                                     ...nodeConf,
                                     children: newChildren,
                                 })
                                 setTimeout(() => updateChildSize(value.id, null as any), 20);
                             }}
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
                                     notifier('NodeClick', newChild.id)
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
    for (let i = 1; i < heights.length; i++) {
        const current = last + (heights[i] + heights[i - 1]) / 2 + defaultGutter;
        res.push(current);
        last = current;
    }

    const avg = (last) / 2;

    return res.map(r => r - avg + center);
}
export default ChildrenNodes;
