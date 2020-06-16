import React, {useContext} from "react";
import {NodeMap} from "./NodeMap";
import {EventBus} from "../events/eventBus";
import {Point} from "../model/Point";

export interface MindMapContext {
    nodeMap: NodeMap,
    eventBus: EventBus,
    scale: number,
    origin: Point,
}

const Context = React.createContext<MindMapContext>(null as any);

export const MindMapContextProvider = Context.Provider;


export const useNodeMap = () => {
    let context = useMindMapContext();
    return context.nodeMap;
}

export const useMindMapContext = () => {
    return useContext(Context);
}