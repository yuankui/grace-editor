import {Editor as CoreEditor} from "slate";
import React from "react";
import isHotkey from "is-hotkey";
import {Plugin} from 'slate-react';

export function ToggleBlockOnPrefix(prefix: string,
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

export function createCommonPlugin(): Plugin {
    return {
        onPaste: (event, editor, next) => {
            event.clipboardData.items[0].getAsString(data => {
                editor.insertText(data);
            });
            event.preventDefault();
        },
    }
}