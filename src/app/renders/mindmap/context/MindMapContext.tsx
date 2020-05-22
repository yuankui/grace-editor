import React, {useContext} from "react";
import {NodeMap} from "./NodeMap";

export interface MindMapContext {
    scale: number,
    setScale: (scale: number) => void,
    reset: () => void,
    nodeMap: NodeMap,
}

const Context = React.createContext<MindMapContext>(null as any);

export const MindMapContextProvider = Context.Provider;

export const useScale = () => {
    let context = useMindMapContext();
    return context.scale;
}

export const useNodeMap = () => {
    let context = useMindMapContext();
    return context.nodeMap;
}

export const useMindMapContext = () => {
    return useContext(Context);
}