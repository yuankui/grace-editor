export type NodeType = "rect" | "underline";

export interface NodeValue {
    id: string,
    text: string,
    type: NodeType,
}