import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeBold, MarkTypeCode} from "../../inline/InlinePlugin";

export default function createCodeTool(): Tool {
    return {
        title: "<>",
        hotkey: 'meta+e',
        isActive(editor: Editor): boolean {
            const marks = editor.value.focusText.marks;
            const active = marks != null && marks.toArray()
                .some(m => m && m.type === MarkTypeCode);
            return active;
        },
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeCode);
        }
    }
}