import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {NodeConf} from "../model";
import NodeEdge from "./NodeEdge";
import NodeText from "./NodeText";
import {NodeContextProvider} from "./NodeContext";
import {Size} from "../model/Size";
import {Point} from "../model/Point";
import ChildrenNodes from "./ChildrenNodes";
import NodeRect from "./NodeRect";
import NodeSelectBorder from "./NodeSelectBorder";
import {createEmptyNode} from "../createEmptyNode";
import {useMindMapContext} from "../context/MindMapContext";
import {EMPTY, from} from "rxjs";
import {catchError, last, skipWhile, take, takeWhile} from "rxjs/operators";
import {computeGroupHeight} from "./computeGroupHeight";
import ExpandIcon from "./ExpandIcon";
import {DropEvent, useDndContext} from "../dragdrop/DndContext";
import {useBoardContext} from "../BoardContext";

export interface Mapper<T> {
    (old: T): T,
}
interface NodeProps {
    pos: Point,
    start?: Point, // 父节点连线起点
    onSelect?: () => void, // 选择 TODO 增加矩形框选择
    select?: boolean, // 选择

    nodeConf: NodeConf,
    onNodeConfChange: (mapper:  Mapper<NodeConf>) => void,
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
    const {eventBus, nodeMap} = useMindMapContext();

    const getGroupHeight = useCallback((node: NodeConf) => {
        const groupHeight = computeGroupHeight(node.children, node.collapse);
        return Math.max(groupHeight, node.height);
    }, []);

    const dndContext = useDndContext();

    // 拖动偏移计算
    const [currentPoint, setCurrentPoint] = useState<Point>(null as any);

    useEffect(() => {
        dndContext.moveEvent.on('move', point => {
            setCurrentPoint(point);
        })
    }, []);

    let shiftedPos: Point = nodePos as Point;
    if (dndContext.value.moving && dndContext.value.src.id === nodeConf.id) {
        const {startPoint} = dndContext.value;
        const {y, x} = shiftedPos;
        if (currentPoint && startPoint) {
            shiftedPos = {
                x: x + currentPoint?.x - startPoint?.x,
                y: y + currentPoint?.y - startPoint?.y,
            }
        }
    }

    // 节点选中状态
    const [select, setSelect] = useState(false);

    eventBus.useListener("NodeClick", event => {
        setSelect(event.nodeId === nodeId);
    });

    eventBus.useListener("BoardClick", () => {
        setSelect(false);
    })

    // 删除节点
    eventBus.useListener('DeleteNode', () => {
        setSelect(select => {
            if (select) {
                eventBus.emit('DeleteChildNode', {
                    nodeId: nodeConf.id,
                    parentId: nodeMap[nodeConf.id].parent?.id
                })
            }
            return select;
        })
    }, [nodeMap])

    // 新增子节点
    eventBus.useListener("InsertChild", () => {
        if (!select) {
            return;
        }

        let newChild = createEmptyNode();
        const newChildren: Array<NodeConf> = [...children, newChild]
        props.onNodeConfChange(old => {
            return {
                ...old,
                children: newChildren,
                collapse: false,
            }
        });

        setTimeout(() => {
            eventBus.emit('NodeClick', {
                nodeId: newChild.id
            });
        }, 100)
    }, [select])
    useEffect(() => {
        const handler = event => {
            if (event.parent.id === nodeConf.id) {
                const newChildren: Array<NodeConf> = [...children, event.node]
                props.onNodeConfChange(old => {
                    return {
                        ...old,
                        children: newChildren,
                        collapse: false,
                    }
                });
            }
        };
        eventBus.on('AddChild', handler);
        return () => eventBus.off('AddChild', handler);
    }, []);

