import React, {FunctionComponent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Board from "./Board";
import RectNode from "./node/RectNode";
import {NodeConf, Value} from "./model";
import {useNotifier} from "./hooks/useListener";
import {bindKey} from "./hotkey/hotkeys";
import {NodeMap, NodeWithParent} from "./context/NodeMap";
import {MindMapContextProvider} from './context/MindMapContext';
import {useHistory} from "./history/history";
import isHotkey from "is-hotkey";
import {lazyExecute} from "../../../utils/lazyExecute";
import {DndContextProvider} from "./dragdrop/DndContext";
import {Point} from "./model/Point";

export interface MindMapProps {
    value: Value,
    onChange: (value: Value) => void,
    width: number,
    height: number,
}

const updateNodeMap = (value: Value, setNodeMap: any) => {
    const map: NodeMap = {};

    const iterNodes = (parent: NodeConf | undefined, nodes: Array<NodeConf>) => {
        for (let node of nodes) {
            map[node.id] = {
                node,
                parent
            }
            if (node.children == null) continue;
            iterNodes(node, node.children);
        }
    }
    iterNodes(undefined, value.roots);
    setNodeMap(map);
};

const lazyUpdateNodeMap = lazyExecute(updateNodeMap, 50);

const MindMap: FunctionComponent<MindMapProps> = (props) => {
    const node = props.value.roots[0];
    let history = useHistory<Value>(props.value);

    const setNodeConf = (node: NodeConf) => {
        const newValue: Value = {
            ...props.value,
            roots: [node]
        };
        history.push(newValue);
        props.onChange(newValue);
    }


    const [nodeMap, setNodeMap] = useState<{ [key: string]: NodeWithParent }>({});

    useEffect(() => {
        lazyUpdateNodeMap(props.value, setNodeMap);
    }, [props.value, setNodeMap]);

    let notifier = useNotifier();

    const listener = useMemo(() => {
        const listeners = [
            bindKey('tab', "InsertChild", notifier),
            bindKey('enter', "InsertSibling", notifier),
            bindKey('backspace', "DeleteNode", notifier),
            bindKey('mod+enter', "EditNode", notifier),
            bindKey('up', "MoveUp", notifier),
            bindKey('down', "MoveDown", notifier),
            bindKey('left', "MoveLeft", notifier),
            bindKey('right', "MoveRight", notifier),
            bindKey('mod+=', "ExpandOn", notifier),
            bindKey('mod+-', "ExpandOff", notifier),
        ]

        const historyListener = (e: KeyboardEvent) => {
            if (isHotkey('cmd+z', e)) {
                history.pop((item: Value) => {
                    props.onChange(item);
                })
                e.stopPropagation();
                e.preventDefault();
                return;
            }

            if (isHotkey('cmd+shift+z', e)) {
                history.forward((item: Value) => {
                    props.onChange(item);
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

    // scale
    const {scale = 1} = props.value;
    const setScale = useCallback((s) => {
        props.onChange({
            ...props.value,
            scale: s,
        })
    }, [props.value]);

    // 原点
    const {origin = {x: 500, y: 250}} = props.value;

    const svgSize = [props.width, props.height];
    const ref = useRef<HTMLDivElement>(null);


    const outerToInner = useCallback((point: Point) => {
        const {x, y} = point;
        const containerRect = ref.current?.getClientRects()?.item(0) as DOMRect;

        const outer =  {
            x: (x - containerRect.left) / scale - origin.x,
            y: (y - containerRect.top) / scale - origin.y,
        }

        console.log('inner', point, '=>', outer);
        return outer;
    }, [scale, origin.x, origin.y]);

    return (
        <div className="mindmap-wrapper"
            // contentEditable={true}
             ref={ref}
             tabIndex={0}
             onKeyDown={listener}
             onChange={e => {
                 e.preventDefault();
                 e.stopPropagation();
             }}
             suppressContentEditableWarning={true}>
            <DndContextProvider>
                <MindMapContextProvider value={{
                    scale,
                    reset: () => setScale(1),
                    setScale,
                    nodeMap: nodeMap,
                    outerToInner,
                }}>
                    <Board width={svgSize[0]} height={svgSize[1]}>
                        <RectNode nodeConf={node}
                                  pos={{
                                      x: 150,
                                      y: 150,
                                  }}
                                  onDelete={() => {
                                  }}
                                  onAddSibling={() => {
                                  }}
                                  onNodeConfChange={n => {
                                      setNodeConf(n);
                                  }}
                        />
                        <circle r={10} color={'red'}/>
                    </Board>
                </MindMapContextProvider>
            </DndContextProvider>
        </div>
    );
};

export default MindMap;
