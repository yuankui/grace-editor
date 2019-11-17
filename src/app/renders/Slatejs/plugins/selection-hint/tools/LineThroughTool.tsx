import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeLineThrough} from "../../inline/InlinePlugin";

export default function createLineThroughTool(): Tool {
    return {
        isActive(editor: Editor): boolean {
            const marks = editor.value.focusText.marks;
            const active = marks != null && marks.toArray()
                .some(m => m && m.type === MarkTypeLineThrough);
            return active;
        },
        title: <span style={{textDecoration: 'line-through'}}>S</span>,
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeLineThrough)
        }
    }
}