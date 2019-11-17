import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeUnderline} from "../../inline/InlinePlugin";

export default function createUnderLineTool(): Tool {
    return {
        title: <span style={{textDecoration: 'underline'}}>U</span>,
        markType: MarkTypeUnderline,
        action(editor: Editor): void {
            editor.toggleMark(MarkTypeUnderline);
        }
    }
}