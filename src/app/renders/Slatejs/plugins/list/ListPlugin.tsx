import {Plugin} from 'slate-react';
import React from "react";
import {Block, Editor} from "slate";
import isHotkey from "is-hotkey";
import ToggleBlock from "../common";

/**
 * TODO add list indent & unIndent
 */
export function createListPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            // 空格触发list
            if (ToggleBlock('-', event, editor, e => {
                e.command('toggleList', 'bulleted-list');
            })) return;

            // 在空白enter取消list
            if (isHotkey('enter', event.nativeEvent)) {
                if (editor.value.focusBlock.type == 'list-item') {
                    if (editor.value.focusBlock.text == '') {
                        editor.setBlocks('paragraph')
                            .unwrapBlock('bulleted-list')
                            .unwrapBlock('numbered-list');

                        event.preventDefault();
                        return;
                    }
                }
            }
            if (isHotkey('meta+l', event.nativeEvent)) {
                editor.command('toggleList', 'bulleted-list');
            } else {
                next();
            }
        },
        commands: {
            toggleList: (editor: Editor, args: any) => {
                const {value} = editor;
                const {document} = value;
                const type = args;


                // Handle the extra wrapping required for list buttons.
                const isList = editor.value.focusBlock.type == 'list-item';

                const isType = value.blocks.some(block => {
                    return !!document.getClosest((block as Block).key, parent => (parent as any).type === type);
                });

                if (isList && isType) {
                    editor
                        .setBlocks('paragraph')
                        .unwrapBlock('bulleted-list')
                        .unwrapBlock('numbered-list')
                } else if (isList) {
                    editor
                        .unwrapBlock(
                            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                        )
                        .wrapBlock(type)
                } else {
                    editor = editor.setBlocks('list-item').wrapBlock(type)
                }

                return editor;
            }
        },

        renderBlock: (props, editor, next) => {
            const {attributes, children, node} = props;

            switch (node.type) {
                case 'bulleted-list':
                    return <ul {...attributes}>{children}</ul>;
                case 'list-item':
                    return <li {...attributes}>{children}</li>;
                case 'numbered-list':
                    return <ol {...attributes}>{children}</ol>;
                default:
                    return next();
            }
        }
    }
}