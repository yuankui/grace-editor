import {Point} from "./Point";

export interface NodeConf {
    id: string,
    type?: "rect" | "underline" | "round", // default rect
    config?: any,
    text: string,
    width: number, // 宽度
    height: number, // 高度
    groupHeight: number, // 包含所有子节点的高度
    collapse?: boolean, // 默认展开
    color: string,
    widget?: Array<WidgetConf>,
    children: Array<NodeConf>,
}

interface WidgetConf {
    type: "comment" | "todo",
    conf: any,
}

export interface Value {
    roots: Array<NodeConf>,
    scale: number,
    origin: Point,
}