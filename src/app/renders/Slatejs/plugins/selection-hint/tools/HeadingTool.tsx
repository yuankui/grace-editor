import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {MarkTypeBold} from "../../inline/InlinePlugin";
import {HeaderTypePrefix} from "../../header/HeaderPlugin";

export default function createHeadingTool(level: number): Tool {
    return {
        hint: 'Heading ' + level,
        isActive(editor: Editor): boolean {
            if (editor.value.focusBlock == null) {
                return false;
            }
            return editor.value.focusBlock.type === (HeaderTypePrefix + level);
        },
        title: <b>H{level}</b>,
        hotkey: 'meta+' + level,
        action(editor: Editor): void {
            if (editor.value.focusBlock.type === (HeaderTypePrefix + level)) {
                editor.setBlocks('paragraph');
            } else {
                editor.setBlocks(HeaderTypePrefix + level);
            }
        }
    }
}