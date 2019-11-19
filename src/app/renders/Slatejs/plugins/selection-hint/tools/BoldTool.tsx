import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeBold} from "../../inline/InlinePlugin";

export default function createBoldTool(): Tool {
    return {
        hint: 'Bold',
        isActive(editor: Editor): boolean {
            const {focus, anchor} = editor.value.selection;
            const marks = editor.value.document.getMarksAtRange({
                focus,
                anchor,
            });
            const active = marks != null && marks.toArray()
                .some(m => m && m.type === MarkTypeBold);
            return active;
        },
        title: <b>B</b>,
        hotkey: 'meta+b',
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeBold);
        }
    }
}