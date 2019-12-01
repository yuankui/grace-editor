import {Rule} from "slate-html-serializer";
import {Editor} from "slate";

export interface Serde {
    rule?: Rule,

    paste?: ProcessClipboard,
}

export interface ProcessClipboard {
    (data: Array<ClipboardData>, editor: Editor): Array<ClipboardData>;
}

export interface ClipboardData {
    type: string,
    item: DataTransferItem,
}