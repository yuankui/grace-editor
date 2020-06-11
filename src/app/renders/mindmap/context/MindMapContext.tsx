import React, {useContext} from "react";
import {NodeMap} from "./NodeMap";
import {EventBus} from "../events/eventBus";

export interface MindMapContext {
    nodeMap: NodeMap,
    eventBus: EventBus,
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