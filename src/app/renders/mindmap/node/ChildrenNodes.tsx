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
        anchorLeft,
        textSize,
        onNodeConfChange,
    } = nodeContext;
    const children = (nodeConf.children || []).filter(n => n != null);

    // 计算各个节点的位置
    const heights = children.map(child => {
        return child.groupHeight;
    });
    let childrenYs = computeChildrenYs(anchorLeft.y, heights);

    const anchorRight = anchorLeft.x + textSize.width;

    if (nodeConf.collapse) {
        return null;
    }

    eventBus.useListener('DeleteChildNode', ({parentId, nodeId}) => {
        if (parentId !== nodeConf.id) return;


        onNodeConfChange(old => {
            const newChildren = (old.children || []).filter((v) => {
                return v.id !== nodeId;
            });
            return {
                ...old,
                children: newChildren,
            }
        })
    }, [onNodeConfChange])
    // 计算子节点
    const childrenEl = children.map(
        (value, index) => {
            const childY = childrenYs[index];
            const childPos = {
                x: anchorLeft.x + value.width + xShift,
                y: childY,
            };
            return <RectNode key={value.id}
                             anchorLeft={childPos}
                             onAddSibling={() => {


                                 onNodeConfChange(old => {
                                     let newChild: NodeConf;
                                     const newChildren = (old.children || []).flatMap((v, i) => {
                                         if (i === index) {
                                             newChild = createEmptyNode();
                                             return [value, newChild];
                                         } else {
                                             return [v];
                                         }
                                     });

                                     setTimeout(() => {
                                         eventBus.emit('NodeClick', {
                                             nodeId: newChild.id
                                         })
                                     }, 10);

                                     return {
                                         ...old,
                                         children: newChildren,
                                     };
                                 })
                             }}
                             parentStart={{
                                 x: anchorRight,
                                 y: anchorLeft.y,
                             }}
                             onNodeConfChange={mapper => {
                                 onNodeConfChange(old => {
                                     const newChildren = (old.children || []).map((v, i) => {
                                         if (i === index) {
                                             return mapper(v);
                                         } else {
                                             return v;
                                         }
                                     });
                                     return {
                                         ...old,
                                         children: newChildren,
                                     };
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
