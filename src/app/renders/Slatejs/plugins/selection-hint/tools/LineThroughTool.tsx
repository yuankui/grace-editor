import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeLineThrough} from "../../inline/InlinePlugin";

export default function createLineThroughTool(): Tool {
    return {
        title: <span style={{textDecoration: 'line-through'}}>S</span>,
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeLineThrough)
        }
    }
}