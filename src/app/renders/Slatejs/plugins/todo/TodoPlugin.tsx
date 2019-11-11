import {Plugin} from 'slate-react';
import React from "react";
import ToggleBlock from "../common";
import {Checkbox} from "antd";

const blockType = 'todo-block';

export function createTodoPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (ToggleBlock('[]', event, editor, e => {
                e.setBlocks(blockType);
            })) return;
            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type == blockType) {
                return <div {...props.attributes} className={blockType}>
                    <Checkbox className='check-box'/>
                    {props.children}
                </div>
            } else {
                return next();
            }
        },
    }
}