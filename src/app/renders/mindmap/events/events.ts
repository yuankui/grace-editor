import {NodeConf} from "../model";
import {Size} from "../model/Size";

export interface EventMap {
    AddChild: AddNodeEvent,
    MoveNode: MoveNodeEvent,
    NodeClick: NodeEvent,
    BoardClick: any,
    InsertChild: KeyboardEvent,
    InsertSibling: KeyboardEvent,
    DeleteNode: KeyboardEvent,
    EditNode: KeyboardEvent,
    AdjustNodeSize: AdjustNodeSizeEvent,
    RefreshNodeSize: NodeEvent,
    MoveUp: KeyboardEvent,
    MoveDown: KeyboardEvent,
    MoveLeft: KeyboardEvent,
    MoveRight: KeyboardEvent,
    ExpandOn: KeyboardEvent,
    ExpandOff: KeyboardEvent,
    NodeDoubleClick: NodeDoubleClickEvent,
    DeleteChildNode: DeleteChildNodeEvent,

    NodeSizeChange: NodeSizeChangeEvent,
    NodeTextChange: NodeTextChangeEvent,

    UpdateNodeMap: any,
}

export interface NodeEvent {
    nodeId: string,
}
export interface AdjustNodeSizeEvent {
    nodeId: string,
    width: number,
    height: number,
}

export interface NodeTextChangeEvent {
    nodeId: string,
    text: string,
}
export interface NodeSizeChangeEvent {
    nodeId: string,
    size: Size,
}
export interface DeleteChildNodeEvent {
    nodeId: string,
    parentId: string | undefined,
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
