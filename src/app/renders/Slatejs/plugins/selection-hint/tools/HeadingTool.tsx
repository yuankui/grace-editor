import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeBold} from "../../inline/InlinePlugin";
import {HeaderTypePrefix} from "../../header/HeaderPlugin";

export default function createHeadingTool(level: number): Tool {
    return {
        isActive(editor: Editor): boolean {
            if (editor.value.focusBlock.type === (HeaderTypePrefix + level)) {
                return true;
            }
            return false;
        },
        title: <b>H{level}</b>,
        hotkey: 'meta+' + level,
        action(editor: Editor): void {
            editor.setBlocks(HeaderTypePrefix + level);
        }
    }
}