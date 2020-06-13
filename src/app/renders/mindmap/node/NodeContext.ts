import React, {useContext} from "react";
import {NodeConf} from "../model";
import {Point} from "../model/Point";
import {Size} from "../model/Size";
import {Mapper} from "./RectNode";

export interface HitTest {
    (x: number, y: number): boolean,
}
export interface NodeContext {
    anchorLeft: Point,
    anchorRight: Point,
    nodeConf: NodeConf,
    paddingLeft: number,
    paddingTop: number,
    textSize: Size,
    textPos: Point,
    parentStart?: Point,
    nodeStyle: NodeStyle,
    onNodeConfChange: (mapper: Mapper<NodeConf>) => void,
    nodeGutter: number,
    select: boolean,
    hitTest: HitTest, // 检查移动节点的时候，是否位于上面，或者可以drop
}

export interface NodeStyle {
    fillColor: string,
    borderColor: string,
    borderWidth: number,
    borderRadius: number,
    fontSize: number,
}
let Context = React.createContext<NodeContext>(null as any);

export const NodeContextProvider = Context.Provider;

export function useNodeContext() {
    return useContext(Context);
}