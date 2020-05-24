import React, {useContext} from "react";
import {NodeConf} from "../model";
import {Point} from "../model/Point";
import {Size} from "../model/Size";

export interface NodeContext {
    nodePos: Point,
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
    nodeConf: null as any,
    paddingTop: 0,
    paddingLeft: 0,
    textSize: null as any,
    textPos: null as any,
    nodeStyle: null as any,
    onNodeConfChange: () => {},
    nodeGutter: 0,
    select: false,
});

export const NodeContextProvider = Context.Provider;

export function useNodeContext() {
    return useContext(Context);
}