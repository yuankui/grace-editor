import {Plugin} from 'slate-react';
import React from "react";
import ToggleBlockOnPrefix from "../common";
import isHotkey from "is-hotkey";

const CodeBlock = 'code-block';
const CodeLineBlock = 'code-block-line';

export function createCodePlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (ToggleBlockOnPrefix('^', event, editor, () => {
                editor.setBlocks(CodeLineBlock)
                    .wrapBlock(CodeBlock);
            })) return;

            if (isHotkey('shift+enter', event.nativeEvent)) {
                if (editor.value.focusBlock.type == CodeLineBlock) {
                    editor.insertBlock('paragraph')
                        .unwrapBlock(CodeBlock);

                    event.preventDefault();
                    return;
                }
            }
            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type == CodeBlock) {
                return <pre className={CodeBlock} {...props.attributes}>{props.children}</pre>;
            } else if (props.node.type == CodeLineBlock) {
                return <div className={CodeLineBlock}>{props.children}</div>
            } else {
                return next();
            }
        },
    }
}