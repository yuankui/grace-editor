import {NodeConf} from "../model";
import {Size} from "../model/Size";

export interface EventMap {
    AddChild: AddNodeEvent,
    MoveNode: MoveNodeEvent,
    NodeClick: NodeClickEvent,
    BoardClick: any,
    InsertChild: KeyboardEvent,
    InsertSibling: KeyboardEvent,
    DeleteNode: KeyboardEvent,
    EditNode: KeyboardEvent,
    MoveUp: KeyboardEvent,
    MoveDown: KeyboardEvent,
    MoveLeft: KeyboardEvent,
    MoveRight: KeyboardEvent,
    ExpandOn: KeyboardEvent,
    ExpandOff: KeyboardEvent,
    NodeDoubleClick: NodeDoubleClickEvent,
    DeleteChildNode: DeleteChildNodeEvent,

    NodeSizeChange: NodeSizeChangeEvent,
}

export interface NodeSizeChangeEvent {
    nodeId: string,
    size: Size,
}
export interface DeleteChildNodeEvent {
    nodeId: string,
    parentId: string | undefined,
}

export interface NodeClickEvent {
    nodeId: string,
}
export interface MoveNodeEvent {
    from: NodeConf,
    to: NodeConf,
}

export interface RemoveNodeEvent {
    node: NodeConf,
}

export interface AddNodeEvent {
    parent: NodeConf,
    node: NodeConf,
}

export interface NodeDoubleClickEvent {
    nodeId: string,
}
