import {NodeValue} from "./NodeValue";
import React, {useContext} from 'react';
import {EventBus} from "../events/eventBus";
import {Point} from "../model/Point";

interface Map<T> {
    [key: string]: T,
}

interface Size {
    width: string,
    height: string,
}

interface Rect {
    left: number,
    top: number,
    width: number,
    height: number,
}
interface NodeInfo {
    value: NodeValue,
    children: Array<string>,
    parent?: string,

    // 下面几个是运行时计算
    size?: Size, // 包括子元素的大框架
    anchorLeft?: Point, // 左边边缘点
    anchorRight?: Point, // 右边边缘点
    rect?: Rect, // 节点自身框架
}

export interface MindMapContext {
    nodes: Array<string>,
    eventBus: EventBus,
    nodeInfoMap: Map<NodeInfo>,
}

const Context = React.createContext<MindMapContext>(null as any);

export const MindMapContextProvider = Context.Provider;

export function useMindMapContext() {
    return useContext(Context);
}