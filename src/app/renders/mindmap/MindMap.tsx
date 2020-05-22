import React, {FunctionComponent, useEffect, useState} from 'react';
import Board from "./Board";
import RectNode from "./node/RectNode";
import {NodeConf, Value} from "./model";
import {useNotifier} from "./hooks/useListener";
import {bindKey} from "./hotkey/hotkeys";
import {NodeMap, NodeWithParent} from "./context/NodeMap";
import { MindMapContextProvider } from './context/MindMapContext';
import {useHistory} from "./history/history";
import isHotkey from "is-hotkey";
import {lazyExecute} from "../../../utils/lazyExecute";

export interface MindMapProps {
    value: Value,
    onChange: (value: Value) => void,
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

    // 回滚，回复历史，cmd+Z，cmd+shift+Z
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            console.log('press', e.key, e.metaKey, e.shiftKey);
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
        window.addEventListener('keydown', listener);
        return () => window.removeEventListener('keydown', listener);
    }, []);
    const [nodeMap, setNodeMap] = useState<{[key: string]: NodeWithParent}>({});

    useEffect(() => {
        lazyUpdateNodeMap(props.value, setNodeMap);
    }, [props.value, setNodeMap]);

    let notifier = useNotifier();

    useEffect(() => {
        const listeners = [
            bindKey('tab', "InsertChild", notifier),
            bindKey('enter', "InsertSibling", notifier),
            bindKey('backspace', "DeleteNode", notifier),
            bindKey('mod+enter', "EditNode", notifier),
            bindKey('up', "MoveUp", notifier),
            bindKey('down', "MoveDown", notifier),
            bindKey('left', "MoveLeft", notifier),
            bindKey('right', "MoveRight", notifier),
        ]
        const listener = (e: KeyboardEvent) => {
            for (let item of listeners) {
                if (item(e)) {
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                }
            }
        }

        window.addEventListener('keydown', listener);
        return () => window.removeEventListener('keydown', listener);
    }, [])

    const [scale, setScale] = useState(1);

    return (
        <div className="App">
            <MindMapContextProvider value={{
                scale,
                reset: () => setScale(1),
                setScale,
                nodeMap: nodeMap,
            }}>
                <Board width={1000} height={500}>
                    <RectNode nodeConf={node}
                              pos={{
                                  x: 150,
                                  y: 150,
                              }}
                              onDelete={() => {
                              }}
                              onAddSibling={() => {
                              }}
                              onSizeChange={() => {
                              }}
                              onNodeConfChange={n => {
                                  setNodeConf(n);
                              }}
                    />
                </Board>
            </MindMapContextProvider>
        </div>
    );
};

export default MindMap;
