import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeCode} from "../../inline/InlinePlugin";

export default function createCodeTool(): Tool {
    return {
        title: "<>",
        hotkey: 'meta+e',
        isActive(editor: Editor): boolean {
            const {focus, anchor} = editor.value.selection;
            const marks = editor.value.document.getMarksAtRange({
                focus,
                anchor,
            });
            const active = marks != null && marks.toArray()
                .some(m => m && m.type === MarkTypeCode);
            return active;
        },
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeCode);
        }
    }
}