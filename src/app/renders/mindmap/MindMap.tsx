import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import Board from "./Board";
import RectNode, {Mapper} from "./node/RectNode";
import {NodeConf, Value} from "./model";
import {bindKey} from "./hotkey/hotkeys";
import {NodeMap, NodeWithParent} from "./context/NodeMap";
import {MindMapContextProvider} from './context/MindMapContext';
import {useHistory} from "./history/history";
import isHotkey from "is-hotkey";
import {lazyExecute} from "../../../utils/lazyExecute";
import {DndContextProvider} from "./dragdrop/DndContext";
import {EventBus} from "./events/eventBus";
import {Point} from "./model/Point";
import ScaleControlBar from "./scale-control/ScaleControlBar";

export interface MindMapProps {
    value: Value,
    onChange: (mapper: Mapper<Value>) => void,
    width: string,
    height: string,
}

const updateNodeMap = (nodes: Array<NodeConf>, setNodeMap: any) => {
    const map: NodeMap = {};

    const iterNodes = (parent: NodeConf | undefined, nodes: Array<NodeConf>) => {
        for (let node of nodes) {
            if (node == null) continue;
            map[node.id] = {
                node,
                parent
            }
            if (node.children == null) continue;
            iterNodes(node, node.children);
        }
    }
    iterNodes(undefined, nodes);
    console.log('nodemap', map);
    setNodeMap(map);
};

const lazyUpdateNodeMap = lazyExecute(updateNodeMap, 50);

const defaultOrigin: Point = {
    x: 0,
    y: 0,
}
const MindMap: FunctionComponent<MindMapProps> = (props) => {
    const nodeConf = props.value.roots[0];
    let history = useHistory<Value>(props.value);
    // eventBus
    const eventBus = useMemo(() => {
        return new EventBus();
    }, []);

    const [nodeMap, setNodeMap] = useState<{ [key: string]: NodeWithParent }>({});

    useEffect(() => {
        lazyUpdateNodeMap([nodeConf], setNodeMap);
    }, [nodeConf, setNodeMap]);

    eventBus.useListener('UpdateNodeMap', (event, resolve) => {
        props.onChange(old => {
            updateNodeMap([old.roots[0]], setNodeMap);
            resolve();
            return old;
        })
    })

    const listener = useMemo(() => {
        const listeners = [
            bindKey('tab', "InsertChild", eventBus),
            bindKey('enter', "InsertSibling", eventBus),
            bindKey('backspace', "DeleteNode", eventBus),
            bindKey('mod+enter', "EditNode", eventBus),
            bindKey('up', "MoveUp", eventBus),
            bindKey('down', "MoveDown", eventBus),
            bindKey('left', "MoveLeft", eventBus),
            bindKey('right', "MoveRight", eventBus),
            bindKey('mod+=', "ExpandOn", eventBus),
            bindKey('mod+-', "ExpandOff", eventBus),
        ]

        const historyListener = (e: KeyboardEvent) => {
            if (isHotkey('cmd+z', e)) {
                history.pop((item: Value) => {
                    props.onChange(() => item);
                })
                e.stopPropagation();
                e.preventDefault();
                return;
            }

            if (isHotkey('cmd+shift+z', e)) {
                history.forward((item: Value) => {
                    props.onChange(() => item);
                })
                e.stopPropagation();
                e.preventDefault();
                return;
            }
        }
        return (e: React.KeyboardEvent) => {
            // 回滚，回复历史，cmd+Z，cmd+shift+Z
            historyListener(e.nativeEvent);
            for (let item of listeners) {
                if (item(e.nativeEvent)) {
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                }
            }
        }
    }, [])

    const ref = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState({
        width: 1000,
        height: 500,
    })

    // 定期同步svg尺寸
    useEffect(() => {
        const syncWidth = () => {
            if (ref.current) {
                const {clientWidth, clientHeight} = ref.current;
                setSize(prev => {
                    if (prev.width != clientWidth || prev.height != clientHeight) {
                        console.log('sync size', prev, {
                            width: clientWidth,
                            height: clientHeight,
                        });
                        return {
                            width: clientWidth,
                            height: clientHeight,
                        }
                    }
                    return prev;
                });
            }
        }
        syncWidth();
        const h = setInterval(syncWidth, 50);
        return () => clearInterval(h);
    }, [])


    // 移动节点dnd
    eventBus.useListener("MoveNode", (e, resolve) => {
        // 通过set来动态获取nodeMap，这样不用让整个useEffect重新编译
        setNodeMap(nodeMap => {
            const oldParent = nodeMap[e.from.id].parent;
            eventBus.emit("DeleteChildNode", {
                nodeId: e.from.id,
                parentId: oldParent?.id,
            });

            eventBus.emit('UpdateNodeMap');
            eventBus.emit("AddChild", {
                node: e.from,
                parent: e.to,
            })

            // 刷新节点
            eventBus.emit('RefreshNodeSize', {
                nodeId: e.to.id,
            })

            if (oldParent) {
                eventBus.emit('RefreshNodeSize', {
                    nodeId: oldParent.id,
                })
            }

            return nodeMap;
        })
    }, [])

    return (
        <div className="mindmap-wrapper"
             ref={ref}
             style={{
                 width: props.width,
                 height: props.height,
             }}
            // contentEditable={true}
             tabIndex={0}
             onKeyDown={listener}
             onChange={e => {
                 e.preventDefault();
                 e.stopPropagation();
             }}
             suppressContentEditableWarning={true}>
            <DndContextProvider>
                <MindMapContextProvider value={{
                    nodeMap,
                    eventBus,
                    scale: props.value.scale || 1,
                    origin: props.value.origin || defaultOrigin,
                }}>
                    <ScaleControlBar/>
                    <Board width={size.width}
                           scaleOrigin={{
                               origin: props.value.origin || defaultOrigin,
                               scale: props.value.scale || 1,
                           }}
                           setScaleOrigin={s => {
                               props.onChange(old => {
                                   return {
                                       ...old,
                                       scale: s.scale,
                                       origin: s.origin,
                                   };
                               })
                           }}
                           height={size.height}>
                        <RectNode nodeConf={nodeConf}
                                  anchorLeft={{
                                      x: 150,
                                      y: 150,
                                  }}
                                  onAddSibling={() => {
                                  }}
                                  onNodeConfChange={mapper => {
                                      props.onChange(old => {
                                          const newNode = mapper(old.roots[0]);
                                          return {
                                              ...old,
                                              roots: [newNode],
                                          }
                                      })
                                  }}
                        />
                        {/*<circle r={2} fill={'red'}/>*/}
                    </Board>
                </MindMapContextProvider>
            </DndContextProvider>
        </div>
    );
};

export default MindMap;
