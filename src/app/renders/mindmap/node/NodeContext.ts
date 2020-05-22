import React, {useContext} from "react";
import {NodeConf} from "../model";
import {Point} from "../model/Point";
import {Size} from "../model/Size";
import {NodeSizeMap} from "./NodeSizeMap";

export interface NodeContext {
    nodePos: Point,
    nodeSize: Size,
    nodeConf: NodeConf,
    paddingLeft: number,
    paddingTop: number,
    textSize: Size,
    textPos: Point,
    parentStart?: Point,
    nodeStyle: NodeStyle,
    onNodeConfChange: (nodeConf: NodeConf) => void,
    nodeGutter: number,
    select: boolean,
    childrenSize: NodeSizeMap,
    setChildrenSize: (size: NodeSizeMap) => void,
    updateChildSize: (nodeId: string, size: Size) => void,
}

export interface NodeStyle {
    fillColor: string,
    borderColor: string,
    borderWidth: number,
    borderRadius: number,
    fontSize: number,
}
let Context = React.createContext<NodeContext>({
    nodePos: null as any,
    parentStart: null as any,
    nodeSize: null as any,
    nodeConf: null as any,
    paddingTop: 0,
    paddingLeft: 0,
    textSize: null as any,
    textPos: null as any,
    nodeStyle: null as any,
    onNodeConfChange: () => {},
    nodeGutter: 0,
    select: false,
    childrenSize: {},
    setChildrenSize: () => {},
    updateChildSize: () => {},
});

export const NodeContextProvider = Context.Provider;

export function useNodeContext() {
    return useContext(Context);
}