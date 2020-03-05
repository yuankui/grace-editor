import {Plugin} from 'slate-react';
import React from "react";
import {ToggleBlockOnPrefix} from "../common";
import {Checkbox} from "antd";
import isHotkey from "is-hotkey";

export const TodoBlockType = 'todo-block';
export const PaddingBlockType = 'padding-block';
export const QueryIsInBlock = 'isInBlock';
export const QueryIsInInline = 'isInInline';
export const CommandToggleTodo = 'toggleTodo';

export function createTodoPlugin(): Plugin {
    return {
        queries: {
            [QueryIsInBlock]: (editor, args) => {
                const queryBlock = args as string;
                let block = editor.value.focusBlock;

                if (block.type === queryBlock) {
                    return true;
                }

                let ancestors = editor.value.document.getAncestors(block.key);
                if (ancestors) {
                    return ancestors.toArray().some(a => a.object === 'block' && a.type === queryBlock)
                }

                return false;
            },
            [QueryIsInInline]: (editor, args) => {
                const queryInline = args as string;
                let text = editor.value.focusText;

                let ancestors = editor.value.document.getAncestors(text.key);
                if (ancestors) {
                    return ancestors.toArray().some(a => a.object === 'inline' && a.type === queryInline)
                }

                return false;
            }
        },

        commands: {
            [CommandToggleTodo]: (editor, args) => {
                if (editor.value.focusBlock.type !== TodoBlockType) {
                    return editor;
                }

                const block = editor.value.focusBlock;
                const checked = block.data.get('checked');
                editor.setNodeByKey(block.key, {
                    type: TodoBlockType,
                    data: {
                        checked: !checked,
                    }
                });

                return editor;
            }
        },
        onKeyDown: (event, editor, next) => {

            const block = editor.value.focusBlock;



            if (block.type === TodoBlockType) {
                if (isHotkey('tab', event.nativeEvent)) {
                    editor.wrapBlock(PaddingBlockType);
                    event.preventDefault();
                    return;
                }
                if (isHotkey('shift+tab', event.nativeEvent)) {
                    editor.unwrapBlock(PaddingBlockType);
                    event.preventDefault();
                    return;
                }
                // toggle todo
                if (isHotkey('meta+t', event.nativeEvent)) {
                    editor.command(CommandToggleTodo);
                    event.preventDefault();
                    return;
                }
            }
            if (block.text == '' && block.type == TodoBlockType) {
                if (isHotkey(['enter'], event.nativeEvent)) {
                    if (editor.query(QueryIsInBlock, PaddingBlockType)) {
                        editor.unwrapBlock(PaddingBlockType);
                    } else {
                        editor.setBlocks('paragraph');
                    }
                    event.preventDefault();
                    return;
                }
            }

            if (ToggleBlockOnPrefix('[]', event, editor, () => {
                const blockKey = editor.value.focusBlock.key;
                editor.setNodeByKey(blockKey, {
                    type: TodoBlockType,
                    data: {
                        checked: false,
                    }
                })
            })) return;

            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type == TodoBlockType) {
                return <div {...props.attributes}
                            className={TodoBlockType + " check-" + props.node.data.get('checked')}>
                    <span contentEditable={false}>
                        <Checkbox className='check-box' disabled={props.readOnly} checked={props.node.data.get('checked')} onChange={e => {
                            editor.setNodeByKey(props.node.key, {
                                type: TodoBlockType,
                                data: {
                                    checked: e.target.checked,
                                }
                            })
                        }}/>
                    </span>
                    {props.children}
                </div>
            }

            if (props.node.type === PaddingBlockType) {
                return <div className={props.node.type} {...props.attributes}>
                    {props.children}
                </div>
            }
            return next();

        },
    }
}