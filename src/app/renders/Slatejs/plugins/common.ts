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

export const CommandToggleParagraph = 'toggleParagraph';

export function createCommonPlugin(): Plugin {
    return {
        commands: {
            [CommandToggleParagraph]: (editor, args) => {
                editor.setBlocks({
                    type: 'paragraph',
                    data: undefined,
                });
                return editor;
            },
        },
        onCopy: (event, editor, next) => {
            const data = event.clipboardData;
            next();
        },
        // paste 只能上全局性的，不能是插件式的
        onPaste: (event, editor, next) => {
            if (event.clipboardData.items[0].kind == 'file') {
                next();
                return;
            }
            event.clipboardData.items[0].getAsString(data => {
                editor.insertText(data);
            });

            event.preventDefault();
        },
        onKeyDown: (event, editor, next) => {
            if (isHotkey('shift+enter', event.nativeEvent)) {
                editor.insertBlock('paragraph');
                event.preventDefault();
                return;
            }

            next();
        }
    }
}