import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeCode} from "../../inline/InlinePlugin";

export default function createCodeTool(): Tool {
    return {
        title: "<>",
        hotkey: 'meta+e',
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeCode);
        }
    }
}