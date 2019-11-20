import {Plugin} from 'slate-react';
import React from "react";
import {Block, Editor} from "slate";
import isHotkey from "is-hotkey";
import {BlockParagraph, ToggleBlockOnPrefix} from "../common";

export const CommandToggleList = 'toggleList';
export const CommandIndentList = 'indentList';
export const CommandUnIndentList = 'unIndentList';
export const BlockTypeBulletedList = 'bulleted-list';
export const BlockTypeNumberedList = 'numbered-list';
export const BlockTypeListItem = 'list-item';
export const QueryListType = 'get-list-type';

/**
 * TODO add list indent & unIndent
 */
export function createListPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            let block = editor.value.focusBlock;

            // 空格触发list
            if (ToggleBlockOnPrefix('-', event, editor, () => {
                editor.command('toggleList', BlockTypeBulletedList);
            })) return;

            if (ToggleBlockOnPrefix('1.', event, editor, () => {
                editor.command('toggleList', BlockTypeNumberedList);
            })) return;

            if (block.type == BlockTypeListItem) {
                // 缩进
                if (isHotkey('tab', event.nativeEvent)) {
                    editor.command(CommandIndentList);
                    event.preventDefault();
                    return;
                }

                // 反锁进
                if (isHotkey('shift+tab', event.nativeEvent)) {
                    editor.command(CommandUnIndentList);
                    event.preventDefault();
                    return;
                }
            }
            // 在空白enter取消list
            if (isHotkey('enter', event.nativeEvent)) {
                if (block.type == BlockTypeListItem) {
                    if (block.text == '') {
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
                        .setBlocks(BlockParagraph)
                        .unwrapBlock(BlockTypeBulletedList)
                        .unwrapBlock(BlockTypeNumberedList)
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
            },
            [CommandIndentList]: (editor, args) => {
                let listType: string = editor.query(QueryListType);

                // 如果不是 list，就直接退出
                if (listType == null) {
                    return editor;
                }

                let block = editor.value.focusBlock;
                let previous = editor.value.document.getPreviousSibling(block.key);

                // 如果是第一项，就不允许进行缩进
                if (previous == null) {
                    return editor;
                }

                editor = editor.wrapBlock(listType);

                return editor;
            },
            [CommandUnIndentList]: (editor, args) => {
                let listType: string = editor.query(QueryListType);

                // 如果不是 list，就直接退出
                if (listType == null) {
                    return editor;
                }

                editor.unwrapBlock(listType);

                // 如果缩进到最后一个 list，就设置 block 未 paragraph
                if (editor.query(QueryListType) == null) {
                    editor.setBlocks('paragraph');
                }

                return editor;
            },
        },

        queries: {
            [QueryListType]: (editor, args) => {
                let block = editor.value.focusBlock;
                let ancestors = editor.value.document.getAncestors(block.key);
                if (ancestors==null) {
                    return null;
                }

                for (let node of ancestors.toArray()) {
                    if (node.object !== 'block') {
                        continue;
                    }

                    if (node.type === BlockTypeBulletedList) {
                        return BlockTypeBulletedList;
                    }

                    if(node.type === BlockTypeNumberedList) {
                        return BlockTypeNumberedList;
                    }
                }

                return null;
            },
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