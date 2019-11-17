import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeItalic} from "../../inline/InlinePlugin";

export default function createItalicTool(): Tool {
    return {
        title: <i>i</i>,
        hotkey: 'meta+i',
        markType: MarkTypeItalic,
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeItalic);
        }
    }
}