    // 新增兄弟节点
    eventBus.useListener('InsertSibling', () => {
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

        props.onNodeConfChange(old => {
            return {
                ...old,
                width: size.width,
                height: size.height,
                groupHeight: Math.max(childHeight, size.height),
            }
        })
    };

    // 计算边界
    const edgeEnd: Point = {
        x: shiftedPos.x + paddingLeft,
        y: shiftedPos.y,
    };

    // 文本
    const textArea = {
        height: nodeConf.height - paddingTop * 2,
        width: nodeConf.width - paddingLeft * 2,
    };
    const textPos = {
        x: shiftedPos.x + paddingLeft,
        y: shiftedPos.y,
    };


    // 聚焦节点移动
    // 左移
    eventBus.useListener('MoveLeft', () => {
        if (!select) {
            return;
        }
        const node = nodeMap[nodeId];
        if (node.parent == null) return;
        eventBus.emit('NodeClick', {
            nodeId: node.parent.id
        });
    }, [nodeMap, select]);


    // 展开
    eventBus.useListener('ExpandOn', () => {
        if (!select) {
            return;
        }

        props.onNodeConfChange(old => {
            const groupHeight = getGroupHeight({...old, collapse: false});
            return {
                ...old,
                collapse: false,
                groupHeight,
            }
        })
    }, [select]);

    // 收起
    eventBus.useListener('ExpandOff', () => {
        if (!select) {
            return;
        }

        props.onNodeConfChange(old => {
            const groupHeight = getGroupHeight({...old, collapse: true});
            return {
                ...old,
                collapse: true,
                groupHeight,
            }
        })
    }, [select]);



    // 右移
    eventBus.useListener('MoveRight', () => {
        if (!select) {
            return;
        }
        const node = nodeMap[nodeId];
        let childNodes = node.node.children;
        if (childNodes == null || childNodes.length == 0) return;

        const rightNode = childNodes[Math.floor((childNodes.length - 1) / 2)];
        eventBus.emit('NodeClick', {
            nodeId: rightNode.id,
        });
    }, [nodeMap, select]);

    // 上移
    eventBus.useListener('MoveUp', () => {
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
                eventBus.emit('NodeClick', {
                    nodeId: n.id,
                });
            })

    }, [nodeMap, select]);

    // 下移
    eventBus.useListener('MoveDown', () => {
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
                eventBus.emit('NodeClick', {
                    nodeId: n.id,
                });
            })

    }, [nodeMap, select]);


    const hitTest = useCallback((x: number, y: number) => {
        const minX = shiftedPos.x;
        const maxX = shiftedPos.x + nodeConf.width;
        const minY = shiftedPos.y - nodeConf.height / 2;
        const maxY = shiftedPos.y + nodeConf.height / 2;

        return minX <= x && x <= maxX && minY <= y && y <= maxY;
    }, [shiftedPos.x, shiftedPos.y, nodeConf.widget, nodeConf.height]);


    // 节点移动
    const {outerToInner} = useBoardContext();
    useEffect(() => {
        const listener = (e: DropEvent) => {
            const point = outerToInner(e.outPoint);

            // 如果命中，就触发drop事件
            if (hitTest(point.x, point.y)) {
                // 判断目标节点，是否是当前节点的子节点
                let isChild = false;
                let current: NodeConf | undefined = nodeConf;
                while (true) {
                    if (current == undefined) {
                        break;
                    }
                    if (current.id == e.src.id) {
                        isChild = true;
                        break;
                    }
                    current = nodeMap[current.id].parent
                }
                if (!isChild) {
                    eventBus.emit("MoveNode", {
                        from: e.src,
                        to: nodeMap[nodeConf.id].node,
                    })
                }
            }
        };
        dndContext.upEvent.on('up', listener);
        return () => dndContext.upEvent.off('up', listener);
    }, [dndContext.upEvent, outerToInner, hitTest, nodeMap]);


    return <NodeContextProvider value={{
        parentStart: props.start,
        nodeConf: props.nodeConf,
        textSize: textArea,
        textPos: textPos,
        paddingLeft: paddingLeft,
        paddingTop: paddingTop,
        nodePos: shiftedPos,
        nodeStyle: {
            borderRadius: 5,
            borderWidth: 2,
            fillColor: '#FFFFFF',
            borderColor: 'white',
            fontSize: 16,
        },
        onNodeConfChange: props.onNodeConfChange, // TODO 更新onNodeConfChange，改用事件机制
        nodeGutter: defaultGutter,
        select: select,
        hitTest,
    }}>
        {/*{frameRect}*/}
        <NodeEdge key={props.nodeConf.id} end={edgeEnd}/>
        <ChildrenNodes/>
        <NodeSelectBorder select={select}/>
        <NodeRect/>
        <NodeText onAreaChange={changeTextArea}/>
        <ExpandIcon/>
    </NodeContextProvider>;
};


export default RectNode;
