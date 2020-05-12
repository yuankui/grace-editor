import {Plugin} from 'slate-react';
import React from "react";
import {ToggleBlockOnPrefix} from "../common";
import isHotkey from "is-hotkey";
import {decorateNode} from "./decorateNode";
import {renderDecoration} from "./renderDecoration";

export const BlockTypeCodeBlock = 'code-block';

export function createCodePlugin(): Plugin {
    return {
        decorateNode: (node, editor, next) => {
            const others = next() || [];
            if (node.object != 'block') {
                return others;
            }
            if (node.type !== BlockTypeCodeBlock) {
                return others;
            }

            const codeDecorations = decorateNode(node);

            return [...others, ...codeDecorations];
        },

        renderDecoration: (props, editor, next) => {
            return renderDecoration(props, editor, next);
        },
        onKeyDown: (event, editor, next) => {
            if (ToggleBlockOnPrefix('^', event, editor, () => {
                editor.setBlocks(BlockTypeCodeBlock);
            })) return;

            if (editor.value.focusBlock.type != BlockTypeCodeBlock) {
                next();
                return;
            }

            if (isHotkey('enter', event.nativeEvent)) {
                editor.insertBlock("\n");
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
            if (props.node.type == BlockTypeCodeBlock) {
                return <pre className={BlockTypeCodeBlock} {...props.attributes}>{props.children}</pre>;
            } else {
                return next();
            }
        },
    }
}