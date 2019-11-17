import {Plugin} from 'slate-react';
import React from "react";
import {Block, Editor} from "slate";
import isHotkey from "is-hotkey";
import {ToggleBlockOnPrefix} from "../common";

export const CommandToggleList = 'toggleList';
export const BlockTypeBulletedList = 'bulleted-list';
export const BlockTypeNumberedList = 'numbered-list';
export const BlockTypeListItem = 'list-item';

/**
 * TODO add list indent & unIndent
 */
export function createListPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            // 空格触发list
            if (ToggleBlockOnPrefix('-', event, editor, () => {
                editor.command('toggleList', BlockTypeBulletedList);
            })) return;

            if (ToggleBlockOnPrefix('1.', event, editor, () => {
                editor.command('toggleList', BlockTypeNumberedList);
            })) return;

            // 在空白enter取消list
            if (isHotkey('enter', event.nativeEvent)) {
                if (editor.value.focusBlock.type == BlockTypeListItem) {
                    if (editor.value.focusBlock.text == '') {
                        editor.setBlocks('paragraph')
                            .unwrapBlock(BlockTypeBulletedList)
                            .unwrapBlock(BlockTypeNumberedList);

                        event.preventDefault();
                        return;
                    }
                }
            }

            next();
        },
        commands: {
            [CommandToggleList]: (editor: Editor, args: any) => {
                const {value} = editor;
                const {document} = value;
                const type = args;


                // Handle the extra wrapping required for list buttons.
                const isList = editor.value.focusBlock.type == BlockTypeListItem;

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
                            type === BlockTypeBulletedList ? BlockTypeNumberedList : BlockTypeBulletedList
                        )
                        .wrapBlock(type)
                } else {
                    editor = editor.setBlocks(BlockTypeListItem).wrapBlock(type)
                }

                return editor;
            }
        },

        renderBlock: (props, editor, next) => {
            const {attributes, children, node} = props;

            switch (node.type) {
                case BlockTypeBulletedList:
                    return <ul {...attributes}>{children}</ul>;
                case BlockTypeListItem:
                    return <li {...attributes}>{children}</li>;
                case BlockTypeNumberedList:
                    return <ol {...attributes}>{children}</ol>;
                default:
                    return next();
            }
        }
    }
}