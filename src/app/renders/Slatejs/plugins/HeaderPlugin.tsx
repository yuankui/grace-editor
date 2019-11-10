import {Plugin} from 'slate-react';
import isHotkey from "is-hotkey";
import React from "react";

const prefix = 'header-';

export function createHeaderPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            for (let i of [1, 2, 3, 4, 5]) {
                if (isHotkey('meta+' + i, event.nativeEvent)) {
                    const newBlockType = prefix + i;
                    if (editor.value.focusBlock.type  == newBlockType) {
                        editor.setBlocks('paragraph');
                    } else {
                        editor.setBlocks(newBlockType);
                    }
                    return;
                }
            }
            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type.startsWith(prefix)) {
                return <div className={props.node.type}>{props.children}</div>
            } else {
                return next();
            }
        }
    }
}