import {NodeConf} from "../model";

export interface NodeMap {
    [key: string]: NodeWithParent,
}

export interface NodeWithParent {
    node: NodeConf,
    parent: NodeConf |undefined,
}