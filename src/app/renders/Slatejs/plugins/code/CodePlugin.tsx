import {Plugin} from 'slate-react';
import React from "react";
import {ToggleBlockOnPrefix} from "../common";
import isHotkey from "is-hotkey";

export const CodeBlock = 'code-block';

export function createCodePlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (ToggleBlockOnPrefix('^', event, editor, () => {
                editor.setBlocks(CodeBlock);
            })) return;

            if (editor.value.focusBlock.type != CodeBlock) {
                next();
                return;
            }

            if (isHotkey('enter', event.nativeEvent)) {
                editor.insertText("\n");
                event.preventDefault();
                return;
            }

            if (isHotkey('tab', event.nativeEvent)) {
                editor.insertText('    ');
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (isHotkey('shift+enter', event.nativeEvent)) {
                editor.insertBlock('paragraph');
                event.preventDefault();
                return;
            }
            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type == CodeBlock) {
                return <pre className={CodeBlock} {...props.attributes}>{props.children}</pre>;
            } else {
                return next();
            }
        },
    }
}