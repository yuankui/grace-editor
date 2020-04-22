import {Tool} from "./index";
import React from "react";
import {Editor} from "slate-react";
import {MarkTypeItalic} from "../../inline/InlinePlugin";

export default function createItalicTool(): Tool {
    return {
        hint: 'Italic',
        isActive(editor: Editor): boolean {
            const {focus, anchor} = editor.value.selection;
            const marks = editor.value.document.getMarksAtRange({
                focus,
                anchor,
            });
            const active = marks != null && marks.toArray()
                .some(m => m && m.type === MarkTypeItalic);
            return active;
        },
        title: <i>i</i>,
        hotkey: 'mod+i',

        action(editor: Editor): void {
            editor.toggleMark(MarkTypeItalic);
        }
    }
}