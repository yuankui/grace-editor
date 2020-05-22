import {Point} from "./Point";

export interface NodeConf {
    id: string,
    type?: "rect" | "underline" | "round", // default rect
    config?: any,
    text: string,
    widget?: Array<WidgetConf>,
    children?: Array<NodeConf>,
}

interface WidgetConf {
    type: "comment" | "todo",
    conf: any,
}

export interface Value {
    roots: Array<NodeConf>,
    pos: Array<Point>,
}