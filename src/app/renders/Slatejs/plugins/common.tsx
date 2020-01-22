import {Block,Document, Editor as CoreEditor} from "slate";
import React from "react";
import isHotkey from "is-hotkey";
import {Plugin} from 'slate-react';
import {createEmptyParagraph} from "../utils/createEmptyParagraph";
import {List} from "immutable";
import {COMMAND_PASTE} from "../copyPaste";

export const BlockParagraph = 'paragraph';


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

        onKeyDown: (event, editor, next) => {
            if (isHotkey('shift+enter', event.nativeEvent)) {
                editor.insertBlock('paragraph');
                event.preventDefault();
                return;
            }

            next();
        },
        schema: {
            document: {
                last: {
                    // 最后一个必须是 paragraph，如果不是，就插一个 paragraph
                    type: BlockParagraph,
                },
                normalize: (editor, { code, node }) => {
                    if (code === 'child_min_invalid') {
                            // const block = Block.create(index === 0 ? 'title' : 'paragraph');
                        const block = Block.create('paragraph');
                        const size = editor.value.document.nodes.size;
                        return editor.insertNodeByKey(node.key, size, block);
                    } else if (code === 'last_child_type_invalid') {
                        const paragraph = createEmptyParagraph();
                        editor.insertNodeByPath(List(), editor.value.document.nodes.size, paragraph);
                    }
                },
            },
        },
        onCommand: (command, editor, next) => {
            if (command.type === COMMAND_PASTE) {
                const doc: any = command.args;
                editor.insertText(doc.text);
                return;
            }

            next();
        }
    }
}