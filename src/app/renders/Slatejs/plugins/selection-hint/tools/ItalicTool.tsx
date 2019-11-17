import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeItalic} from "../../inline/InlinePlugin";

export default function createItalicTool(): Tool {
    return {
        isActive(editor: Editor): boolean {
            const marks = editor.value.focusText.marks;
            const active = marks != null && marks.toArray()
                .some(m => m && m.type === MarkTypeItalic);
            return active;
        },
        title: <i>i</i>,
        hotkey: 'meta+i',

        action(editor: Editor): void {
            editor.toggleMark(MarkTypeItalic);
        }
    }
}