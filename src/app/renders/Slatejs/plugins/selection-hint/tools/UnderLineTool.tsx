import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeUnderline} from "../../inline/InlinePlugin";

export default function createUnderLineTool(): Tool {
    return {
        isActive(editor: Editor): boolean {
            const {focus, anchor} = editor.value.selection;
            const marks = editor.value.document.getMarksAtRange({
                focus,
                anchor,
            });
            const active = marks != null && marks.toArray()
                .some(m => m && m.type === MarkTypeUnderline);
            return active;
        },
        title: <span style={{textDecoration: 'underline'}}>U</span>,

        action(editor: Editor): void {
            editor.toggleMark(MarkTypeUnderline);
        }
    }
}