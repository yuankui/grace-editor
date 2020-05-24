import React, {FunctionComponent, useState} from 'react';
import {NodeConf} from "../model";
import NodeEdge from "./NodeEdge";
import NodeText from "./NodeText";
import {NodeContextProvider} from "./NodeContext";
import {Size} from "../model/Size";
import {Point} from "../model/Point";
import ChildrenNodes from "./ChildrenNodes";
import NodeRect from "./NodeRect";
import NodeSelectBorder from "./NodeSelectBorder";
import {useListener, useNotifier} from "../hooks/useListener";
import {createEmptyNode} from "../createEmptyNode";
import {useNodeMap} from "../context/MindMapContext";
import {EMPTY, from} from "rxjs";
import {catchError, last, skipWhile, take, takeWhile} from "rxjs/operators";
import {computeGroupHeight} from "./computeGroupHeight";

interface NodeProps {
    pos: Point,
    start?: Point, // 父节点连线起点
    onSelect?: () => void, // 选择 TODO 增加矩形框选择
    select?: boolean, // 选择

    nodeConf: NodeConf,
    onNodeConfChange: (node: NodeConf) => void,
    onDelete: () => void,
    onAddSibling: () => void,
}

// 节点之间的，垂直方向的间隙
const defaultGutter = 20;
const RectNode: FunctionComponent<NodeProps> = (props) => {
    const {nodeConf} = props;
    const {id: nodeId} = nodeConf;
    const nodePos = props.pos;
    const [paddingTop, paddingLeft] = [5, 10];
    const children = nodeConf.children || [];
    const changeNode = (node: NodeConf) => {
        const groupHeight = computeGroupHeight(node.children, node.collapse);
        props.onNodeConfChange({
            ...node,
            groupHeight: Math.max(groupHeight, node.height),
        })
    }
    // 节点选中状态
    const [select, setSelect] = useState(false);
    let notifier = useNotifier();
    useListener("NodeClick", (type, id) => {
        if (id === nodeId) {
            setSelect(true);
        } else if (select) {
            setSelect(false);
        }
    }, [select]);

    useListener("BoardClick", () => {
        setSelect(false);
    })

    // 删除节点
    useListener('DeleteNode', () => {
        if (!select) return;
        props.onDelete();
        // 选择新的几点
    }, [select]);
    // 新增子节点
    useListener("InsertChild", type => {
        if (!select) {
            return;
        }

        let newChild = createEmptyNode();
        const newChildren: Array<NodeConf> = [...children, newChild]
        props.onNodeConfChange({
            ...nodeConf,
            children: newChildren,
        });

        setTimeout(() => {
            notifier('NodeClick', newChild.id);
        }, 100)
    }, [select])

    // 新增兄弟节点
    useListener('InsertSibling', () => {
        if (!select) return;
        props.onAddSibling();
    }, [select])

    // 改变文本框尺寸
    const changeTextArea = (textArea: Size) => {

        const size = {
            height: textArea.height + paddingTop * 2,
            width: textArea.width + paddingLeft * 2,
        };

        if (size.height == nodeConf.height) {
            // 高度没有改变，就不出发上层更新，性能优化
            return;
        }

        // 计算子节点高度和
        const childHeight = computeGroupHeight(nodeConf.children, nodeConf.collapse);

        props.onNodeConfChange({
            ...nodeConf,
            width: size.width,
            height: size.height,
            groupHeight: Math.max(childHeight, size.height),
        })
    };

    // 计算边界
    const edgeEnd: Point = {
        x: nodePos.x + paddingLeft,
        y: nodePos.y,
    };

    // 文本
    const textArea = {
        height: nodeConf.height - paddingTop * 2,
        width: nodeConf.width - paddingLeft * 2,
    };
    const textPos = {
        x: nodePos.x + paddingLeft,
        y: nodePos.y,
    };

    let nodeMap = useNodeMap();


    // 聚焦节点移动
    // 左移
    useListener('MoveLeft', () => {
        if (!select) {
            return;
        }
        const node = nodeMap[nodeId];
        if (node.parent == null) return;
        notifier('NodeClick', node.parent.id);
    }, [nodeMap, select]);


    // 展开
    useListener('ExpandOn', () => {
        if (!select) {
            return;
        }

        changeNode({
            ...nodeConf,
            collapse: false,
        })
    }, [nodeConf, select]);

    // 收起
    useListener('ExpandOff', () => {
        if (!select) {
            return;
        }

        changeNode({
            ...nodeConf,
            collapse: true,
        })
    }, [nodeConf, select]);



    // 右移
    useListener('MoveRight', () => {
        if (!select) {
            return;
        }
        const node = nodeMap[nodeId];
        let childNodes = node.node.children;
        if (childNodes == null || childNodes.length == 0) return;

        const rightNode = childNodes[Math.floor((childNodes.length - 1) / 2)];
        notifier('NodeClick', rightNode.id);
    }, [nodeMap, select]);

    // 上移
    useListener('MoveUp', () => {
        if (!select) {
            return;
        }
        const node = nodeMap[nodeId];
        if (node.parent == null) {
            return;
        }
        from(node.parent.children || [])
            .pipe(
                takeWhile(n => n.id != nodeId),
                last(),
                catchError(() => EMPTY),
            )
            .subscribe(n => {
                notifier('NodeClick', n.id);
            })

    }, [nodeMap, select]);

    // 下移
    useListener('MoveDown', () => {
        if (!select) {
            return;
        }
        const node = nodeMap[nodeId];
        if (node.parent == null) {
            return;
        }
        from(node.parent.children || [])
            .pipe(
                skipWhile(n => n.id != nodeId),
                take(2),
                last(),
            )
            .subscribe(n => {
                notifier('NodeClick', n.id);
            })

    }, [nodeMap, select]);


    return <NodeContextProvider value={{
        parentStart: props.start,
        nodeConf: props.nodeConf,
        textSize: textArea,
        textPos: textPos,
        paddingLeft: paddingLeft,
        paddingTop: paddingTop,
        nodePos: nodePos,
        nodeStyle: {
            borderRadius: 5,
            borderWidth: 2,
            fillColor: '#FFFFFF',
            borderColor: 'white',
            fontSize: 16,
        },
        onNodeConfChange: changeNode,
        nodeGutter: defaultGutter,
        select: select,
    }}>
        {/*{frameRect}*/}
        <NodeEdge key={props.nodeConf.id} end={edgeEnd}/>
        <ChildrenNodes/>
        <NodeSelectBorder select={select}/>
        <NodeRect/>
        <NodeText onAreaChange={changeTextArea}/>

    </NodeContextProvider>;
};


export default RectNode;
