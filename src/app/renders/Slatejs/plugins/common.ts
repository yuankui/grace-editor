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

function getSelectionCoords() {
    let sel = document.getSelection(), range, rect;
    let x = 0, y = 0;
    if (sel && sel.rangeCount) {
        range = sel.getRangeAt(0).cloneRange();
        if (range.getClientRects) {
            range.collapse(true);
            if (range.getClientRects().length > 0) {
                rect = range.getClientRects()[0];
                x = rect.left;
                y = rect.top;
            }
        }
    }
    return {x: x, y: y};
}

export function createCommonPlugin(): Plugin {
    return {
        onSelect: (event, editor, next) => {
            const {x, y} = getSelectionCoords();
            console.log({x, y});
            const el = document.getElementById('demo');
            if (el) {
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
            }
            next();
        },
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