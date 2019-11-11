import {Plugin} from 'slate-react';
import React from "react";
import ToggleBlockOnPrefix from "../common";
import isHotkey from "is-hotkey";

const CodeBlock = 'code-block';

export function createCodePlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (ToggleBlockOnPrefix('^', event, editor, e => {
                e.setBlocks(CodeBlock);
            })) return;

            if (isHotkey('enter', event.nativeEvent)) {
                if (editor.value.focusBlock.type == CodeBlock) {
                    editor.insertText("\n");
                    event.preventDefault();
                    return;
                }
            }

            if (isHotkey('shift+enter', event.nativeEvent)) {
                if (editor.value.focusBlock.type == CodeBlock) {
                    editor.insertBlock('paragraph');
                    event.preventDefault();
                    return;
                }
            }
            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type == CodeBlock) {
                return <pre className={CodeBlock} {...props.attributes}>{props.children}</pre>
            } else {
                return next();
            }
        },
    }
}