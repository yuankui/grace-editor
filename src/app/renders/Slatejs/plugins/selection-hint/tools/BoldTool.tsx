import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeBold} from "../../inline/InlinePlugin";

export default function createBoldTool(): Tool {
    return {
        title: <b>B</b>,
        hotkey: 'meta+b',
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeBold);
        }
    }
}