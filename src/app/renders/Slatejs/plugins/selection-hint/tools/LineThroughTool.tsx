import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeLineThrough} from "../../inline/InlinePlugin";

export default function createLineThroughTool(): Tool {
    return {
        hint: 'Line Through',
        isActive(editor: Editor): boolean {
            const {focus, anchor} = editor.value.selection;
            const marks = editor.value.document.getMarksAtRange({
                focus,
                anchor,
            });
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