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
import {NodeSizeMap} from "./NodeSizeMap";
import {useNodeMap} from "../context/MindMapContext";
import {EMPTY, from} from "rxjs";
import {catchError, last, skipWhile, take, takeWhile} from "rxjs/operators";

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
export const defaultNodeHeight = 20;
export const defaultNodeWidth = 100;
const RectNode: FunctionComponent<NodeProps> = (props) => {
    const {nodeConf} = props;
    const {id: nodeId} = nodeConf;
    const nodePos = props.pos;
    const [paddingTop, paddingLeft] = [5, 10];
    const children = nodeConf.children || [];

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


    // 计算节点高度
    const [childrenSize, setChildrenSize] = useState<NodeSizeMap>({});


    const updateChildSize = (nodeId: string, size: Size) => {
        setChildrenSize(prevState => {
            return {
                ...prevState,
                [nodeId]: size,
            };
        });
    }

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
        const childHeight = (nodeConf.children || [])
            .map(n => n.groupHeight)
            .reduce((sum, curr) => sum + curr, 0);

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
        nodeSize: nodeConf,
        nodeStyle: {
            borderRadius: 5,
            borderWidth: 2,
            fillColor: '#FFFFFF',
            borderColor: 'white',
            fontSize: 16,
        },
        onNodeConfChange: props.onNodeConfChange,
        nodeGutter: defaultGutter,
        select: select,
        childrenSize: childrenSize,
        setChildrenSize,
        updateChildSize,
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
