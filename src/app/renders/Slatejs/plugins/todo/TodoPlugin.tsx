import {Plugin} from 'slate-react';
import React from "react";
import {ToggleBlockOnPrefix} from "../common";
import {Checkbox} from "antd";

const blockType = 'todo-block';

export function createTodoPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (ToggleBlockOnPrefix('[]', event, editor, () => {
                const blockKey = editor.value.focusBlock.key;
                editor.setNodeByKey(blockKey, {
                        type: blockType,
                        data: {
                            checked: false,
                        }
                    })
            })) return;

            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type == blockType) {
                return <div {...props.attributes} className={blockType + " check-" + props.node.data.get('checked')}>
                    <span contentEditable={false}>
                        <Checkbox className='check-box' checked={props.node.data.get('checked')} onChange={e => {
                            editor.setNodeByKey(props.node.key, {
                                type: blockType,
                                data: {
                                    checked: e.target.checked,
                                }
                            })
                        }}/>
                    </span>
                    {props.children}
                </div>
            } else {
                return next();
            }
        },
    }
}