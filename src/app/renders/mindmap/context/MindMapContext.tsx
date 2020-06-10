import React, {useContext} from "react";
import {NodeMap} from "./NodeMap";
import {Point} from "../model/Point";

export interface MindMapContext {
    scale: number,
    setScale: (scale: number) => void,
    origin: Point,
    setOrigin: (Point) => void,
    reset: () => void,
    nodeMap: NodeMap,
    outerToInner: (Point) => Point,
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