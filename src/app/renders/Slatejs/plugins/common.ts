import {Editor as CoreEditor} from "slate";
import React from "react";
import isHotkey from "is-hotkey";

export default function ToggleBlockOnPrefix(prefix: string,
                                            event: React.KeyboardEvent<Element>,
                                            editor: CoreEditor,
                                            callback: () => void) {
        // 空格触发list
        if (isHotkey(' ', event.nativeEvent)) {
            if (editor.value.focusBlock.type == 'paragraph') {
                const previous = editor.value.focusBlock.text.substring(0, editor.value.selection.focus.offset);
                if (previous == prefix) {
                    editor.moveFocusToStartOfNode(editor.value.startBlock)
                        .deleteForward(prefix.length);

                    callback();
                    event.preventDefault();
                    return true;
                }
            }
        }
        return false;
}