import {NodeValue} from "./NodeValue";
import React from 'react';

interface Map<T> {
    [key: string]: T,
}

interface Size {
    width: string,
    height: string,
}

export interface MindMapContext {
    nodes: Array<NodeValue>,
    parentMap: Map<string>,
    childrenMap: Map<Array<string>>,
    nodeSize: Map<Size>,
}

const Context = React.createContext<MindMapContext>(null as any);

export const MindMapContextProvider = Context.Provider;