import {Plugin} from 'slate-react';
import isHotkey from "is-hotkey";
import React from "react";
import {CommandToggleParagraph, ToggleBlockOnPrefix} from "../common";

export const HeaderTypePrefix = 'header-';

export function createHeaderPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {

            // header-1
            if (ToggleBlockOnPrefix('#', event, editor, () => {
                editor.setBlocks(HeaderTypePrefix + '1');
            })) return;

            // header-2
            if (ToggleBlockOnPrefix('##', event, editor, () => {
                editor.setBlocks(HeaderTypePrefix + '2');
            })) return;

            // header-3
            if (ToggleBlockOnPrefix('###', event, editor, () => {
                editor.setBlocks(HeaderTypePrefix + '3');
            })) return;

            // header-4
            if (ToggleBlockOnPrefix('####', event, editor, () => {
                editor.setBlocks(HeaderTypePrefix + '4');
            })) return;

            // new line at the end
            if (isHotkey('enter', event.nativeEvent)) {
                let isEndOfBlock = editor.value.selection.focus.isAtEndOfNode(editor.value.focusBlock);
                if (isEndOfBlock && editor.value.focusBlock.type.startsWith(HeaderTypePrefix)) {
                    editor.insertBlock('paragraph');
                    return;
                }
            }

            // toggle
            for (let i of [1, 2, 3, 4, 5]) {
                if (isHotkey('meta+' + i, event.nativeEvent)) {
                    const newBlockType = HeaderTypePrefix + i;
                    if (editor.value.focusBlock.type == newBlockType) {
                        editor.command(CommandToggleParagraph);
                    } else {
                        editor.setBlocks(newBlockType);
                    }
                    return;
                }
            }
            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type.startsWith(HeaderTypePrefix)) {
                return <div className={props.node.type}>{props.children}</div>
            } else {
                return next();
            }
        },
    }
}