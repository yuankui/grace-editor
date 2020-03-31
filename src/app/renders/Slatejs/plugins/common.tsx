import {Block, Editor as CoreEditor, Value} from "slate";
import React from "react";
import isHotkey from "is-hotkey";
import {Editor} from 'slate-react';
import {createEmptyParagraph} from "../utils/createEmptyParagraph";
import {List} from "immutable";
import {serializer} from "../utils/Serializer";
import {EditorPlugin} from "./EditorPlugin";
import {node} from "prop-types";

export const BlockParagraph = 'paragraph';

/**
 * 默认的行为
 * @param prefix
 * @param event
 * @param editor
 * @param callback
 * @constructor
 */
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

export function createCommonPlugin(): EditorPlugin {
    return {
        name: "CommonPlugin",
        onPasteText(str: string, type: string, editor: Editor, next: () => void) {
            if (type == 'text/plain') {
                editor.insertText(str);
                return next();
            }

            
            const value: Value = serializer().deserialize(str);

            // 拆开insert，而不用自带的insertFragment，因为会有些问题
            value.document.nodes.forEach(node => {
                if (node?.object == 'block') {
                    editor.insertBlock(node);
                } else if (node?.object == 'inline') {
                    editor.insertInline(node)
                } else if (node?.object == 'text') {
                    editor.insertText(node.text);
                }
            });
        },
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
    }
}